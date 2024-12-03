package com.travelopedia.fun.recommendation_service.model;

import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "chat_messages")
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "conversation_id")
    private String conversationId;

    private String role;

    @Column(name = "content", length = 10000)
    private String content;
}
