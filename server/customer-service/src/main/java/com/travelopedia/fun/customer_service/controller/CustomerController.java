package com.travelopedia.fun.customer_service.controller;

import com.travelopedia.fun.customer_service.beans.Customer;
import com.travelopedia.fun.customer_service.configuration.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.travelopedia.fun.customer_service.accounts.service.AccountsService;

@RestController
@RequestMapping("/")
public class CustomerController {

    @Autowired
    private Configuration configuration;

    @Autowired
    private AccountsService accountsService;

    // When oauth2 is successful, the user details are saved in the database
    @GetMapping
    public Object sayHello(Authentication authentication) {
        // System.out.println("Authentication: " + authentication);
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

        // Extract required details
        String sub = oauth2User.getAttribute("sub");  // Unique identifier (user ID)
        String name = oauth2User.getAttribute("name");  // User's name
        String email = oauth2User.getAttribute("email");  // User's email

        // Save these details in the database or process them further
        accountsService.saveUserDetails(sub, name, email);

        return "User info saved successfully";

        // return authentication.getPrincipal(); // To see full details of user on the browser received from google 
    }

    @GetMapping("/customer")
    public String getCustomer() {
        return new Customer("John Doe", "m", "123-456-7890", "123 Main St.", configuration.getSession(), configuration.getPlaces()).toString();
    }
}
