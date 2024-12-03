package com.travelopedia.fun.recommendation_service.repository;

import com.travelopedia.fun.recommendation_service.model.Chat;
import com.travelopedia.fun.recommendation_service.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByConversationId(String conversationId);
    List<Chat> findByEmail(String email);
}
