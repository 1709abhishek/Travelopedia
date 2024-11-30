package com.travelopedia.fun.budget_service.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;

import javax.annotation.PostConstruct;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import com.travelopedia.fun.budget_service.beans.AuthToken;

@Service
public class AuthService {

    @Value("${api.client_id}")
    private String clientId;

    @Value("${api.client_secret}")
    private String clientSecret;

    @Value("${api.auth_url}")
    private String authUrl;

    @Value("${api.google_api_key}")
    private String googleApiKey;

    private final AtomicReference<String> token = new AtomicReference<>();
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    private static final int TOKEN_EXPIRY_BUFFER = 60; // Buffer to refresh token before it expires (in seconds)

    public void authenticate() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        String body = "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret;
        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<AuthToken> response = restTemplate.exchange(authUrl, HttpMethod.POST, request, AuthToken.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            AuthToken authToken = response.getBody();
            if (authToken != null) {
                token.set(authToken.getAccessToken());

                // Schedule the token refresh based on expires_in
                int expiresIn = authToken.getExpiresIn();
                scheduler.schedule(this::authenticate, expiresIn - TOKEN_EXPIRY_BUFFER, TimeUnit.SECONDS);

                System.out.println("Token refreshed successfully. Expires in: " + expiresIn + " seconds.");
            }
        } else {
            throw new RuntimeException("Failed to authenticate with API");
        }
    }

    public String getToken() {
        String currentToken = token.get();
        if (currentToken == null) {
            authenticate(); // Ensure token is available on the first call
        }
        return token.get();
    }

    public String getGoogleToken() {
        return googleApiKey;
    }

    @PostConstruct
    public void initialize() {
        authenticate(); // Authenticate immediately when the service starts
    }
}
