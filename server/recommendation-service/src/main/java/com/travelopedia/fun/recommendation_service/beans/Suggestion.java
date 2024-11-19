package com.travelopedia.fun.recommendation_service.beans;

import java.util.List;

public class Suggestion {

    private int id;
    private String place;
    private List<String> suggestions;

    public Suggestion(int id, String place, List<String> suggestions) {
        this.id = id;
        this.place = place;
        this.suggestions = suggestions;
    }

    public int getId() {
        return id;
    }

    public String getPlace() {
        return place;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }

    @Override
    public String toString() {
        return "Suggestion{" +
                "id=" + id +
                ", place='" + place + '\'' +
                ", suggestions=" + suggestions +
                '}';
    }
}
