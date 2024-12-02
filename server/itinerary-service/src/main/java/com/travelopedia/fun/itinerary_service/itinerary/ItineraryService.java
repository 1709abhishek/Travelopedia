package com.travelopedia.fun.itinerary_service.itinerary;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.travelopedia.fun.itinerary_service.itinerary.dto.ItineraryResponse;
import com.travelopedia.fun.itinerary_service.trip.Trip;
import com.travelopedia.fun.itinerary_service.trip.TripService;

/**
 * Service class responsible for managing itineraries in the system.
 * Handles the creation, updating, retrieval, and deletion of itineraries.
 */
@Service
public class ItineraryService {
    
    private final ItineraryRepository itineraryRepository; // Repository to interact with the database for itineraries
    private final TripService tripService; // Service to fetch trip details
    private final ModelMapper modelMapper; // ModelMapper to map between entities and DTOs

    /**
     * Constructor to initialize the ItineraryService.
     *
     * @param itineraryRepository The repository for itinerary entities.
     * @param tripService The service for interacting with trip data.
     * @param modelMapper The ModelMapper to map entities to DTOs and vice versa.
     */
    public ItineraryService(ItineraryRepository itineraryRepository, TripService tripService, ModelMapper modelMapper) {
        this.itineraryRepository = itineraryRepository;
        this.tripService = tripService;
        this.modelMapper = modelMapper;
    }

    /**
     * Fetches all itineraries, including their associated activities.
     *
     * @return A list of ItineraryResponse DTOs representing all itineraries with activities.
     */
    public List<ItineraryResponse> findAllItineraries() {
        List<Itinerary> itineraries = itineraryRepository.findAllWithActivities(); // Fetch itineraries with activities
        return itineraries.stream()
                          .map(itinerary -> modelMapper.map(itinerary, ItineraryResponse.class))
                          .collect(Collectors.toList());
    }

    /**
     * Fetches a specific itinerary by its ID, including its associated activities.
     *
     * @param itineraryId The ID of the itinerary to fetch.
     * @return An Optional containing an ItineraryResponse DTO if found, else empty.
     */
    public Optional<ItineraryResponse> findItineraryById(Long itineraryId) {
        Optional<Itinerary> itinerary = itineraryRepository.findItineraryWithActivitiesById(itineraryId);
        return itinerary.map(i -> modelMapper.map(i, ItineraryResponse.class));
    }

    /**
     * Fetches all itineraries associated with a specific trip ID, including their activities.
     *
     * @param tripId The ID of the trip for which to fetch itineraries.
     * @return A list of Itinerary entities associated with the specified trip.
     */
    public List<Itinerary> fetchAllItinerariesByTripId(Long tripId) {
        List<Itinerary> itineraries = itineraryRepository.findItinerariesWithActivitiesByTripId(tripId);
        return itineraries.stream()
                          .map(itinerary -> modelMapper.map(itinerary, Itinerary.class))
                          .collect(Collectors.toList());
    }

    /**
     * Creates or updates an itinerary. This also ensures that activities are correctly linked to the itinerary.
     *
     * @param itinerary The itinerary to create or update.
     * @param tripId The ID of the trip to associate with the itinerary.
     * @return An ItineraryResponse DTO representing the saved itinerary.
     * @throws RuntimeException If the specified trip does not exist.
     */
    @Transactional
    public ItineraryResponse createOrUpdateItinerary(Itinerary itinerary, Long tripId) {
        Trip trip = tripService.findTripById(tripId)
                               .map(t -> modelMapper.map(t, Trip.class))
                               .orElseThrow(() -> new RuntimeException("Trip does not exist"));
        itinerary.setTrip(trip);
        List<Activity> activities = itinerary.getSchedule();
        if (activities != null) {
            for (Activity activity : activities) {
                activity.setItinerary(itinerary);
            }
        }
        Itinerary savedItinerary = itineraryRepository.save(itinerary);
        return modelMapper.map(savedItinerary, ItineraryResponse.class);
    }

    /**
     * Deletes an itinerary by its ID.
     *
     * @param itineraryId The ID of the itinerary to delete.
     */
    @Transactional
    public void deleteItinerary(Long itineraryId) {
        itineraryRepository.deleteById(itineraryId);
    }
}
