package com.travelopedia.fun.itinerary_service.trip;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.travelopedia.fun.itinerary_service.itinerary.Itinerary;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "trip")
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "tripId")
@ToString
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class Trip {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long tripId;
	private String country;
	private String city;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date startDate;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date endDate;
	@OneToMany(mappedBy = "trip", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Itinerary> itineraries = new ArrayList<>();

	public Long getTripId() {
		return tripId;
	}

	public void setTripId(Long tripId) {
		this.tripId = tripId;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public List<Itinerary> getItineraries() {
		return itineraries;
	}

	public void setItineraries(List<Itinerary> itineraries) {
		this.itineraries = itineraries;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

}
