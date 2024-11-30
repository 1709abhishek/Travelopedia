package com.travelopedia.fun.budget_service.repository;

import com.travelopedia.fun.budget_service.entity.Budgets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budgets, Long> {
    List<Budgets> findByItineraryID(Integer itineraryID);
}
