package com.travelopedia.fun.budget_service.repository;

import com.travelopedia.fun.budget_service.entity.Flights;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FlightsRepository extends JpaRepository<Flights, Long> {
    List<Flights> findByBudget_BudgetID(Long budgetID);
}
