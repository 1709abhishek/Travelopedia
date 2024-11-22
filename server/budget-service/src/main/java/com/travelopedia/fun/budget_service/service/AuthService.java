package com.travelopedia.fun.budget_service.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;
import java.util.concurrent.atomic.AtomicReference;
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
    private String google_api_key;

    private final AtomicReference<String> token = new AtomicReference<>();

    public void authenticate() {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        String body = "grant_type=client_credentials&client_id=" + clientId + "&client_secret=" + clientSecret;
        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<AuthToken> response = restTemplate.exchange(authUrl, HttpMethod.POST, request, AuthToken.class);
        if (response.getStatusCode().is2xxSuccessful()) {
            token.set(response.getBody().getAccessToken());
        } else {
            throw new RuntimeException("Failed to authenticate with API");
        }
    }

    public String getToken() {
        return token.get();
    }

    public String getGoogleToken() {
        return google_api_key;
    }
}
