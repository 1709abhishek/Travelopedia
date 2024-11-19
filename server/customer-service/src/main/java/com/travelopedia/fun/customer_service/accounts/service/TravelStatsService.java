package com.travelopedia.fun.customer_service.accounts.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.FileReader;
import java.math.BigInteger;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;
import java.util.*;

import com.opencsv.CSVReader;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.jdbc.core.CallableStatementCreator;
import java.math.BigInteger;
import java.math.BigDecimal;

import java.util.List;
import java.util.Map;
import org.apache.commons.math3.distribution.NormalDistribution;

public class TravelStatsService {

    private static Map<String, String> capitalToCountry = new HashMap<>();
    public double getCountryDistance(String country1, String country2) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            ObjectMapper objectMapper = new ObjectMapper();

            // Create the JSON body
            Map<String, Object> data = Map.of(
                    "route", List.of(
                            Map.of("name", country1),
                            Map.of("name", country2)
                    )
            );
            String requestBody = objectMapper.writeValueAsString(data);

            // Create the request
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("https://location-and-time.p.rapidapi.com/distance/bycity?to_city=" + country2.replace(" ", "%20") + "&from_city=" + country1.replace(" ", "%20") + "&unit=km"))
                    .header("x-rapidapi-key", "0929069aafmshcd69c500702a308p1721ddjsnec891a2c4a50")
                    .header("x-rapidapi-host", "location-and-time.p.rapidapi.com")
//                    .header("Content-Type", "application/json")
                    .GET()
                    .build();

            // Send the request and get the response
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String responseBody = response.body();
            // Parse and print the response body as JSON
            JsonNode jsonNode = objectMapper.readTree(responseBody);
            System.out.println(jsonNode);
            // Extract and print the route
            JsonNode routeNode = jsonNode.path("response");
            JsonNode routeNodeVincenty = routeNode.path("geodesic").path("value");
            return routeNodeVincenty.asDouble();
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    public double getTotalKilometersTravelled(String location, List<String> placesTravelled) {
        double totalDistance = 0;
        for (String place : placesTravelled) {
            totalDistance += getCountryDistance(capitalToCountry.get(location), capitalToCountry.get(place));
            try {
                Thread.sleep(1500); // Delay for 1.5 seconds
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        return totalDistance;
    }

    public String getTotalWorldPopulation(){
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("https://get-population.p.rapidapi.com/population"))
                    .header("x-rapidapi-key", "0929069aafmshcd69c500702a308p1721ddjsnec891a2c4a50")
                    .header("x-rapidapi-host", "get-population.p.rapidapi.com")
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.body());
//            System.out.println(jsonNode);
            return jsonNode.path("count").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return "0";
        }
    }

    public String getCountryPopulation (String country) {
        try {
            HttpClient client = HttpClient.newHttpClient();
            ObjectMapper objectMapper = new ObjectMapper();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("https://get-population.p.rapidapi.com/population/country?country=" + country))
                    .header("x-rapidapi-key", "0929069aafmshcd69c500702a308p1721ddjsnec891a2c4a50")
                    .header("x-rapidapi-host", "get-population.p.rapidapi.com")
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
            System.out.println(response);
            JsonNode jsonNode = objectMapper.readTree(response.body());
            System.out.println(jsonNode);
            return jsonNode.path("count").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return "0";
        }
    }

    public String getWorldPopulation () {
        try {
            HttpClient client = HttpClient.newHttpClient();
            ObjectMapper objectMapper = new ObjectMapper();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("https://get-population.p.rapidapi.com/population"))
                    .header("x-rapidapi-key", "0929069aafmshcd69c500702a308p1721ddjsnec891a2c4a50")
                    .header("x-rapidapi-host", "get-population.p.rapidapi.com")
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
            System.out.println(response);
            JsonNode jsonNode = objectMapper.readTree(response.body());
            System.out.println(jsonNode);
            return jsonNode.path("count").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return "0";
        }
    }

    public BigDecimal getCountryWiseAviationDistance (String country) {
        try (CSVReader csvReader = new CSVReader(new FileReader("src/main/resources/total-aviation-km.csv"))) {
            String[] headers = csvReader.readNext(); // Read the headers
            String[] row;
            while ((row = csvReader.readNext()) != null) {
                if (row[0].equals(country)) {
                    return new BigDecimal(row[3]); // Assuming the distance is in the 4th column
                }
            }
            return BigDecimal.ZERO;
        } catch (Exception e) {
            e.printStackTrace();
            return BigDecimal.ZERO;
        }
    }

    public Map<String, String> mapCapitalToCountry () {
        try {
            HttpClient client = HttpClient.newHttpClient();
            ObjectMapper objectMapper = new ObjectMapper();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("https://countriesnow.space/api/v0.1/countries/capital"))
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
//            System.out.println(response);
            JsonNode jsonNode = objectMapper.readTree(response.body());
            for (JsonNode countryNode : jsonNode.path("data")) {
                capitalToCountry.put(countryNode.path("name").asText(), countryNode.path("capital").asText());
            }
            return capitalToCountry;
//            return jsonNode.path("count").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return new HashMap<>();
        }
    }

    public double calculatePercentile(double distanceTravelled, double averageDistance, double stdDeviation) {
        // Calculate the Z-score
        double zScore = (distanceTravelled - averageDistance) / stdDeviation;

        // Create a normal distribution with mean 0 and standard deviation 1
        NormalDistribution normalDistribution = new NormalDistribution(0, 1);

        // Calculate the percentile
        double percentile = normalDistribution.cumulativeProbability(zScore) * 100;

        return percentile;
    }

    public double getAverageWorldDistance() {
        BigDecimal aviationDistance = this.getCountryWiseAviationDistance("world");
        BigInteger aviationDistanceInt = aviationDistance.toBigInteger();
        BigInteger population = new BigInteger(this.getWorldPopulation());
        population = population.divide(new BigInteger("10"));
        BigInteger result = aviationDistanceInt.divide(population);
        System.out.println("yeah" + aviationDistance);
        return result.doubleValue();
    }



    public static void main(String[] args) {
        TravelStatsService travelStatsService = new TravelStatsService();
        capitalToCountry = travelStatsService.mapCapitalToCountry();
//        System.out.println(capitalToCountry.get("United States"));
//        System.out.println(travelStatsService.getCountryDistance(capitalToCountry.get("United States"), capitalToCountry.get("India"))*1.6);
        double distanceTravelled = 15000;
//        System.out.println(travelStatsService.getTotalWorldPopulation());
//        System.out.println(travelStatsService.getCountryPopulation("US"));
        BigDecimal aviationDistance = travelStatsService.getCountryWiseAviationDistance("world");
        BigInteger aviationDistanceInt = aviationDistance.toBigInteger();
        BigInteger population = new BigInteger(travelStatsService.getWorldPopulation());
        population = population.divide(new BigInteger("10"));
        BigInteger result = aviationDistanceInt.divide(population);

        double averageDistance = result.doubleValue();
        double stdDeviation = 2000;

        System.out.println(travelStatsService.getAverageWorldDistance());
        System.out.println(capitalToCountry);
        System.out.println(travelStatsService.calculatePercentile(distanceTravelled, averageDistance, stdDeviation));
//        System.out.println(travelStatsService.mapCapitalToCountry());
    }


}
