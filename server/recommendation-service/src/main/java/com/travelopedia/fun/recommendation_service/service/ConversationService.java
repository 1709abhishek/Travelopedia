package com.travelopedia.fun.recommendation_service.service;

import com.travelopedia.fun.recommendation_service.model.Conversation;

import java.util.List;

public interface ConversationService {
    Conversation createConversation(String email, String conversationName);
    Conversation getConversation(String conversationId);
    List<Conversation> getConversationsByEmail(String email);
    Conversation updateConversation(String conversationId, String conversationName);
    void deleteConversation(String conversationId);
}
