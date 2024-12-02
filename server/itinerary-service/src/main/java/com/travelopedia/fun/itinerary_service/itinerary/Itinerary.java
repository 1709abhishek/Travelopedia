package com.travelopedia.fun.itinerary_service.itinerary;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.travelopedia.fun.itinerary_service.trip.Trip;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "itinerary")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "itineraryId")
@ToString
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Itinerary {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long itineraryId;
	private Date date;
	private String place;
	@OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JsonIgnoreProperties("itinerary")
	private List<Activity> schedule;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "trip_id")
	@JsonIgnore
	private Trip trip;

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

	public List<Activity> getSchedule() {
		return schedule;
	}

	public void setSchedule(List<Activity> schedule) {
		this.schedule = schedule;
	}

	public Trip getTrip() {
		return trip;
	}

	public void setTrip(Trip trip) {
		this.trip = trip;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

}
