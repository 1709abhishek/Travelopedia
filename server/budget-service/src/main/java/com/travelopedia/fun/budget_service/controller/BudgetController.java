package com.travelopedia.fun.budget_service.controller;


import com.travelopedia.fun.budget_service.clients.CustomerServiceProxy;
import com.travelopedia.fun.budget_service.configuration.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.travelopedia.fun.budget_service.service.*;
import com.travelopedia.fun.budget_service.beans.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

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

    @Autowired
    private SearchService searchService;

    @Autowired
    private CustomerServiceProxy customerServiceProxy;


    @GetMapping("/feign")
    public String testFeignClient(@RequestHeader("Authorization") String authorization) {
        return customerServiceProxy.getExampleEndpoint(authorization);
    }

    @PostMapping("/getHotelsCost")
    public ResponseEntity<Object> getCostItinerary(@RequestBody HotelRequest request) {
        try {
            List<HotelResponse> responses = hotelService.getHotelCostItinerary(request);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching hotel costs: " + e.getMessage());
        }
    }

    @PostMapping("/getFlightsCost")
    public ResponseEntity<Object> getFlightCostItinerary(@RequestBody FlightRequest request) {
        try {
            List<FlightResponse> responses = flightService.getFlightCostItinerary(request);
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching flight costs: " + e.getMessage());
        }
    }

    // Create a new hotel budget
    @PostMapping("/hotel/create")
    public ResponseEntity<Map<String, Object>> createHotelBudget(@RequestBody HotelBudgetRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            budgetService.createHotelBudget(request);
            response.put("success", true);
            response.put("message", "Hotel budget created successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred while creating hotel budget: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Create a new flight budget
    @PostMapping("/flight/create")
    public ResponseEntity<Map<String, Object>> createFlightBudget(@RequestBody FlightBudgetRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            budgetService.createFlightBudget(request);
            response.put("success", true);
            response.put("message", "Flight budget created successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred while creating flight budget: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Create a new custom budget
    @PostMapping("/custom/create")
    public ResponseEntity<Map<String, Object>> createCustomBudget(@RequestBody CustomBudgetRequest request) {
        Map<String, Object> response = new HashMap<>();
        try {
            budgetService.createCustomBudget(request);
            response.put("success", true);
            response.put("message", "Custom budget created successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "An error occurred while creating custom budget: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Retrieve budgets and details by ItineraryID
    @GetMapping("/{itineraryID}")
    public ResponseEntity<Object> getBudgets(@PathVariable Integer itineraryID) {

        try {
            List<Object> budgets = budgetService.getBudgetsByItineraryID(itineraryID);
            return ResponseEntity.ok(budgets);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while fetching budgets: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{itineraryID}")
    public ResponseEntity<Map<String, Object>> deleteItineraryBudget(@PathVariable Integer itineraryID) {
        Map<String, Object> response = new HashMap<>();
        try {
            budgetService.deleteBudgetsByItineraryID(itineraryID);
            response.put("success", true);
            response.put("message", "Budget deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            // Handle potential exceptions and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }
    }

    @DeleteMapping("/delete/{budgetId}/{type}")
    public ResponseEntity<Map<String, Object>> deleteBudgetByTypeAndId(
            @PathVariable Long budgetId,
            @PathVariable String type) {
        Map<String, Object> response = new HashMap<>();
        try {
            budgetService.deleteBudgetByTypeAndId(budgetId, type);
            response.put("success", true);
            response.put("message", "Budget deleted successfully");
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(response);
        }
    }

    @PostMapping("/airports/search")
    public ResponseEntity<Object> searchAirports(@RequestBody AirportSearchRequest request) {
        try {
            List<AirportDTO> results = searchService.searchAirports(request.getSearchTerm());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", results);
            response.put("count", results.size());

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error searching airports: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
