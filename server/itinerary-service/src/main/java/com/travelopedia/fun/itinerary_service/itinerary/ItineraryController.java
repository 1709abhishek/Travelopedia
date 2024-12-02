package com.travelopedia.fun.itinerary_service.itinerary;

import java.util.List;

import com.travelopedia.fun.itinerary_service.clients.CustomerServiceProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.travelopedia.fun.itinerary_service.itinerary.dto.ItineraryResponse;

/**
 * REST controller for managing itineraries.
 * This controller exposes endpoints for creating, reading, updating, and deleting itineraries.
 * It handles the HTTP requests and delegates the business logic to the ItineraryService.
 */
@RestController
@RequestMapping("/itinerary")
public class ItineraryController {

    private final ItineraryService itineraryService;

    @Autowired
    private CustomerServiceProxy customerServiceProxy;


    @GetMapping("/feign")
    public String testFeignClient(@RequestHeader("Authorization") String authorization) {
        return customerServiceProxy.getExampleEndpoint(authorization);
    }

    // Constructor injection for ItineraryService
    public ItineraryController(ItineraryService itineraryService) {
        this.itineraryService = itineraryService;
    }

    /**
     * Retrieves a list of all itineraries with their associated activities.
     * 
     * @return A ResponseEntity containing a list of all itineraries.
     */
    @GetMapping("/all")
    public ResponseEntity<List<ItineraryResponse>> getAllItineraries() {
        final List<ItineraryResponse> itineraries = itineraryService.findAllItineraries();
        return ResponseEntity.ok(itineraries);
    }

    /**
     * Retrieves an itinerary by its ID, including associated activities.
     * 
     * @param itineraryId The ID of the itinerary to fetch.
     * @return A ResponseEntity containing the itinerary if found, or a 404 Not Found status if not.
     */
    @GetMapping("/{itineraryId}")
    public ResponseEntity<ItineraryResponse> getItineraryById(@PathVariable Long itineraryId) {
        return itineraryService.findItineraryById(itineraryId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Retrieves all itineraries associated with a specific trip.
     * 
     * @param tripId The ID of the trip whose itineraries are to be fetched.
     * @return A ResponseEntity containing a list of itineraries associated with the specified trip.
     */
    @GetMapping("/trip/{tripId}")
    public ResponseEntity<List<Itinerary>> getAllItinerariesByTripId(@PathVariable Long tripId) {
        final List<Itinerary> itineraries = itineraryService.fetchAllItinerariesByTripId(tripId);
        return ResponseEntity.ok(itineraries);
    }

    /**
     * Creates a new itinerary and associates it with a specified trip.
     * 
     * @param itinerary The itinerary data to be created.
     * @param tripId The ID of the trip to associate the itinerary with.
     * @return A ResponseEntity containing the created itinerary.
     */
    @PostMapping("/save")
    public ResponseEntity<ItineraryResponse> createItinerary(
            @RequestBody Itinerary itinerary,
            @RequestParam Long tripId) {
        final ItineraryResponse createdItinerary = itineraryService.createOrUpdateItinerary(itinerary, tripId);
        return ResponseEntity.ok(createdItinerary);
    }

    /**
     * Updates an existing itinerary, linking it to a specific trip.
     * 
     * @param itineraryId The ID of the itinerary to update.
     * @param itinerary The new itinerary data.
     * @param tripId The ID of the trip to associate the itinerary with.
     * @return A ResponseEntity containing the updated itinerary.
     */
    @PutMapping("/update/{itineraryId}")
    public ResponseEntity<ItineraryResponse> updateItinerary(@PathVariable Long itineraryId, 
                                                              @RequestBody Itinerary itinerary, 
                                                              @RequestParam Long tripId) {
        itinerary.setItineraryId(itineraryId);
        final ItineraryResponse updatedItinerary = itineraryService.createOrUpdateItinerary(itinerary, tripId);
        return ResponseEntity.ok(updatedItinerary);
    }

    /**
     * Deletes an itinerary by its ID.
     * 
     * @param itineraryId The ID of the itinerary to delete.
     * @return A ResponseEntity with a 204 No Content status after successful deletion.
     */
    @DeleteMapping("/delete/{itineraryId}")
    public ResponseEntity<Void> deleteItinerary(@PathVariable Long itineraryId) {
        itineraryService.deleteItinerary(itineraryId);
        return ResponseEntity.noContent().build();
    }
}
