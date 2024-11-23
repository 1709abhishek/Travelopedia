package com.travelopedia.fun.budget_service.beans;

import java.util.List;

public class CustomBudgetRequest {
    private Integer itineraryID;
    private Double price;
    private String name;
    private String type;

    public Integer getItineraryID() {
        return itineraryID;
    }
    public void setItineraryID(Integer itineraryID) {
        this.itineraryID = itineraryID;
    }

    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
}