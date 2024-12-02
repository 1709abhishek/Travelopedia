package com.travelopedia.fun.itinerary_service.itinerary;

import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Activity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long scheduleId;
	private LocalTime time;
	private String place;
	private String googleLink;
	@ManyToOne
	@JoinColumn(name = "itinerary_id")
	@JsonIgnoreProperties("schedule")
	private Itinerary itinerary;

	public Activity() {
	}

	public Activity(String place, String googleLink) {
		this.place = place;
		this.googleLink = googleLink;
	}

	public Long getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(Long scheduleId) {
		this.scheduleId = scheduleId;
	}

	public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime time) {
		this.time = time;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getGoogleLink() {
		return googleLink;
	}

	public void setGoogleLink(String googleLink) {
		this.googleLink = googleLink;
	}

	public Itinerary getItinerary() {
		return itinerary;
	}

	public void setItinerary(Itinerary itinerary) {
		this.itinerary = itinerary;
	}

}
