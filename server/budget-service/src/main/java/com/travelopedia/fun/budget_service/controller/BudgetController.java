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
import com.travelopedia.fun.budget_service.beans.FlightBudgetRequest;
import com.travelopedia.fun.budget_service.beans.HotelBudgetRequest;
import org.springframework.web.bind.annotation.*;
import com.travelopedia.fun.budget_service.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:5173")
public class BudgetController {

    @Autowired
    private Configuration configuration;

    @Autowired
    private HotelService hotelService;

    @Autowired
    private FlightService flightService;

    @Autowired
    private BudgetService budgetService;

    @PostMapping("/getHotelsCost")
    public List<HotelResponse> getCostItinerary(@RequestBody HotelRequest request) {
        return hotelService.getHotelCostItinerary(request);
    }

    @PostMapping("/getFlightsCost")
    public List<FlightResponse> getFlightCostItinerary(@RequestBody FlightRequest request) {
        return flightService.getFlightCostItinerary(request);
    }

    // Create a new budget
    @PostMapping("/hotel/create")
    public ResponseEntity<String> createBudget(@RequestBody HotelBudgetRequest request) {
        budgetService.createHotelBudget(request);
        return ResponseEntity.ok("Budget created successfully");
    }

    @PostMapping("/flight/create")
    public ResponseEntity<String> createBudget(@RequestBody FlightBudgetRequest request) {
        budgetService.createFlightBudget(request);
        return ResponseEntity.ok("Budget created successfully");
    }

    @PostMapping("/custom/create")
    public ResponseEntity<String> createBudget(@RequestBody CustomBudgetRequest request) {
        budgetService.createCustomBudget(request);
        return ResponseEntity.ok("Budget created successfully");
    }

    // Retrieve budgets and details by ItineraryID
    @GetMapping("/{itineraryID}")
    public ResponseEntity<List<Object>> getBudgets(@PathVariable Integer itineraryID) {
        List<Object> budgets = budgetService.getBudgetsByItineraryID(itineraryID);
        return ResponseEntity.ok(budgets);
    }

}
