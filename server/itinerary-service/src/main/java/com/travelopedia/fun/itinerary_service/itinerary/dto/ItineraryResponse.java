package com.travelopedia.fun.itinerary_service.itinerary.dto;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.travelopedia.fun.itinerary_service.itinerary.Activity;


public class ItineraryResponse {
	
	private Long itineraryId;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date date;
    private String place;
    private List<Activity> schedule;
	public Long getItineraryId() {
		return itineraryId;
	}
	public void setItineraryId(Long itineraryId) {
		this.itineraryId = itineraryId;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public List<Activity> getSchedule() {
		return schedule;
	}
	public void setSchedule(List<Activity> schedule) {
		this.schedule = schedule;
	}
    
    

}
