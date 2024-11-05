package com.travelopedia.fun.recommendation_service.controller;

import com.travelopedia.fun.recommendation_service.beans.Suggestion;
import com.travelopedia.fun.recommendation_service.configuration.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SuggestionController {
    @Autowired
    private Configuration configuration;

    // make a temporary list of suggestions
    List<String> suggestions = List.of("eiffel tower", "champs de ellysis", "louvre museum", "notre dame cathedral", "montmartre");

    @GetMapping("/suggestions")
    public String getSuggestions() {
        return new Suggestion(1001, configuration.getPlaces(), suggestions).toString();
    }
}
