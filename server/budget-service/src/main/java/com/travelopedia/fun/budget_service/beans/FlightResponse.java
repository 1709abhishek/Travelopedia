package com.travelopedia.fun.budget_service.beans;

import java.util.List;

public class FlightResponse {
    private String departureAirportName;
    private String departureAirportId;
    private String departureTime;
    private String arrivalAirportName;
    private String arrivalAirportId;
    private String arrivalTime;
    private int duration; // Duration in minutes
    private String airplane;
    private String airline;
    private String airlineLogo;
    private String travelClass;
    private String flightNumber;
    private String legroom;
    private List<String> extensions; // Features of the flight
    private int totalDuration; // Total trip duration
    private long carbonEmissions; // Emissions in grams
    private int price; // Price in USD
    private String tripType; // Round trip or one-way
    private String departureToken; // Token for booking

    // Getters and setters
    public String getDepartureAirportName() {
        return departureAirportName;
    }

    public void setDepartureAirportName(String departureAirportName) {
        this.departureAirportName = departureAirportName;
    }

    public String getDepartureAirportId() {
        return departureAirportId;
    }

    public void setDepartureAirportId(String departureAirportId) {
        this.departureAirportId = departureAirportId;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalAirportName() {
        return arrivalAirportName;
    }

    public void setArrivalAirportName(String arrivalAirportName) {
        this.arrivalAirportName = arrivalAirportName;
    }

    public String getArrivalAirportId() {
        return arrivalAirportId;
    }

    public void setArrivalAirportId(String arrivalAirportId) {
        this.arrivalAirportId = arrivalAirportId;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getAirplane() {
        return airplane;
    }

    public void setAirplane(String airplane) {
        this.airplane = airplane;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public String getAirlineLogo() {
        return airlineLogo;
    }

    public void setAirlineLogo(String airlineLogo) {
        this.airlineLogo = airlineLogo;
    }

    public String getTravelClass() {
        return travelClass;
    }

    public void setTravelClass(String travelClass) {
        this.travelClass = travelClass;
    }

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getLegroom() {
        return legroom;
    }

    public void setLegroom(String legroom) {
        this.legroom = legroom;
    }

    public List<String> getExtensions() {
        return extensions;
    }

    public void setExtensions(List<String> extensions) {
        this.extensions = extensions;
    }

    public int getTotalDuration() {
        return totalDuration;
    }

    public void setTotalDuration(int totalDuration) {
        this.totalDuration = totalDuration;
    }

    public long getCarbonEmissions() {
        return carbonEmissions;
    }

    public void setCarbonEmissions(long carbonEmissions) {
        this.carbonEmissions = carbonEmissions;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getTripType() {
        return tripType;
    }

    public void setTripType(String tripType) {
        this.tripType = tripType;
    }

    public String getDepartureToken() {
        return departureToken;
    }

    public void setDepartureToken(String departureToken) {
        this.departureToken = departureToken;
    }
}
