package com.travelopedia.fun.recommendation_service.repository;


import com.travelopedia.fun.recommendation_service.model.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    List<Conversation> findByEmail(String email);
    Optional<Conversation> findByConversationId(String conversationId);
}
