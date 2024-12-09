package com.travelopedia.fun.customer_service.accounts.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelopedia.fun.customer_service.accounts.models.Account;
import com.travelopedia.fun.customer_service.accounts.repository.AccountsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ProfileControllerTest {

    @Mock
    private AccountsRepository accountsRepository;

    @InjectMocks
    private ProfileController profileController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void updateProfile_Success() {
        Account account = new Account();
        account.setEmail("test@example.com");
        account.setName("Test User");

        Account currentAccount = new Account();
        currentAccount.setEmail("test@example.com");

        when(accountsRepository.findByEmail(anyString())).thenReturn(currentAccount);
        when(accountsRepository.save(any(Account.class))).thenReturn(currentAccount);

        ResponseEntity<String> response = profileController.updateProfile(account);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Profile updated successfully", response.getBody());
    }

    @Test
    void updateProfile_AccountNotFound() {
        Account account = new Account();
        account.setEmail("test@example.com");

        when(accountsRepository.findByEmail(anyString())).thenReturn(null);

        ResponseEntity<String> response = profileController.updateProfile(account);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Account not found", response.getBody());
    }

    @Test
    void updateProfile_InternalServerError() {
        Account account = new Account();
        account.setEmail("test@example.com");

        Account currentAccount = new Account();
        currentAccount.setEmail("test@example.com");

        when(accountsRepository.findByEmail(anyString())).thenReturn(currentAccount);
        doThrow(new RuntimeException("Unexpected error")).when(accountsRepository).save(any(Account.class));

        ResponseEntity<String> response = profileController.updateProfile(account);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("An error occurred while updating the profile", response.getBody());
    }

    @Test
    void getProfileDetails_Success() {
        Account account = new Account();
        account.setEmail("test@example.com");

        when(accountsRepository.findByEmail(anyString())).thenReturn(account);

        ResponseEntity<Account> response = profileController.getProfileDetails("test@example.com");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(account, response.getBody());
    }

    @Test
    void getProfileDetails_AccountNotFound() {
        when(accountsRepository.findByEmail(anyString())).thenReturn(null);

        ResponseEntity<Account> response = profileController.getProfileDetails("test@example.com");

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(null, response.getBody());
    }
}