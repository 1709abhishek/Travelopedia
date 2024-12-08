package com.travelopedia.fun.customer_service.accounts.controllers;

import com.travelopedia.fun.customer_service.accounts.service.TravelStatsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.anyDouble;
import static org.mockito.Mockito.*;

public class TravelStatsControllerTests {

    @Mock
    private TravelStatsService travelStatsService;

    @InjectMocks
    private TravelStatsController travelStatsController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getDistance_Success() throws Exception {
        when(travelStatsService.getDistance(anyString(), anyString())).thenReturn(100.0);

        double response = travelStatsController.getDistance("USA", "Canada");

        assertEquals(100.0, response);
    }

    @Test
    void getTotalDistance_Success() throws Exception {
        List<String> countriesVisited = Arrays.asList("Canada", "Mexico");
        when(travelStatsService.getTotalDistanceTraveled(anyString(), anyList())).thenReturn(200.0);

        double response = travelStatsController.getTotalDistance("USA", countriesVisited);

        assertEquals(200.0, response);
    }

    @Test
    void getPercentile_Success() {
        when(travelStatsService.calculatePercentile(anyDouble())).thenReturn(90.0);

        double response = travelStatsController.getPercentile(1000.0);

        assertEquals(90.0, response);
    }
}