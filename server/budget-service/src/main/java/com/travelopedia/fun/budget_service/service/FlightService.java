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

        String url = String.format(
                "%s&api_key=%s&departure_id=%s&arrival_id=%s&outbound_date=%s&return_date=%s&adults=%d",
                flightUrl, token, request.getDeparture(), request.getArrival(),
                request.getDepartureDate(), request.getReturnDate(), request.getAdults()
        );

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, null, Map.class);
            Map<String, Object> body = response.getBody();
            if (body == null || !body.containsKey("best_flights")) {
                return new ArrayList<>();
            }

            // Extract "best_flights" array from response
            List<Map<String, Object>> flights = (List<Map<String, Object>>) body.get("best_flights");

            // Map each flight to FlightResponse
            return flights.stream().map(flight -> {
                FlightResponse flightResponse = new FlightResponse();

                Map<String, Object> flightDetails = ((List<Map<String, Object>>) flight.get("flights")).get(0);
                Map<String, Object> departure = (Map<String, Object>) flightDetails.get("departure_airport");
                Map<String, Object> arrival = (Map<String, Object>) flightDetails.get("arrival_airport");

                flightResponse.setDepartureAirportName((String) departure.get("name"));
                flightResponse.setDepartureAirportId((String) departure.get("id"));
                flightResponse.setDepartureTime((String) departure.get("time"));
                flightResponse.setArrivalAirportName((String) arrival.get("name"));
                flightResponse.setArrivalAirportId((String) arrival.get("id"));
                flightResponse.setArrivalTime((String) arrival.get("time"));
                flightResponse.setDuration((int) flightDetails.get("duration"));
                flightResponse.setAirplane((String) flightDetails.get("airplane"));
                flightResponse.setAirline((String) flightDetails.get("airline"));
                flightResponse.setAirlineLogo((String) flightDetails.get("airline_logo"));
                flightResponse.setTravelClass((String) flightDetails.get("travel_class"));
                flightResponse.setFlightNumber((String) flightDetails.get("flight_number"));
                flightResponse.setLegroom((String) flightDetails.get("legroom"));
                //flightResponse.setExtensions((List<String>) flightDetails.get("extensions"));
                flightResponse.setTotalDuration((int) flight.get("total_duration"));
                //flightResponse.setCarbonEmissions((long) ((Map<String, Object>) flight.get("carbon_emissions")).get("this_flight"));
                flightResponse.setPrice((int) flight.get("price"));
                flightResponse.setTripType((String) flight.get("type"));
                //flightResponse.setDepartureToken((String) flight.get("departure_token"));

                return flightResponse;
            }).collect(Collectors.toList());

        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }
}