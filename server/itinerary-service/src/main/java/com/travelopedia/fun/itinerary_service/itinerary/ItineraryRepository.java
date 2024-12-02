package com.travelopedia.fun.itinerary_service.itinerary;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Repository interface for performing CRUD operations on the Itinerary entity.
 * This interface extends JpaRepository, which provides basic CRUD functionality.
 * Custom queries are defined to fetch itineraries along with their associated activities.
 */
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {

    /**
     * Fetches all itineraries and their associated activities (schedule).
     * 
     * @return A list of itineraries with their activities.
     */
    @Query("SELECT i FROM Itinerary i LEFT JOIN FETCH i.schedule")
    List<Itinerary> findAllWithActivities(); 
    
    /**
     * Fetches all itineraries associated with a specific trip, identified by the trip ID.
     * 
     * @param tripId The ID of the trip.
     * @return A list of itineraries associated with the specified trip.
     */
    @Query("SELECT i FROM Itinerary i WHERE i.trip.id = :tripId")
    List<Itinerary> findAllByTripId(@Param("tripId") Long tripId);

    /**
     * Fetches all itineraries associated with a specific trip, including their activities (schedule).
     * 
     * @param tripId The ID of the trip.
     * @return A list of itineraries with their activities for the specified trip.
     */
    @Query("SELECT i FROM Itinerary i LEFT JOIN FETCH i.schedule WHERE i.trip.tripId = :tripId")
    List<Itinerary> findItinerariesWithActivitiesByTripId(Long tripId);

    /**
     * Fetches an itinerary by its ID, including its associated activities (schedule).
     * 
     * @param itineraryId The ID of the itinerary to fetch.
     * @return An Optional containing the itinerary with activities, or empty if not found.
     */
    @Query("SELECT i FROM Itinerary i LEFT JOIN FETCH i.schedule WHERE i.itineraryId = :itineraryId")
    Optional<Itinerary> findItineraryWithActivitiesById(@Param("itineraryId") Long itineraryId);

}
