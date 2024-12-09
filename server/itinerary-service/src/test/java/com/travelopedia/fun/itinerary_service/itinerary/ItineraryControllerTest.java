package com.travelopedia.fun.itinerary_service.itinerary;

import com.travelopedia.fun.itinerary_service.itinerary.dto.ItineraryResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ItineraryControllerTest {

    @Mock
    private ItineraryService itineraryService;

    @InjectMocks
    private ItineraryController itineraryController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllItineraries() {
        List<ItineraryResponse> itineraries = Collections.singletonList(new ItineraryResponse());
        when(itineraryService.findAllItineraries()).thenReturn(itineraries);

        ResponseEntity<List<ItineraryResponse>> response = itineraryController.getAllItineraries();

        assertEquals(200, response.getStatusCode().value());
        assertEquals(itineraries, response.getBody());
    }

    @Test
    public void testGetItineraryById() {
        Long itineraryId = 1L;
        ItineraryResponse itineraryResponse = new ItineraryResponse();
        when(itineraryService.findItineraryById(itineraryId)).thenReturn(Optional.of(itineraryResponse));

        ResponseEntity<ItineraryResponse> response = itineraryController.getItineraryById(itineraryId);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(itineraryResponse, response.getBody());
    }

    @Test
    public void testGetItineraryById_NotFound() {
        Long itineraryId = 1L;
        when(itineraryService.findItineraryById(itineraryId)).thenReturn(Optional.empty());

        ResponseEntity<ItineraryResponse> response = itineraryController.getItineraryById(itineraryId);

        assertEquals(404, response.getStatusCode().value());
    }

    @Test
    public void testDeleteItinerary() {
        Long itineraryId = 1L;
        doNothing().when(itineraryService).deleteItinerary(itineraryId);

        ResponseEntity<Void> response = itineraryController.deleteItinerary(itineraryId);

        assertEquals(204, response.getStatusCode().value());
    }
}