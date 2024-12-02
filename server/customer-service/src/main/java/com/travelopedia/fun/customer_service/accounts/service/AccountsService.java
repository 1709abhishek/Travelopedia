package com.travelopedia.fun.customer_service.accounts.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.travelopedia.fun.customer_service.accounts.models.Account;
import com.travelopedia.fun.customer_service.accounts.repository.AccountsRepository;
import com.travelopedia.fun.customer_service.accounts.security.JwtUtil;

import java.util.HashMap;
import java.util.Map;

@Service
public class AccountsService {

    private final AccountsRepository accountsRepository;
    private final AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public AccountsService(AccountsRepository accountsRepository, AuthenticationManager authenticationManager) {
        this.accountsRepository = accountsRepository;
        this.authenticationManager = authenticationManager;
    }

    public boolean isAccountRegistered(String email) {
        return accountsRepository.findByEmail(email) != null;
    }
    
    public void registerAccount(Account account) {

        String newName = account.getName();
        String newEmail = account.getEmail();
        String newEncryptedPassword = passwordEncoder.encode(account.getPassword());

        System.out.println("Name: " + newName);
        System.out.println("Email: " + newEmail);
        System.out.println("Password: " + newEncryptedPassword);

        if(isAccountRegistered(newEmail)) {
            throw new IllegalArgumentException("Email is already registered");
        }

        Account newAccount = new Account();
        newAccount.setName(newName);
        newAccount.setEmail(newEmail);
        newAccount.setPassword(newEncryptedPassword);

        accountsRepository.save(newAccount);
    }

    public String loginAccount(Account account) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(account.getEmail(), account.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        System.out.println("Logged in");
        // Generate JWT token
        UserDetails userDetails = userDetailsService.loadUserByUsername(account.getEmail());
        String jwt = jwtUtil.generateToken(userDetails.getUsername());
        return jwt;
    }

    public void logoutAccount(String jwtToken) {
        SecurityContextHolder.clearContext(); // jwtToken to blacklist it
        System.out.println(SecurityContextHolder.getContext().getAuthentication());
    }

    public boolean isUserLoggedIn() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated() && !(authentication instanceof AnonymousAuthenticationToken);

    }
    public void saveUserDetails(String sub, String name, String email) {
        Account account = new Account();
        account.setName(name);
        account.setEmail(email);
        System.out.println("Email: " + email);
        System.out.println("Name: " + name);
        System.out.println("Sub: " + sub);
        // account.setPassword(sub);
        saveOrUpdateAccount(account);
    }
    public void saveOrUpdateAccount(Account account) {
        Account existingAccount = accountsRepository.findByEmail(account.getEmail());
        if (existingAccount != null) {
            existingAccount.setName(account.getName());
            accountsRepository.save(existingAccount);
        } else {
            accountsRepository.save(account);
        }
    }

    public String authenticateToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            System.out.println("Username: " + username + token);
            if (username != null) {
                return username;
            }
        }
        throw new IllegalArgumentException("Invalid token");
    }

}
