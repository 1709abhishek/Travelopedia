package com.travelopedia.fun.budget_service.repository;

import com.travelopedia.fun.budget_service.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {
    List<Hotel> findByBudget_BudgetID(Long budgetID);
}
