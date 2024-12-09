package com.travelopedia.fun.recommendation_service.controller;

import com.travelopedia.fun.recommendation_service.clients.CustomerServiceProxy;
import com.travelopedia.fun.recommendation_service.model.Conversation;
import com.travelopedia.fun.recommendation_service.service.ConversationService;
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

class ConversationControllerTest {

    @Mock
    private ConversationService conversationService;

    @Mock
    private CustomerServiceProxy customerServiceProxy;

    @InjectMocks
    private ConversationController conversationController;

    private static final String AUTHORIZATION = "Bearer token";
    private static final String CONVERSATION_ID = "conv123";
    private static final String EMAIL = "test@example.com";
    private static final String CONVERSATION_NAME = "Test Conversation";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createConversation_Success() {
        // Arrange
        Conversation conversation = new Conversation();
        conversation.setEmail(EMAIL);
        conversation.setConversationName(CONVERSATION_NAME);
        
        when(customerServiceProxy.getExampleEndpoint(AUTHORIZATION)).thenReturn(EMAIL);
        when(conversationService.createConversation(EMAIL, CONVERSATION_NAME)).thenReturn(conversation);

        // Act
        ResponseEntity<Conversation> response = conversationController.createConversation(AUTHORIZATION, CONVERSATION_NAME);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        assertEquals(conversation, response.getBody());
        verify(conversationService).createConversation(EMAIL, CONVERSATION_NAME);
    }

    @Test
    void getConversation_Success() {
        // Arrange
        Conversation conversation = new Conversation();
        conversation.setConversationId(CONVERSATION_ID);
        when(conversationService.getConversation(CONVERSATION_ID)).thenReturn(conversation);

        // Act
        ResponseEntity<Conversation> response = conversationController.getConversation(CONVERSATION_ID);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        assertEquals(conversation, response.getBody());
    }

    @Test
    void getConversationsByEmail_Success() {
        // Arrange
        List<Conversation> conversations = Arrays.asList(new Conversation(), new Conversation());
        when(customerServiceProxy.getExampleEndpoint(AUTHORIZATION)).thenReturn(EMAIL);
        when(conversationService.getConversationsByEmail(EMAIL)).thenReturn(conversations);

        // Act
        ResponseEntity<List<Conversation>> response = conversationController.getConversationsByEmail(AUTHORIZATION);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        assertEquals(conversations, response.getBody());
    }

    @Test
    void updateConversation_Success() {
        // Arrange
        Conversation updatedConversation = new Conversation();
        updatedConversation.setConversationId(CONVERSATION_ID);
        updatedConversation.setConversationName(CONVERSATION_NAME);
        
        when(conversationService.updateConversation(CONVERSATION_ID, CONVERSATION_NAME))
            .thenReturn(updatedConversation);

        // Act
        ResponseEntity<Conversation> response = conversationController
            .updateConversation(CONVERSATION_ID, CONVERSATION_NAME);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        assertEquals(updatedConversation, response.getBody());
    }

    @Test
    void deleteConversation_Success() {
        // Act
        ResponseEntity<Void> response = conversationController.deleteConversation(CONVERSATION_ID);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        verify(conversationService).deleteConversation(CONVERSATION_ID);
    }

    @Test
    void createConversation_WithInvalidAuth() {
        // Arrange
        when(customerServiceProxy.getExampleEndpoint(AUTHORIZATION)).thenReturn(null);

        // Act
        ResponseEntity<Conversation> response = conversationController
            .createConversation(AUTHORIZATION, CONVERSATION_NAME);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        verify(conversationService).createConversation(null, CONVERSATION_NAME);
    }

    @Test
    void getConversationsByEmail_WithInvalidAuth() {
        // Arrange
        when(customerServiceProxy.getExampleEndpoint(AUTHORIZATION)).thenReturn(null);

        // Act
        ResponseEntity<List<Conversation>> response = conversationController
            .getConversationsByEmail(AUTHORIZATION);

        // Assert
        assertEquals(200, response.getStatusCode().value());
        verify(conversationService).getConversationsByEmail(null);
    }
}