package com.travelopedia.fun.budget_service.clients;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.FeignClientProperties;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "customer-service", url="http://localhost:8080", configuration = FeignClientProperties.FeignClientConfiguration.class)
public interface CustomerServiceProxy {

    @GetMapping("/accounts/verify-token")
    public String getExampleEndpoint(@RequestHeader("Authorization") String authorization);
}