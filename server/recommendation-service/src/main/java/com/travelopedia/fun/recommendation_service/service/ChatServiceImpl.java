package com.travelopedia.fun.recommendation_service.service;

import com.travelopedia.fun.recommendation_service.model.Chat;
import com.travelopedia.fun.recommendation_service.model.ChatMessage;
import com.travelopedia.fun.recommendation_service.repository.ChatMessageRepository;
import com.travelopedia.fun.recommendation_service.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Override
    public List<ChatMessage> getChatMessagesByConversationId(String conversationId) {
        return chatMessageRepository.findByConversationId(conversationId);
    }

    @Override
    public ChatMessage addMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }

    @Override
    public void deleteChat(String conversationId) {
        chatMessageRepository.deleteByConversationId(conversationId);
    }
}
