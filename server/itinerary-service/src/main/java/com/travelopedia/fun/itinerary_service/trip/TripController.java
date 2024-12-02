package com.travelopedia.fun.itinerary_service.trip;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.travelopedia.fun.itinerary_service.itinerary.Itinerary;
import com.travelopedia.fun.itinerary_service.itinerary.ItineraryService;
import com.travelopedia.fun.itinerary_service.trip.dto.TripResponse;

/**
 * REST controller for managing trip-related HTTP requests.
 * Handles the mapping of HTTP requests to trip-related services such as fetching, creating, updating, and deleting trips.
 */
@RestController
@RequestMapping("/trip")
public class TripController {

    private final TripService tripService; // Service for managing trip operations
    private final ItineraryService itineraryService; // Service for managing itineraries related to trips

    /**
     * Constructor for TripController.
     * 
     * @param tripService The service for handling trip-related logic.
     * @param itineraryService The service for handling itinerary-related logic.
     */
    public TripController(TripService tripService, ItineraryService itineraryService) {
        this.tripService = tripService;
        this.itineraryService = itineraryService;
    }

    /**
     * Endpoint to retrieve all trips.
     * 
     * @return A ResponseEntity containing a list of all trips as TripResponse DTOs.
     */
    @GetMapping("/all")
    public ResponseEntity<List<TripResponse>> getAllTrips() {
        List<TripResponse> trips = tripService.findAllTrips(); 
        return ResponseEntity.ok(trips); 
    }

    /**
     * Endpoint to retrieve a trip by its ID along with its related itineraries.
     * 
     * @param tripId The ID of the trip to retrieve.
     * @return A ResponseEntity containing the trip with its itineraries.
     */
    @GetMapping("/{tripId}/details")
    public ResponseEntity<Trip> getTripWithDetails(@PathVariable Long tripId) {
        Trip trip = tripService.findTripDetailsById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found"));
        List<Itinerary> itineraries = itineraryService.fetchAllItinerariesByTripId(tripId);
        trip.setItineraries(itineraries); 
        return ResponseEntity.ok(trip);
    }

    /**
     * Endpoint to retrieve a trip by its ID.
     * 
     * @param tripId The ID of the trip to retrieve.
     * @return A ResponseEntity containing the trip as TripResponse, or HTTP 404 if not found.
     */
    @GetMapping("/{tripId}")
    public ResponseEntity<TripResponse> getTripById(@PathVariable Long tripId) {
        return tripService.findTripById(tripId)
                .map(ResponseEntity::ok) 
                .orElse(ResponseEntity.notFound().build()); 
    }

    /**
     * Endpoint to create a new trip.
     * 
     * @param trip The trip data to create.
     * @return A ResponseEntity containing the created trip as TripResponse.
     */
    @PostMapping("/save")
    public ResponseEntity<TripResponse> createTrip(@RequestBody Trip trip) {
        TripResponse createdTrip = tripService.createOrUpdateTrip(trip);
        return ResponseEntity.ok(createdTrip); 
    }

    /**
     * Endpoint to update an existing trip.
     * 
     * @param tripId The ID of the trip to update.
     * @param trip The updated trip data.
     * @return A ResponseEntity containing the updated trip as TripResponse.
     */
    @PutMapping("/update/{tripId}")
    public ResponseEntity<TripResponse> updateTrip(@PathVariable Long tripId, @RequestBody Trip trip) {
        trip.setTripId(tripId); 
        TripResponse updatedTrip = tripService.createOrUpdateTrip(trip); 
        return ResponseEntity.ok(updatedTrip); 
    }

    /**
     * Endpoint to delete a trip by its ID.
     * 
     * @param tripId The ID of the trip to delete.
     * @return A ResponseEntity with HTTP 200 OK on successful deletion.
     */
    @DeleteMapping("/delete/{tripId}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long tripId) {
        tripService.deleteTrip(tripId); 
        return ResponseEntity.ok().build();
    }
}
