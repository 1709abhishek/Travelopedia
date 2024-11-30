package com.travelopedia.fun.customer_service.accounts.service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import org.apache.commons.math3.distribution.NormalDistribution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class TravelStatsService {

    private static final String GEODB_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
    private static final String RAPIDAPI_KEY = "0929069aafmshcd69c500702a308p1721ddjsnec891a2c4a50";
    private static final Map<String, Double> distanceCache = new ConcurrentHashMap<>();
    private static final int API_CALLS_PER_MINUTE = 60;
    private static long lastCallTime = 0;
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public record CityInfo(String id, String name, String countryCode) {
    }

    public String findCapital(String country) throws Exception {
        String cacheKey = "capital:" + country;
        String cachedCapital = (String) redisTemplate.opsForValue().get(cacheKey);
        if (cachedCapital != null) {
            return cachedCapital;
        }

        waitForRateLimit();

        String query = String.format("""
                {
                  countries(namePrefix: "%s") {
                    edges {
                      node {
                        capital
                      }
                    }
                  }
                }
                """, country);

        JsonNode response = executeGraphQLQuery(query);
        String capital = response.path("data").path("countries").path("edges").get(0).path("node").path("capital")
                .asText();

        if (capital.isEmpty()) {
            throw new Exception("No capital found for country: " + country);
        }

        redisTemplate.opsForValue().set(cacheKey, capital, 24, TimeUnit.HOURS);
        return capital;
    }

    public CityInfo findCity(String cityName) throws Exception {
        String cacheKey = "city:" + cityName;
        CityInfo cachedCity = (CityInfo) redisTemplate.opsForValue().get(cacheKey);
        if (cachedCity != null) {
            return cachedCity;
        }
        waitForRateLimit();

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(GEODB_API_URL + "/cities?namePrefix=" + cityName.replace(" ", "%20")))
                .header("x-rapidapi-key", RAPIDAPI_KEY)
                .header("x-rapidapi-host", "wft-geo-db.p.rapidapi.com")
                .method("GET", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("Response Status: " + response.statusCode());
        System.out.println("Response Body: " + response.body());

        if (response.statusCode() != 200) {
            throw new Exception("API request failed with status code: " + response.statusCode() + "\nResponse body: "
                    + response.body());
        }

        JsonNode jsonResponse = new ObjectMapper().readTree(response.body());
        JsonNode cityData = jsonResponse.path("data").get(0);

        if (cityData == null) {
            throw new Exception("No city found with name: " + cityName);
        }

        CityInfo cityInfo = new CityInfo(
                cityData.path("wikiDataId").asText(),
                cityData.path("name").asText(),
                cityData.path("countryCode").asText());
        redisTemplate.opsForValue().set(cacheKey, cityInfo, 24, TimeUnit.HOURS);
        return cityInfo;
    }

    public double getDistance(String fromCountry, String toCountry) throws Exception {
        String cacheKey = "distance:" + fromCountry + "-" + toCountry;
        Double cachedDistance = (Double) redisTemplate.opsForValue().get(cacheKey);
        if (cachedDistance != null) {
            return cachedDistance;
        }

        String fromCapital = findCapital(fromCountry);
        String toCapital = findCapital(toCountry);

        CityInfo city1 = findCity(fromCapital);
        CityInfo city2 = findCity(toCapital);
        System.out.println("City 1: " + city1);
        System.out.println("City 2: " + city2);
        waitForRateLimit();

        String query = String.format("""
                {
                  distanceBetween(fromPlaceId: "%s", toPlaceId: "%s")
                }
                """, city1.id(), city2.id());

        JsonNode response = executeGraphQLQuery(query);
        double distance = response.path("data").path("distanceBetween").asDouble();

        redisTemplate.opsForValue().set(cacheKey, distance, 720, TimeUnit.HOURS);
        // print the distance
        System.out.println("Distance between " + fromCountry + " and " + toCountry + ": " + distance + " km");
        return distance;
    }

    public double getTotalDistanceTraveled(String startCountry, List<String> countriesVisited) throws Exception {
        double totalDistance = 0;
        String currentCountry = startCountry;

        for (String nextCountry : countriesVisited) {
            totalDistance += getDistance(currentCountry, nextCountry);
            currentCountry = nextCountry;
        }

        return totalDistance;
    }

    public double calculatePercentile(double distanceTraveled) {
        double averageDistance = 10000; // km per year, adjusted for international travel
        double stdDeviation = 5000; // Estimated standard deviation

        double zScore = (distanceTraveled - averageDistance) / stdDeviation;
        NormalDistribution normalDistribution = new NormalDistribution(0, 1);
        return normalDistribution.cumulativeProbability(zScore) * 100;
    }

    private JsonNode executeGraphQLQuery(String query) throws Exception {
        HttpClient client = HttpClient.newHttpClient();

        String jsonBody = String.format("{\"query\": %s}", new ObjectMapper().writeValueAsString(query));

        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("https://geodb-cities-graphql.p.rapidapi.com/"))
                .header("X-RapidAPI-Key", RAPIDAPI_KEY)
                .header("X-RapidAPI-Host", "geodb-cities-graphql.p.rapidapi.com")
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("Request Body: " + jsonBody);
        System.out.println("Response Status: " + response.statusCode());
        System.out.println("Response Body: " + response.body());

        if (response.statusCode() != 200) {
            throw new Exception("API request failed with status code: " + response.statusCode() + "\nResponse body: "
                    + response.body());
        }

        JsonNode jsonResponse = new ObjectMapper().readTree(response.body());

        if (jsonResponse.has("errors")) {
            throw new Exception("GraphQL query returned errors: " + jsonResponse.path("errors"));
        }

        return jsonResponse;
    }

    private void waitForRateLimit() {
        long currentTime = System.currentTimeMillis();
        long timeSinceLastCall = currentTime - lastCallTime;
        long minimumDelay = 100000 / API_CALLS_PER_MINUTE;

        if (timeSinceLastCall < minimumDelay) {
            try {
                Thread.sleep(minimumDelay - timeSinceLastCall);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        lastCallTime = System.currentTimeMillis();
    }

    public static void main(String[] args) {
        TravelStatsService service = new TravelStatsService();

        try {
            String startCountry = "India";
            List<String> countriesVisited = Arrays.asList("France", "Germany", "Italy", "Spain");

            // System.out.println("Calculating travel statistics...");
            // System.out.println("Start country: " + startCountry);
            // System.out.println("Countries visited: " + countriesVisited);

            String capital = service.findCapital(startCountry);
            CityInfo capitalInfo = service.findCity(capital);
            // System.out.println("\nCapital of " + startCountry + ":");
            // System.out.println("Name: " + capitalInfo.name());
            // System.out.println("ID: " + capitalInfo.id());
            // System.out.println("Country Code: " + capitalInfo.countryCode());

            double totalDistance = service.getTotalDistanceTraveled(startCountry, countriesVisited);
            double percentile = service.calculatePercentile(totalDistance);

            System.out.println("\nTotal distance traveled: " + String.format("%.2f", totalDistance) + " km");
            System.out.println("Travel percentile: " + String.format("%.2f", percentile) + "%");

        } catch (Exception e) {
            System.err.println("An error occurred: " + e.getMessage());
            e.printStackTrace();
        }
    }

}
