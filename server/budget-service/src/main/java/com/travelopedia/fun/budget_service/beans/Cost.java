package com.travelopedia.fun.budget_service.beans;

import java.util.List;

public class Cost {

    private int id;
    private String place;
    private List<String> places;
    private List<Integer> costs;

    public Cost(int id, String place,List<String> places, List<Integer> costs) {
        this.id = id;
        this.place = place;
        this.places = places;
        this.costs = costs;
    }

    public int getId() {
        return id;
    }

    public String getPlace() {
        return place;
    }

    public List<String> getPlaces() {
        return places;
    }

    public List<Integer> getCosts() {
        return costs;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public void setPlaces(List<String> places) {
        this.places = places;
    }

    public void setCosts(List<Integer> costs) {
        this.costs = costs;
    }

    @Override
    public String toString() {
        return "Cost{" +
                "id=" + id +
                ", place='" + place + '\'' +
                ", places=" + places +
                ", costs=" + costs +
                '}';
    }


}
