package com.travelopedia.fun.customer_service.accounts.models;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

// import jakarta.annotation.Generated;

@Data
@Entity
@Getter
@Setter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    private String firstName;
    private String lastName;
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String city;
    private String country;
    private String bio;
    private String favTravelQuote;
    private String profilePicUrl;

    @Column(columnDefinition = "JSON")
    private String placesTravelled;

    @Column(columnDefinition = "JSON")
    private String wishlist;

    public void setPlacesTravelled(List<String> placesTravelled) {
        try {
            this.placesTravelled = objectMapper.writeValueAsString(placesTravelled);
        } catch (Exception e) {
            throw new RuntimeException("Error serializing placesTravelled", e);
        }
    }

    public List<String> getPlacesTravelled() {
        try {
            // Handle null gracefully
            if (this.placesTravelled == null || this.placesTravelled.isEmpty()) {
                return List.of(); // Return an empty list if null or empty
            }
            return objectMapper.readValue(this.placesTravelled, List.class);
        } catch (Exception e) {
            throw new RuntimeException("Error deserializing placesTravelled", e);
        }
    }

    public void setWishlist(List<String> wishlist) {
        try {
            this.wishlist = objectMapper.writeValueAsString(wishlist);
        } catch (Exception e) {
            throw new RuntimeException("Error serializing wishlist", e);
        }
    }

    public List<String> getWishlist() {
        try {
            // Handle null gracefully
            if (this.wishlist == null || this.wishlist.isEmpty()) {
                return List.of(); // Return an empty list if null or empty
            }
            return objectMapper.readValue(this.wishlist, List.class);
        } catch (Exception e) {
            throw new RuntimeException("Error deserializing wishlist", e);
        }
    }
}

