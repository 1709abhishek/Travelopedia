package com.travelopedia.fun.budget_service.controller;


import com.travelopedia.fun.budget_service.beans.Cost;
import com.travelopedia.fun.budget_service.configuration.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CostController {

    @Autowired
    private Configuration configuration;

    List<String> suggestions = List.of("eiffel tower", "champs de ellysis", "louvre museum", "notre dame cathedral", "montmartre");
    List<Integer> cost = List.of(100, 200, 300, 400, 500);
    @GetMapping("/cost")
    public String getCost() {
        return new Cost(1001, configuration.getPlaces(), suggestions, cost).toString();
    }

}
