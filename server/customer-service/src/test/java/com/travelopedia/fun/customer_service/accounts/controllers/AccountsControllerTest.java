package com.travelopedia.fun.customer_service.accounts.controllers;

import com.travelopedia.fun.customer_service.accounts.models.Account;
import com.travelopedia.fun.customer_service.accounts.service.AccountsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class AccountsControllerTest {

    @Mock
    private AccountsService accountsService;

    @InjectMocks
    private AccountsController accountsController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void registerAccount_Success() {
        Account account = new Account();
        doNothing().when(accountsService).registerAccount(any(Account.class));

        ResponseEntity<String> response = accountsController.registerAccount(account);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("Account registered successfully", response.getBody());
    }

    @Test
    void registerAccount_Failure() {
        Account account = new Account();
        doThrow(new IllegalArgumentException("Invalid account")).when(accountsService).registerAccount(any(Account.class));

        ResponseEntity<String> response = accountsController.registerAccount(account);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid account", response.getBody());
    }

    @Test
    void loginAccount_Success() {
        Account account = new Account();
        Map<String, Object> mockResponse = Map.of("token", "jwt-token");
        when(accountsService.loginAccount(any(Account.class))).thenReturn(mockResponse);

        ResponseEntity<?> response = accountsController.loginAccount(account);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockResponse, response.getBody());
    }

    @Test
    void loginAccount_Failure() {
        Account account = new Account();
        when(accountsService.loginAccount(any(Account.class))).thenThrow(new RuntimeException("Login failed"));

        ResponseEntity<?> response = accountsController.loginAccount(account);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals(Map.of("error", "Login failed: Login failed"), response.getBody());
    }

    @Test
    void logoutAccount_Success() {
        String token = "Bearer jwt-token";
        doNothing().when(accountsService).logoutAccount(anyString());

        ResponseEntity<String> response = accountsController.logoutAccount(token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Logout successful", response.getBody());
    }

    @Test
    void logoutAccount_Failure() {
        String token = "Bearer jwt-token";
        doThrow(new RuntimeException("Logout failed")).when(accountsService).logoutAccount(anyString());

        ResponseEntity<String> response = accountsController.logoutAccount(token);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Logout failed: Logout failed", response.getBody());
    }

    @Test
    void isLoggedIn_Success() {
        when(accountsService.isUserLoggedIn()).thenReturn(true);

        ResponseEntity<Boolean> response = accountsController.isLoggedIn();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(true, response.getBody());
    }

    @Test
    void oauth2Login_Success() {
        String response = accountsController.oauth2Login();

        assertEquals("redirect:/oauth2/authorization/google", response);
    }

    @Test
    void getExampleEndpoint_Success() {
        String token = "Bearer jwt-token";
        when(accountsService.authenticateToken(anyString())).thenReturn("username");

        ResponseEntity<?> response = accountsController.getExampleEndpoint(token);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(Map.of("username", "username"), response.getBody());
    }

    @Test
    void getExampleEndpoint_Failure() {
        String token = "Bearer jwt-token";
        when(accountsService.authenticateToken(anyString())).thenThrow(new IllegalArgumentException("Invalid token"));

        ResponseEntity<?> response = accountsController.getExampleEndpoint(token);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals(Map.of("error", "Invalid token"), response.getBody());
    }
}