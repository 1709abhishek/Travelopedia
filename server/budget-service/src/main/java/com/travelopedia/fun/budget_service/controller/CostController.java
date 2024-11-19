package com.travelopedia.fun.budget_service.controller;


import com.travelopedia.fun.budget_service.configuration.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.travelopedia.fun.budget_service.service.CostService;
import com.travelopedia.fun.budget_service.beans.ItineraryRequest;
import com.travelopedia.fun.budget_service.beans.ItineraryResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CostController {

    @Autowired
    private Configuration configuration;

    @Autowired
    private CostService costService;

    @PostMapping("/getCostItinerary")
    public List<ItineraryResponse> getCostItinerary(@RequestBody ItineraryRequest request) {
        return costService.getCostItinerary(request);
    }

}
