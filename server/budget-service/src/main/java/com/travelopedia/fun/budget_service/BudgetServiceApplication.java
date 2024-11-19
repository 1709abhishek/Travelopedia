package com.travelopedia.fun.budget_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.beans.factory.annotation.Autowired;
import javax.annotation.PostConstruct;
import com.travelopedia.fun.budget_service.service.AuthService;

@SpringBootApplication
public class BudgetServiceApplication {

	@Autowired
	private AuthService authService;

	public static void main(String[] args) {
		SpringApplication.run(BudgetServiceApplication.class, args);
	}

	@PostConstruct
	public void init() {
		authService.authenticate();
		System.out.println(authService.getToken());
	}
}
