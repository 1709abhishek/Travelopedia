package com.travelopedia.fun.recommendation_service.service;

import com.travelopedia.fun.recommendation_service.model.Chat;
import com.travelopedia.fun.recommendation_service.model.ChatMessage;
import java.util.List;

public interface ChatService {
    List<ChatMessage> getChatMessagesByConversationId(String conversationId);
    ChatMessage addMessage(ChatMessage message);
    void deleteChat(String conversationId);
}
