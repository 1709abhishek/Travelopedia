package com.travelopedia.fun.budget_service.controller;

import com.travelopedia.fun.budget_service.beans.*;
import com.travelopedia.fun.budget_service.clients.CustomerServiceProxy;
import com.travelopedia.fun.budget_service.service.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class BudgetControllerTest {

    @Mock
    private HotelService hotelService;
    @Mock
    private FlightService flightService;
    @Mock
    private BudgetService budgetService;
    @Mock
    private SearchService searchService;
    @Mock
    private CustomerServiceProxy customerServiceProxy;

    @InjectMocks
    private BudgetController budgetController;

    private HotelRequest hotelRequest;
    private FlightRequest flightRequest;
    private HotelBudgetRequest hotelBudgetRequest;
    private FlightBudgetRequest flightBudgetRequest;
    private CustomBudgetRequest customBudgetRequest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        // Initialize test data
        hotelRequest = new HotelRequest();
        flightRequest = new FlightRequest();
        hotelBudgetRequest = new HotelBudgetRequest();
        flightBudgetRequest = new FlightBudgetRequest();
        customBudgetRequest = new CustomBudgetRequest();
    }

    @Test
    void testFeignClient_Success() {
        String auth = "Bearer token";
        when(customerServiceProxy.getExampleEndpoint(auth)).thenReturn("test@email.com");

        String result = budgetController.testFeignClient(auth);

        assertEquals("test@email.com", result);
        verify(customerServiceProxy).getExampleEndpoint(auth);
    }

    @Test
    void getCostItinerary_Success() {
        HotelResponse hotelResponse = new HotelResponse(
            "Test Hotel",      // hotelName
            "Test Location",   // location
            "Test Room",       // roomType
            100.0,            // costPerNight
            true,             // available
            "USD"             // currency
        );
        List<HotelResponse> mockResponses = Arrays.asList(hotelResponse);
        when(hotelService.getHotelCostItinerary(any())).thenReturn(mockResponses);

        ResponseEntity<Object> response = budgetController.getCostItinerary(hotelRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResponses, response.getBody());
    }

    @Test
    void getFlightCostItinerary_Success() {
        List<FlightResponse> mockResponses = Arrays.asList(new FlightResponse());
        when(flightService.getFlightCostItinerary(any())).thenReturn(mockResponses);

        ResponseEntity<Object> response = budgetController.getFlightCostItinerary(flightRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResponses, response.getBody());
    }

    @Test
    void createHotelBudget_Success() {
        doNothing().when(budgetService).createHotelBudget(any());

        ResponseEntity<Map<String, Object>> response = budgetController.createHotelBudget(hotelBudgetRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue((Boolean) response.getBody().get("success"));
    }

    @Test
    void createFlightBudget_Success() {
        doNothing().when(budgetService).createFlightBudget(any());

        ResponseEntity<Map<String, Object>> response = budgetController.createFlightBudget(flightBudgetRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue((Boolean) response.getBody().get("success"));
    }

    @Test
    void createCustomBudget_Success() {
        doNothing().when(budgetService).createCustomBudget(any());

        ResponseEntity<Map<String, Object>> response = budgetController.createCustomBudget(customBudgetRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue((Boolean) response.getBody().get("success"));
    }

    @Test
    void getBudgets_Success() {
        List<Object> mockBudgets = Arrays.asList(new Object());
        when(budgetService.getBudgetsByItineraryID(anyInt())).thenReturn(mockBudgets);

        ResponseEntity<Object> response = budgetController.getBudgets(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockBudgets, response.getBody());
    }

    @Test
    void deleteItineraryBudget_Success() {
        doNothing().when(budgetService).deleteBudgetsByItineraryID(anyInt());

        ResponseEntity<Map<String, Object>> response = budgetController.deleteItineraryBudget(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue((Boolean) response.getBody().get("success"));
    }

    @Test
    void deleteBudgetByTypeAndId_Success() {
        doNothing().when(budgetService).deleteBudgetByTypeAndId(anyLong(), anyString());

        ResponseEntity<Map<String, Object>> response = budgetController.deleteBudgetByTypeAndId(1L, "HOTEL");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue((Boolean) response.getBody().get("success"));
    }

    @Test
    void searchAirports_Success() {
        List<AirportDTO> mockResults = Arrays.asList(new AirportDTO());
        when(searchService.searchAirports(anyString())).thenReturn(mockResults);

        AirportSearchRequest request = new AirportSearchRequest();
        request.setSearchTerm("NYC");

        ResponseEntity<Object> response = budgetController.searchAirports(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        @SuppressWarnings("unchecked")
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertNotNull(responseBody);
        assertTrue(responseBody.containsKey("data"));
    }

    @Test
    void searchAirports_Error() {
        when(searchService.searchAirports(anyString())).thenThrow(new IllegalArgumentException("Invalid search term"));

        AirportSearchRequest request = new AirportSearchRequest();
        request.setSearchTerm("");

        ResponseEntity<Object> response = budgetController.searchAirports(request);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Object responseBody = response.getBody();
        if (responseBody instanceof Map) {
            assertFalse((Boolean) ((Map<?, ?>) responseBody).get("success"));
        } else {
            fail("Response body is not of expected type Map");
        }
    }
}