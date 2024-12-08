package com.travelopedia.fun.recommendation_service.controller;

import com.travelopedia.fun.recommendation_service.beans.Suggestion;
import com.travelopedia.fun.recommendation_service.clients.CustomerServiceProxy;
import com.travelopedia.fun.recommendation_service.configuration.Configuration;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doReturn;
import static org.mockito.ArgumentMatchers.any;

class SuggestionControllerTest {

    @Mock
    private Configuration configuration;

    @Mock
    private CustomerServiceProxy customerServiceProxy;

    @InjectMocks
    private SuggestionController suggestionController;

    private static final String AUTHORIZATION = "Bearer token";
    private static final String EMAIL = "test@example.com";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFeignClient_Success() {
        // Arrange
        Mockito.when(customerServiceProxy.getExampleEndpoint(any())).thenReturn(EMAIL);

        // Act
        String response = suggestionController.testFeignClient(AUTHORIZATION);

        // Assert
        assertEquals(EMAIL, response);
        verify(customerServiceProxy).getExampleEndpoint(AUTHORIZATION);
    }

    @Test
    void getSuggestions_Success() {
        // Arrange
        String places = "Paris, London, New York";
        doReturn(places).when(configuration).getPlaces();

        // Act
        String response = suggestionController.getSuggestions();

        // Assert
        assertNotNull(response);
        assertTrue(response.contains("1001")); 
        assertTrue(response.contains("Paris")); 
        assertTrue(response.contains("eiffel tower")); 
        verify(configuration).getPlaces();
    }

    @Test
    void getSuggestions_WithConfiguredPlaces() {
        // Arrange
        String places = "Paris, London, New York";
        doReturn(places).when(configuration).getPlaces();

        // Act
        String response = suggestionController.getSuggestions();

        // Assert
        assertNotNull(response);
        assertTrue(response.contains("1001")); // Suggestion ID
        assertTrue(response.contains("Paris")); // Configured place
        assertTrue(response.contains("eiffel tower")); // Default suggestion
        verify(configuration).getPlaces();
    }

    @Test
    void getSuggestions_WithEmptyConfiguredPlaces() {
        // Arrange
        String emptyPlaces = "";
        doReturn(emptyPlaces).when(configuration).getPlaces();

        // Act
        String response = suggestionController.getSuggestions();

        // Assert
        assertNotNull(response);
        assertTrue(response.contains("1001")); // Suggestion ID
        assertTrue(response.contains("eiffel tower")); // Default suggestion
        verify(configuration).getPlaces();
    }
}