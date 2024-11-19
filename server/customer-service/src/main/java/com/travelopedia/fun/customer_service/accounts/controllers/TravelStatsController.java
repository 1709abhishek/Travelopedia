package com.travelopedia.fun.customer_service.accounts.controllers;

import com.travelopedia.fun.customer_service.accounts.models.Account;
import com.travelopedia.fun.customer_service.accounts.service.TravelStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/travel-stats")
public class TravelStatsController {

    @Autowired
    TravelStatsService travelStatsService;
    private int totalKilometersTravelled=0;

    @RequestMapping("/getTotalDistanceTravelled")
    public int getTotalDistanceTravelled(@RequestBody Account account) {
        List<String> placesTravelledList = Arrays.asList(account.getPlacesTravelled().split(","));
        totalKilometersTravelled = (int)travelStatsService.getTotalKilometersTravelled(account.getCountry(), placesTravelledList);
        return totalKilometersTravelled;
    }

    @RequestMapping("/getCountryPercentile")
    public int getCountryPercentile(@RequestBody Account account) {
        List<String> placesTravelledList = Arrays.asList(account.getPlacesTravelled().split(","));
//        return travelStatsService.getCountryPercentile(account.getCountry(), placesTravelledList);
        return 0;
    }

}
