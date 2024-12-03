package com.travelopedia.fun.recommendation_service.repository;


import com.travelopedia.fun.recommendation_service.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByConversationId(String conversationId);
    void deleteByConversationId(String conversationId);
}
