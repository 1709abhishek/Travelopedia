package com.travelopedia.fun.budget_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.travelopedia.fun.budget_service.beans.FlightRequest;
import com.travelopedia.fun.budget_service.beans.FlightResponse;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.Map;

@Service
public class FlightService {
    private final String flightUrl = "https://serpapi.com/search?engine=google_flights&";

    @Autowired
    private AuthService authService;

    public List<FlightResponse> getFlightCostItinerary(FlightRequest request) {
        String api_key = authService.getGoogleToken();

        return getFlights(request, api_key);
    }

    private List<FlightResponse> getFlights(FlightRequest request, String token) {
        RestTemplate restTemplate = new RestTemplate();

        // Validate and construct the URL
        String url = String.format(
                "%s&api_key=%s&departure_id=%s&arrival_id=%s&outbound_date=%s&return_date=%s&adults=%d",
                flightUrl, token, request.getDeparture(), request.getArrival(),
                request.getDepartureDate(), request.getArrivalDate(), request.getAdults()
        );

        try {
            // Make the API call
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, null, Map.class);
            Map<String, Object> body = response.getBody();

            // Validate response body
            if (body == null || !body.containsKey("best_flights")) {
                return new ArrayList<>();
            }

            // Extract "best_flights" and map to FlightResponse objects
            List<Map<String, Object>> flights = (List<Map<String, Object>>) body.getOrDefault("best_flights", new ArrayList<>());

            return flights.stream().map(flight -> {
                FlightResponse flightResponse = new FlightResponse();

                try {
                    // Extract flight details safely
                    Map<String, Object> flightDetails = ((List<Map<String, Object>>) flight.get("flights")).get(0);
                    Map<String, Object> departure = (Map<String, Object>) flightDetails.get("departure_airport");
                    Map<String, Object> arrival = (Map<String, Object>) flightDetails.get("arrival_airport");

                    flightResponse.setDepartureAirportName((String) departure.getOrDefault("name", "N/A"));
                    flightResponse.setDepartureAirportId((String) departure.getOrDefault("id", "N/A"));
                    flightResponse.setDepartureTime((String) departure.getOrDefault("time", "N/A"));

                    flightResponse.setArrivalAirportName((String) arrival.getOrDefault("name", "N/A"));
                    flightResponse.setArrivalAirportId((String) arrival.getOrDefault("id", "N/A"));
                    flightResponse.setArrivalTime((String) arrival.getOrDefault("time", "N/A"));

                    flightResponse.setDuration((int) flightDetails.getOrDefault("duration", 0));
                    flightResponse.setAirplane((String) flightDetails.getOrDefault("airplane", "Unknown"));
                    flightResponse.setAirline((String) flightDetails.getOrDefault("airline", "Unknown"));
                    flightResponse.setAirlineLogo((String) flightDetails.getOrDefault("airline_logo", ""));
                    flightResponse.setTravelClass((String) flightDetails.getOrDefault("travel_class", ""));
                    flightResponse.setFlightNumber((String) flightDetails.getOrDefault("flight_number", ""));
                    flightResponse.setLegroom((String) flightDetails.getOrDefault("legroom", "Standard"));
                    flightResponse.setTotalDuration((int) flight.getOrDefault("total_duration", 0));
                    flightResponse.setPrice((int) flight.getOrDefault("price", 0));
                    flightResponse.setTripType((String) flight.getOrDefault("type", "One-way"));
                } catch (Exception e) {
                    // Handle errors in individual flight mapping
                    e.printStackTrace();
                }

                return flightResponse;
            }).collect(Collectors.toList());

        } catch (Exception e) {
            // Log and return an empty list in case of errors
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}