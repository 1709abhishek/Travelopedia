package com.travelopedia.fun.customer_service.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.travelopedia.fun.customer_service.accounts.security.FeignInterceptor;

@Configuration
public class FeignClientConfiguration {

    @Bean
    public FeignInterceptor feignInterceptor() {
        return new FeignInterceptor();
    }
}