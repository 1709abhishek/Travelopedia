package com.travelopedia.fun.customer_service.accounts.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import com.travelopedia.fun.customer_service.accounts.models.Account;
import com.travelopedia.fun.customer_service.accounts.service.AccountsService;
import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/accounts")
public class AccountsController {

    @Autowired
    AccountsService accountsService;
    
    @PostMapping("/register")
    public ResponseEntity<String> registerAccount(@RequestBody Account account) {
        System.out.println("Registering account: ");
        try {
            accountsService.registerAccount(account);
            return new ResponseEntity<>("Account registered successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAccount(@RequestBody Account account) {
        try {
            Map<String, Object> response = accountsService.loginAccount(account);
            // System.out.println("JWT token: " + jwt); // Todo: Save this token client side
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Login failed: " + e.getMessage());
            return new ResponseEntity<>(Map.of("error", "Login failed: " + e.getMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutAccount(@RequestHeader("Authorization") String token) {
        try {
            // System.out.println("Token: " + token);
            String jwtToken = token.substring(7);
            // System.out.println("JWT token: " + jwtToken); // Todo: delete token client side
            accountsService.logoutAccount(jwtToken);
            System.out.println("Logged out");
            return new ResponseEntity<>("Logout successful", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Logout failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // For testing purpose only
    @GetMapping("/isLoggedIn")
    public ResponseEntity<Boolean> isLoggedIn() {
        boolean isLoggedIn = accountsService.isUserLoggedIn();
        return new ResponseEntity<>(isLoggedIn, HttpStatus.OK);
    }

    // OAuth2 login endpoint
    @GetMapping("/login/oauth2")
    public String oauth2Login() {
        // System.out.println("OAuth2 login");
        return "redirect:/oauth2/authorization/google";
    }

    @GetMapping("/verify-token")
    public ResponseEntity<?> getExampleEndpoint(@RequestHeader("Authorization") String authorization) {
        try {
            String username = accountsService.authenticateToken(authorization);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Token is valid");
            response.put("username", username);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    // To check oauth2 login: http://localhost:8080/login
    // When OAuth2 is success then it goes into CustomerController sayHello method to save user details

}
