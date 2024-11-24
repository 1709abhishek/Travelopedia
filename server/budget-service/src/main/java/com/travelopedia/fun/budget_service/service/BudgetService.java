package com.travelopedia.fun.budget_service.service;

import com.travelopedia.fun.budget_service.entity.*;
import com.travelopedia.fun.budget_service.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.travelopedia.fun.budget_service.beans.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private FlightsRepository flightsRepository;

    @Autowired
    private CustomBudgetRepository customBudgetRepository;

    public void createHotelBudget(HotelBudgetRequest request){
        Budgets budget = new Budgets();
        budget.setItineraryID(request.getItineraryID());
        budget.setType(request.getType());
        budget.setPrice(request.getPrice());

        Budgets savedBudget = budgetRepository.save(budget);

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (HotelBudgetRequest.Item item : request.getItems()) {
                Hotel hotel = new Hotel();
                hotel.setBudget(savedBudget);
                hotel.setName(item.getHotelName());
                hotel.setPrice(item.getPrice());
                hotel.setCity(item.getCityCode());
                hotel.setGuests(item.getGuests());
                hotel.setStartDate(item.getStartDate());
                hotel.setEndDate(item.getEndDate());
                hotelRepository.save(hotel);
            }
        }
    }

    public void createFlightBudget(FlightBudgetRequest request){
        Budgets budget = new Budgets();
        budget.setItineraryID(request.getItineraryID());
        budget.setType(request.getType());
        budget.setPrice(request.getPrice());

        Budgets savedBudget = budgetRepository.save(budget);

        if (request.getItems() != null && !request.getItems().isEmpty()) {
            for (FlightBudgetRequest.Item item : request.getItems()) {
                Flights flight = new Flights();
                flight.setBudget(savedBudget);
                flight.setFlightNumber(item.getFlightNumber());
                flight.setName(item.getAirplane());
                flight.setFromLocation(item.getDepartureAirportName());
                flight.setToLocation(item.getArrivalAirportName());
                flight.setDepartureDate(item.getDepartureTime());
                flight.setArrivalDate(item.getArrivalTime());
                flight.setPrice(item.getPrice());
                flight.setAdults(item.getAdults());
                flightsRepository.save(flight);
            }
        }
    }

    public void createCustomBudget(CustomBudgetRequest request){
        Budgets budget = new Budgets();
        budget.setItineraryID(request.getItineraryID());
        budget.setType(request.getType());
        budget.setPrice(request.getPrice());
        Budgets savedBudget = budgetRepository.save(budget);

        CustomBudget custom = new CustomBudget();
        custom.setBudget(savedBudget);
        custom.setName(request.getName());
        custom.setPrice(request.getPrice());
        customBudgetRepository.save(custom);
    }

    // Retrieve all Budgets and their details for a given ItineraryID
    public List<Object> getBudgetsByItineraryID(Integer itineraryID) {
        List<Budgets> budgets = budgetRepository.findByItineraryID(itineraryID);
        List<Object> results = new ArrayList<>();

        System.out.println("Budgets found: " + budgets);

        for (Budgets budget : budgets) {
            switch (budget.getType().toLowerCase()) {
                case "hotel" -> results.add(hotelRepository.findByBudget_BudgetID(budget.getBudgetID()));
                case "flight" -> results.add(flightsRepository.findByBudget_BudgetID(budget.getBudgetID()));
                case "custom" -> results.add(customBudgetRepository.findByBudget_BudgetID(budget.getBudgetID()));
            }
        }
        return results;
    }

    public void deleteBudgetsByItineraryID(Integer itineraryID) {
        // Fetch all budgets associated with the itineraryID
        List<Budgets> budgets = budgetRepository.findByItineraryID(itineraryID);

        if (budgets != null && !budgets.isEmpty()) {
            for (Budgets budget : budgets) {
                // Delete related entities based on the type of the budget
                switch (budget.getType().toLowerCase()) {
                    case "hotel" -> {
                        List<Hotel> hotels = hotelRepository.findByBudget_BudgetID(budget.getBudgetID());
                        if (hotels != null && !hotels.isEmpty()) {
                            hotelRepository.deleteAll(hotels);
                        }
                    }
                    case "flight" -> {
                        List<Flights> flights = flightsRepository.findByBudget_BudgetID(budget.getBudgetID());
                        if (flights != null && !flights.isEmpty()) {
                            flightsRepository.deleteAll(flights);
                        }
                    }
                    case "custom" -> {
                        List<CustomBudget> customBudget = customBudgetRepository.findByBudget_BudgetID(budget.getBudgetID());
                        if (customBudget != null && !customBudget.isEmpty()) {
                            customBudgetRepository.deleteAll(customBudget);
                        }
                    }
                }
                // Delete the budget itself
                budgetRepository.delete(budget);
            }
        }
    }

    public void deleteBudgetByTypeAndId(Long budgetId, String type) {
        switch (type.toLowerCase()) {
            case "hotel" -> {
                List<Hotel> hotels = hotelRepository.findByBudget_BudgetID(budgetId);
                if (hotels != null && !hotels.isEmpty()) {
                    hotelRepository.deleteAll(hotels);
                }
            }
            case "flight" -> {
                List<Flights> flights = flightsRepository.findByBudget_BudgetID(budgetId);
                if (flights != null && !flights.isEmpty()) {
                    flightsRepository.deleteAll(flights);
                }
            }
            case "custom" -> {
                List<CustomBudget> customBudget = customBudgetRepository.findByBudget_BudgetID(budgetId);
                if (customBudget != null && !customBudget.isEmpty()) {
                    customBudgetRepository.deleteAll(customBudget);
                }
            }
            default -> throw new IllegalArgumentException("Invalid budget type: " + type);
        }

        // Finally, delete the budget itself
        Budgets budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new IllegalArgumentException("Budget not found with ID: " + budgetId));
        budgetRepository.delete(budget);
    }
}
