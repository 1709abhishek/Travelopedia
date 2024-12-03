package com.travelopedia.fun.recommendation_service.service;

import com.travelopedia.fun.recommendation_service.repository.ConversationRepository;
import com.travelopedia.fun.recommendation_service.model.Conversation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
public class ConversationServiceImpl implements ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    @Override
    public Conversation createConversation(String email, String conversationName) {
        Conversation conversation = new Conversation();
        conversation.setConversationId(UUID.randomUUID().toString());
        conversation.setEmail(email);
        conversation.setConversationName(conversationName);
        return conversationRepository.save(conversation);
    }

    @Override
    public Conversation getConversation(String conversationId) {
        return conversationRepository.findByConversationId(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
    }

    @Override
    public List<Conversation> getConversationsByEmail(String email) {
        return conversationRepository.findByEmail(email);
    }

    @Override
    public Conversation updateConversation(String conversationId, String conversationName) {
        Conversation conversation = getConversation(conversationId);
        conversation.setConversationName(conversationName);
        return conversationRepository.save(conversation);
    }

    @Override
    public void deleteConversation(String conversationId) {
        Conversation conversation = getConversation(conversationId);
        conversationRepository.delete(conversation);
    }
}
