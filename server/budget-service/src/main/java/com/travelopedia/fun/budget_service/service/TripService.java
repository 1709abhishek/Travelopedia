package com.travelopedia.fun.budget_service.service;

import com.travelopedia.fun.budget_service.beans.Trip;
import com.travelopedia.fun.budget_service.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }

    public List<Trip> getTripsById(String email) {
        return tripRepository.findAllByEmail(email);
    }

    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public Trip updateTrip(Long id, Trip tripDetails) {
        Optional<Trip> trip = tripRepository.findById(id);
        if (trip.isPresent()) {
            Trip existingTrip = trip.get();
            existingTrip.setDestination(tripDetails.getDestination());
            existingTrip.setCountry(tripDetails.getCountry());
            existingTrip.setDescription(tripDetails.getDescription());
            existingTrip.setDuration(tripDetails.getDuration());
            existingTrip.setDate(tripDetails.getDate());
            existingTrip.setItinerary(tripDetails.getItinerary());
            return tripRepository.save(existingTrip);
        }
        return null;
    }

    public void deleteTrip(Long id) {
        tripRepository.deleteById(id);
    }
}
