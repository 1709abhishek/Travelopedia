package com.travelopedia.fun.budget_service.controller;

import com.travelopedia.fun.budget_service.beans.Trip;
import com.travelopedia.fun.budget_service.clients.CustomerServiceProxy;
import com.travelopedia.fun.budget_service.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private TripService tripService;

    @Autowired
    private CustomerServiceProxy customerServiceProxy;



    @PostMapping
    public ResponseEntity<Trip> createTrip(@RequestBody Trip trip, @RequestHeader("Authorization") String authorization) {
        String email = customerServiceProxy.getExampleEndpoint(authorization);
        if(email == null) {
            return ResponseEntity.status(401).build();
        }
        trip.setEmail(email);
        Trip newTrip = tripService.createTrip(trip);
        return ResponseEntity.ok(newTrip);
    }

    @GetMapping
    public ResponseEntity<List<Trip>> getTrips(@RequestHeader("Authorization") String authorization) {
        String email = customerServiceProxy.getExampleEndpoint(authorization);
        if (email == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(tripService.getTripsById(email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable Long id, @RequestBody Trip tripDetails, @RequestHeader("Authorization") String authorization) {
        Trip updatedTrip = tripService.updateTrip(id, tripDetails);
        if (updatedTrip != null) {
            return ResponseEntity.ok(updatedTrip);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add-from-chat")
    public ResponseEntity<Trip> addTripFromChat(@RequestBody Trip trip) {
        Trip newTrip = tripService.createTrip(trip);
        return ResponseEntity.ok(newTrip);
    }
}
