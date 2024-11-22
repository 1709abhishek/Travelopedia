package com.travelopedia.fun.budget_service.beans;

public class HotelResponse {
    private String hotelName;
    private String hotelId;
    private String cityCode;
    private double price;
    private boolean available;
    private String currency;

    // Constructor
    public HotelResponse(String hotelName, String hotelId, String cityCode, double price, boolean available, String currency) {
        this.hotelName = hotelName;
        this.hotelId = hotelId;
        this.cityCode = cityCode;
        this.price = price;
        this.available = available;
        this.currency = currency;
    }

    // Getters and Setters
    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getHotelId() {
        return hotelId;
    }

    public void setHotelId(String hotelId) {
        this.hotelId = hotelId;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getCurrency() { return currency; }

    public void setCurrency(String currency) { this.currency = currency; }
}
