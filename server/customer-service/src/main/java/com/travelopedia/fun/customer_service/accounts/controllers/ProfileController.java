package com.travelopedia.fun.customer_service.accounts.controllers;

import com.travelopedia.fun.customer_service.accounts.models.Account;
import com.travelopedia.fun.customer_service.accounts.repository.AccountsRepository;
import com.travelopedia.fun.customer_service.accounts.service.AccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    AccountsRepository accountsRepository;

    @PutMapping("/update")
    public ResponseEntity<String> updateProfile(@RequestBody Account account) {
        try {
            Account currentAccount=accountsRepository.findByEmail(account.getEmail());
            if(currentAccount==null){
                throw new IllegalArgumentException("Account not found");
            }
            System.out.println("Updating profile for account: "+currentAccount.getEmail());
            currentAccount.setName(account.getName());
            currentAccount.setPhoneNumber(account.getPhoneNumber());
            currentAccount.setCity(account.getCity());
            currentAccount.setCountry(account.getCountry());
            currentAccount.setBio(account.getBio());
            currentAccount.setFavTravelQuote(account.getFavTravelQuote());
            currentAccount.setPlacesTravelled(account.getPlacesTravelled());
            currentAccount.setWishlist(account.getWishlist());
            currentAccount.setProfilePicUrl(account.getProfilePicUrl());
            accountsRepository.save(currentAccount);

            return new ResponseEntity<>("Profile updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getDetails/{email}")
    public ResponseEntity<Account> getProfileDetails(@PathVariable String email){
        try{
            Account currentAccount=accountsRepository.findByEmail(email);
            if(currentAccount==null){
                throw new IllegalArgumentException("Account not found");
            }
            return new ResponseEntity<>(currentAccount,HttpStatus.OK);
        }catch(IllegalArgumentException e){
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }
}
