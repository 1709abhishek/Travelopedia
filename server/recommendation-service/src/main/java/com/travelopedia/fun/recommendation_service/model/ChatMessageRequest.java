package com.travelopedia.fun.recommendation_service.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageRequest {
    private String message;
    private String role;
}
