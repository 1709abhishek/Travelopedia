
package com.travelopedia.fun.budget_service.controller;

import com.travelopedia.fun.budget_service.beans.Trip;
import com.travelopedia.fun.budget_service.clients.CustomerServiceProxy;
import com.travelopedia.fun.budget_service.service.TripService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class TripControllerTest {

    @Mock
    private TripService tripService;

    @Mock
    private CustomerServiceProxy customerServiceProxy;

    @InjectMocks
    private TripController tripController;

    private Trip testTrip;
    private final String AUTH_HEADER = "Bearer test-token";
    private final String TEST_EMAIL = "test@example.com";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        testTrip = new Trip();
        testTrip.setId(1L);
        testTrip.setEmail(TEST_EMAIL);
        testTrip.setDestination("Test City");
    }

    @Test
    void createTrip_Success() {
        when(customerServiceProxy.getExampleEndpoint(AUTH_HEADER)).thenReturn(TEST_EMAIL);
        when(tripService.createTrip(any(Trip.class))).thenReturn(testTrip);

        ResponseEntity<Trip> response = tripController.createTrip(testTrip, AUTH_HEADER);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testTrip, response.getBody());
        verify(tripService).createTrip(testTrip);
    }

    @Test
    void createTrip_Unauthorized() {
        when(customerServiceProxy.getExampleEndpoint(AUTH_HEADER)).thenReturn(null);

        ResponseEntity<Trip> response = tripController.createTrip(testTrip, AUTH_HEADER);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        verify(tripService, never()).createTrip(any());
    }

    @Test
    void getTrips_Success() {
        List<Trip> trips = Arrays.asList(testTrip);
        when(customerServiceProxy.getExampleEndpoint(AUTH_HEADER)).thenReturn(TEST_EMAIL);
        when(tripService.getTripsById(TEST_EMAIL)).thenReturn(trips);

        ResponseEntity<List<Trip>> response = tripController.getTrips(AUTH_HEADER);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(trips, response.getBody());
    }

    @Test
    void updateTrip_Success() {
        when(tripService.updateTrip(eq(1L), any(Trip.class))).thenReturn(testTrip);

        ResponseEntity<Trip> response = tripController.updateTrip(1L, testTrip, AUTH_HEADER);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testTrip, response.getBody());
    }

    @Test
    void updateTrip_NotFound() {
        when(tripService.updateTrip(eq(1L), any(Trip.class))).thenReturn(null);

        ResponseEntity<Trip> response = tripController.updateTrip(1L, testTrip, AUTH_HEADER);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void deleteTrip_Success() {
        ResponseEntity<Void> response = tripController.deleteTrip(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(tripService).deleteTrip(1L);
    }

    @Test
    void addTripFromChat_Success() {
        when(tripService.createTrip(any(Trip.class))).thenReturn(testTrip);

        ResponseEntity<Trip> response = tripController.addTripFromChat(testTrip);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(testTrip, response.getBody());
        verify(tripService).createTrip(testTrip);
    }
}