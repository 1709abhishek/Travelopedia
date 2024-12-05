package com.travelopedia.fun.budget_service.beans;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "trips")
public class Trip {

    @Id
    String email;

    private String destination;
    private String country;
    private String description;
    private int duration;
    private LocalDate date;

    @ElementCollection
    @CollectionTable(name = "trip_itinerary", joinColumns = @JoinColumn(name = "trip_id"))
    private List<ItineraryItem> itinerary;

    // Getters and setters


    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<ItineraryItem> getItinerary() {
        return itinerary;
    }

    public void setItinerary(List<ItineraryItem> itinerary) {
        this.itinerary = itinerary;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

@Embeddable
class ItineraryItem {
    private String time;
    private String activity;

    // Getters and setters

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }
}
