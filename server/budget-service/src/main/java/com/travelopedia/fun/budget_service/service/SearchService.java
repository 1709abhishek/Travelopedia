package com.travelopedia.fun.budget_service.service;

import com.travelopedia.fun.budget_service.beans.AirportDTO;
import org.springframework.stereotype.Service;
import org.springframework.core.io.ClassPathResource;
import org.springframework.cache.annotation.Cacheable;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.nio.charset.StandardCharsets;

@Service
public class SearchService {
    private static final String CSV_FILE_PATH = "airports.csv";

    @Cacheable("airports")
    public List<AirportDTO> loadAirports() {
        List<AirportDTO> airports = new ArrayList<>();
        try {
            ClassPathResource resource = new ClassPathResource(CSV_FILE_PATH);
            try (BufferedReader br = new BufferedReader(
                    new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {

                // Skip header
                String line = br.readLine();

                while ((line = br.readLine()) != null) {
                    String[] values = line.split(",");
                    airports.add(new AirportDTO(
                            Long.parseLong(values[0]),
                            values[1],
                            values[2],
                            values[3],
                            values[4]
                    ));
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Error loading airports data: " + e.getMessage());
        }
        return airports;
    }

    public List<AirportDTO> searchAirports(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            throw new IllegalArgumentException("Search term cannot be empty");
        }

        List<AirportDTO> airports = loadAirports();
        String normalizedSearchTerm = searchTerm.toLowerCase().trim();

        return airports.stream()
                .filter(airport ->
                        airport.getName().toLowerCase().contains(normalizedSearchTerm) ||
                                airport.getCity().toLowerCase().contains(normalizedSearchTerm) ||
                                airport.getIata().toLowerCase().contains(normalizedSearchTerm)
                ).limit(10)
                .collect(Collectors.toList());
    }
}