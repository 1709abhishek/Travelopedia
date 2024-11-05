package com.travelopedia.fun.customer_service.accounts.repository;


import com.travelopedia.fun.customer_service.accounts.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountsRepository extends JpaRepository<Account, Integer> {
    Account findByEmail(String email);
} 