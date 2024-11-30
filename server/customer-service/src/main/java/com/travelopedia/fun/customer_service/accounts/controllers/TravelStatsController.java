package com.travelopedia.fun.customer_service.accounts.controllers;

import com.travelopedia.fun.customer_service.accounts.models.Account;
import com.travelopedia.fun.customer_service.accounts.service.TravelStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/travel-stats")
public class TravelStatsController {

    private final TravelStatsService travelStatsService;

    @Autowired
    public TravelStatsController(TravelStatsService travelStatsService) {
        this.travelStatsService = travelStatsService;
    }

    @GetMapping("/distance")
    public double getDistance(@RequestParam String fromCountry, @RequestParam String toCountry) throws Exception {
        return travelStatsService.getDistance(fromCountry, toCountry);
    }

    @GetMapping("/total-distance")
    public double getTotalDistance(@RequestParam String startCountry, @RequestParam List<String> countriesVisited) throws Exception {
        return travelStatsService.getTotalDistanceTraveled(startCountry, countriesVisited);
    }

    @GetMapping("/percentile")
    public double getPercentile(@RequestParam double distanceTraveled) {
        return travelStatsService.calculatePercentile(distanceTraveled);
    }

}
