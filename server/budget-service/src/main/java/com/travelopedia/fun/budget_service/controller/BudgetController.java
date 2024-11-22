package com.travelopedia.fun.budget_service.controller;


import com.travelopedia.fun.budget_service.configuration.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.travelopedia.fun.budget_service.service.HotelService;
import com.travelopedia.fun.budget_service.beans.HotelRequest;
import com.travelopedia.fun.budget_service.beans.HotelResponse;
import com.travelopedia.fun.budget_service.service.FlightService;
import com.travelopedia.fun.budget_service.beans.FlightRequest;
import com.travelopedia.fun.budget_service.beans.FlightResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budgets")
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {

    @Autowired
    private Configuration configuration;

    @Autowired
    private HotelService hotelService;

    @Autowired
    private FlightService flightService;

    @PostMapping("/getHotelsCost")
    public List<HotelResponse> getCostItinerary(@RequestBody HotelRequest request) {
        return hotelService.getHotelCostItinerary(request);
    }

    @PostMapping("getFlightsCost")
    public List<FlightResponse> getFlightCostItinerary(@RequestBody FlightRequest request) {
        return flightService.getFlightCostItinerary(request);
    }

}
