
package com.travelopedia.fun.itinerary_service.itinerary;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import com.travelopedia.fun.itinerary_service.itinerary.dto.ItineraryResponse;
import com.travelopedia.fun.itinerary_service.trip.dto.TripResponse;
import com.travelopedia.fun.itinerary_service.trip.Trip;
import com.travelopedia.fun.itinerary_service.trip.TripService;

public class ItineraryServiceTest {

    @Mock
    private ItineraryRepository itineraryRepository;

    @Mock
    private TripService tripService;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private ItineraryService itineraryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAllItineraries() {
        Itinerary itinerary = new Itinerary();
        ItineraryResponse itineraryResponse = new ItineraryResponse();
        when(itineraryRepository.findAllWithActivities()).thenReturn(Arrays.asList(itinerary));
        when(modelMapper.map(itinerary, ItineraryResponse.class)).thenReturn(itineraryResponse);

        List<ItineraryResponse> result = itineraryService.findAllItineraries();

        assertEquals(1, result.size());
        assertEquals(itineraryResponse, result.get(0));
    }

    @Test
    public void testFindItineraryById() {
        Long itineraryId = 1L;
        Itinerary itinerary = new Itinerary();
        ItineraryResponse itineraryResponse = new ItineraryResponse();
        when(itineraryRepository.findItineraryWithActivitiesById(itineraryId)).thenReturn(Optional.of(itinerary));
        when(modelMapper.map(itinerary, ItineraryResponse.class)).thenReturn(itineraryResponse);

        Optional<ItineraryResponse> result = itineraryService.findItineraryById(itineraryId);

        assertTrue(result.isPresent());
        assertEquals(itineraryResponse, result.get());
    }

    @Test
    public void testFetchAllItinerariesByTripId() {
        Long tripId = 1L;
        Itinerary itinerary = new Itinerary();
        when(itineraryRepository.findItinerariesWithActivitiesByTripId(tripId)).thenReturn(Arrays.asList(itinerary));
        when(modelMapper.map(itinerary, Itinerary.class)).thenReturn(itinerary);

        List<Itinerary> result = itineraryService.fetchAllItinerariesByTripId(tripId);

        assertEquals(1, result.size());
        assertEquals(itinerary, result.get(0));
    }

    @Test
    public void testCreateOrUpdateItinerary() {
        Long tripId = 1L;
        Itinerary itinerary = new Itinerary();
        TripResponse tripResponse = new TripResponse();
        ItineraryResponse itineraryResponse = new ItineraryResponse();
        when(tripService.findTripById(tripId)).thenReturn(Optional.of(tripResponse));
        when(modelMapper.map(tripResponse, Trip.class)).thenReturn(new Trip());
        when(itineraryRepository.save(itinerary)).thenReturn(itinerary);
        when(modelMapper.map(itinerary, ItineraryResponse.class)).thenReturn(itineraryResponse);

        ItineraryResponse result = itineraryService.createOrUpdateItinerary(itinerary, tripId);

        assertEquals(itineraryResponse, result);
    }

    @Test
    public void testDeleteItinerary() {
        Long itineraryId = 1L;

        itineraryService.deleteItinerary(itineraryId);

        verify(itineraryRepository, times(1)).deleteById(itineraryId);
    }
}