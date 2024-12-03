package com.travelopedia.fun.recommendation_service.model;

import lombok.Data;
import jakarta.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "chats")
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "conversation_id")
    private String conversationId;

    private String email;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id")
    private List<ChatMessage> messages;
}
