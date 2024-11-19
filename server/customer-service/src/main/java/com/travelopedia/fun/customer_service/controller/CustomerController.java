package com.travelopedia.fun.customer_service.controller;

import com.travelopedia.fun.customer_service.beans.Customer;
import com.travelopedia.fun.customer_service.configuration.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {

    @Autowired
    private Configuration configuration;

    @GetMapping("/customer")
    public String getCustomer() {
        return new Customer("John Doe", "m", "123-456-7890", "123 Main St.", configuration.getSession(), configuration.getPlaces()).toString();
    }
}
