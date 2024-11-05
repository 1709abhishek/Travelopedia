package com.travelopedia.fun.itinerary_service.beans;

import java.util.List;

public class Tour {
    private String name;
    private String description;
    private String places;

    public Tour(String name, String description, String places) {
        this.name = name;
        this.description = description;
        this.places = places;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getPlaces() {
        return places;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPlaces(String places) {
        this.places = places;
    }

    @Override
    public String toString() {
        return "Tour{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", places=" + places +
                '}';
    }
}