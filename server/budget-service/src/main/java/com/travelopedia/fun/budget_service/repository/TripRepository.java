package com.travelopedia.fun.budget_service.repository;

import com.travelopedia.fun.budget_service.beans.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findAllByEmail(String email);
}
