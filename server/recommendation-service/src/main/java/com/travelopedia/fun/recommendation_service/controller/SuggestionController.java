package com.travelopedia.fun.recommendation_service.controller;

import com.travelopedia.fun.recommendation_service.beans.Suggestion;
import com.travelopedia.fun.recommendation_service.clients.CustomerServiceProxy;
import com.travelopedia.fun.recommendation_service.configuration.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SuggestionController {
    @Autowired
    private Configuration configuration;

    @Autowired
    private CustomerServiceProxy customerServiceProxy;



    // make a temporary list of suggestions
    List<String> suggestions = List.of("eiffel tower", "champs de ellysis", "louvre museum", "notre dame cathedral", "montmartre");


    @GetMapping("/feign")
    public String testFeignClient(@RequestHeader("Authorization") String authorization) {
        return customerServiceProxy.getExampleEndpoint(authorization);
    }

    @GetMapping("/suggestions")
    public String getSuggestions() {
        return new Suggestion(1001, configuration.getPlaces(), suggestions).toString();
    }
}
