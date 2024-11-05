package com.travelopedia.fun.itinerary_service.controller;

import com.travelopedia.fun.itinerary_service.beans.Tour;
import com.travelopedia.fun.itinerary_service.configuration.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ItineraryController {

    @Autowired
    private Configuration configuration;

    @GetMapping("/tour")
    public String getTour() {
        return new Tour("Tour of the City", "A tour of the city's most famous landmarks", configuration.getPlaces()).toString();
    }
}

