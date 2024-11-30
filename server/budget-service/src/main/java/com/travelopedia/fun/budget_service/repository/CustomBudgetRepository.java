package com.travelopedia.fun.budget_service.repository;

import com.travelopedia.fun.budget_service.entity.CustomBudget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CustomBudgetRepository extends JpaRepository<CustomBudget, Long> {
    List<CustomBudget> findByBudget_BudgetID(Long budgetID);
}
