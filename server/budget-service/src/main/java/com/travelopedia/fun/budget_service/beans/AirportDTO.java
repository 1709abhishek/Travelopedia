package com.travelopedia.fun.budget_service.beans;

public class AirportDTO {
    private Long id;
    private String name;
    private String city;
    private String country;
    private String iata;

    public AirportDTO() {}

    public AirportDTO(Long id, String name, String city, String country, String iata) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.iata = iata;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getIata() {
        return iata;
    }

    public void setIata(String iata) {
        this.iata = iata;
    }
}