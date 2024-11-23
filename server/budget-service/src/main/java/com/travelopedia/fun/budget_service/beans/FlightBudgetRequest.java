package com.travelopedia.fun.budget_service.beans;

import java.util.List;

public class FlightBudgetRequest {
    private Integer itineraryID;
    private String type;
    private Double price;
    private List<Item> items;

    // Getters and Setters for BudgetRequest fields
    public Integer getItineraryID() {
        return itineraryID;
    }

    public void setItineraryID(Integer itineraryID) {
        this.itineraryID = itineraryID;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public static class Item {
        private String departureAirportName;
        private String departureAirportId;
        private String departureTime;
        private String arrivalAirportName;
        private String arrivalAirportId;
        private String arrivalTime;
        private Integer duration;
        private String airplane;
        private String airline;
        private String airlineLogo;
        private String travelClass;
        private String flightNumber;
        private String legroom;
        private Integer totalDuration;
        private Integer carbonEmissions;
        private Double price;
        private String tripType;
        private int adults;

        // Getters and Setters for Item fields
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

        public Integer getDuration() {
            return duration;
        }

        public void setDuration(Integer duration) {
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

        public Integer getTotalDuration() {
            return totalDuration;
        }

        public void setTotalDuration(Integer totalDuration) {
            this.totalDuration = totalDuration;
        }

        public Integer getCarbonEmissions() {
            return carbonEmissions;
        }

        public void setCarbonEmissions(Integer carbonEmissions) {
            this.carbonEmissions = carbonEmissions;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        public String getTripType() {
            return tripType;
        }

        public void setTripType(String tripType) {
            this.tripType = tripType;
        }

        public int getAdults() {
            return adults;
        }

        public void setAdults(int adults) {
            this.adults = adults;
        }
    }
}
