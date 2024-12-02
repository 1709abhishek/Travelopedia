package com.travelopedia.fun.itinerary_service.trip;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.travelopedia.fun.itinerary_service.trip.dto.TripResponse;

/**
 * Service class for managing trip-related operations. Provides methods for
 * fetching, creating, updating, and deleting trips.
 */
@Service
public class TripService {

	private final TripRepository tripRepository;
	private final ModelMapper modelMapper;

	/**
	 * Constructor for TripService.
	 * 
	 * @param tripRepository The repository for accessing trip data.
	 * @param modelMapper    The model mapper for DTO transformation.
	 */
	public TripService(TripRepository tripRepository, ModelMapper modelMapper) {
		this.tripRepository = tripRepository;
		this.modelMapper = modelMapper;
	}

	/**
	 * Finds all trips in the repository and returns them as a list of TripResponse
	 * DTOs.
	 * 
	 * @return A list of TripResponse objects.
	 */
	public List<TripResponse> findAllTrips() {
		List<Trip> trips = tripRepository.findAll();
		return trips.stream().map(trip -> modelMapper.map(trip, TripResponse.class)).collect(Collectors.toList());
	}

	/**
	 * Finds a trip by its ID and returns it as an Optional TripResponse.
	 * 
	 * @param tripId The ID of the trip to find.
	 * @return An Optional containing the TripResponse if found, or an empty
	 *         Optional if not.
	 */
	public Optional<TripResponse> findTripById(Long tripId) {
		Optional<Trip> trip = tripRepository.findById(tripId);
		return trip.map(t -> modelMapper.map(t, TripResponse.class));
	}

	/**
	 * Finds a trip by its ID and returns it as an Optional Trip entity.
	 * 
	 * @param tripId The ID of the trip to find.
	 * @return An Optional containing the Trip entity if found, or an empty Optional
	 *         if not.
	 */
	public Optional<Trip> findTripDetailsById(Long tripId) {
		return tripRepository.findById(tripId);
	}

	/**
	 * Creates or updates a trip in the repository. If the trip already exists, it
	 * is updated.
	 * 
	 * @param trip The trip entity to create or update.
	 * @return A TripResponse DTO of the saved or updated trip.
	 */
	public TripResponse createOrUpdateTrip(Trip trip) {
		Trip savedTrip = tripRepository.save(trip);
		return modelMapper.map(savedTrip, TripResponse.class);
	}

	/**
	 * Deletes a trip from the repository by its ID.
	 * 
	 * @param tripId The ID of the trip to delete.
	 */
	public void deleteTrip(Long tripId) {
		tripRepository.deleteById(tripId);
	}
}
