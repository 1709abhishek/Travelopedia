package com.travelopedia.fun.recommendation_service.controller;

import com.travelopedia.fun.recommendation_service.clients.CustomerServiceProxy;
import com.travelopedia.fun.recommendation_service.model.ChatMessage;
import com.travelopedia.fun.recommendation_service.model.ChatMessageRequest;
import com.travelopedia.fun.recommendation_service.service.ChatService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ChatControllerTest {

    @Mock
    private ChatService chatService;

    @Mock
    private CustomerServiceProxy customerServiceProxy;

    @InjectMocks
    private ChatController chatController;

    private static final String AUTHORIZATION = "Bearer token";
    private static final String CONVERSATION_ID = "conv123";
    private static final String EMAIL = "test@example.com";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getChatMessages_Success() {
        // Arrange
        List<ChatMessage> messages = Arrays.asList(new ChatMessage());
        when(customerServiceProxy.getExampleEndpoint(AUTHORIZATION)).thenReturn(EMAIL);
        when(chatService.getChatMessagesByConversationId(CONVERSATION_ID)).thenReturn(messages);

        // Act
        ResponseEntity<List<ChatMessage>> response = chatController.getChatMessages(AUTHORIZATION, CONVERSATION_ID);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        assertEquals(messages, response.getBody());
        verify(chatService).getChatMessagesByConversationId(CONVERSATION_ID);
    }

    @Test
    void getChatMessages_Unauthorized() {
        // Arrange
        when(customerServiceProxy.getExampleEndpoint(AUTHORIZATION)).thenReturn(null);

        // Act
        ResponseEntity<List<ChatMessage>> response = chatController.getChatMessages(AUTHORIZATION, CONVERSATION_ID);

        // Assert
        assertEquals(401, response.getStatusCode().value());
        verify(chatService, never()).getChatMessagesByConversationId(any());
    }

    @Test
    void addMessage_Success() {
        // Arrange
        ChatMessageRequest request = new ChatMessageRequest();
        request.setMessage("Test message");
        request.setRole("user");

        ChatMessage savedMessage = new ChatMessage();
        savedMessage.setContent(request.getMessage());
        savedMessage.setRole(request.getRole());
        savedMessage.setConversationId(CONVERSATION_ID);

        when(chatService.addMessage(any(ChatMessage.class))).thenReturn(savedMessage);

        // Act
        ResponseEntity<ChatMessage> response = chatController.addMessage(CONVERSATION_ID, request);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(request.getMessage(), response.getBody().getContent());
        assertEquals(request.getRole(), response.getBody().getRole());
        assertEquals(CONVERSATION_ID, response.getBody().getConversationId());
    }

    @Test
    void deleteChat_Success() {
        // Arrange
        when(customerServiceProxy.getExampleEndpoint(AUTHORIZATION)).thenReturn(EMAIL);

        // Act
        ResponseEntity<Void> response = chatController.deleteChat(AUTHORIZATION, CONVERSATION_ID);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        verify(chatService).deleteChat(CONVERSATION_ID);
    }

    @Test
    void deleteChat_Unauthorized() {
        // Arrange
        when(customerServiceProxy.getExampleEndpoint(AUTHORIZATION)).thenReturn(null);

        // Act
        ResponseEntity<Void> response = chatController.deleteChat(AUTHORIZATION, CONVERSATION_ID);

        // Assert
        assertEquals(401, response.getStatusCode().value());
        verify(chatService, never()).deleteChat(any());
    }
}