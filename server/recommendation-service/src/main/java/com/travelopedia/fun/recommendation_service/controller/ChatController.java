package com.travelopedia.fun.recommendation_service.controller;


import com.travelopedia.fun.recommendation_service.model.Chat;
import com.travelopedia.fun.recommendation_service.model.ChatMessage;
import com.travelopedia.fun.recommendation_service.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping("/{conversationId}")
    public ResponseEntity<List<ChatMessage>> getChatMessages(@PathVariable String conversationId) {
        return ResponseEntity.ok(chatService.getChatMessagesByConversationId(conversationId));
    }

    @PostMapping("/{conversationId}/messages")
    public ResponseEntity<ChatMessage> addMessage(@PathVariable String conversationId, @RequestBody ChatMessage message) {
        message.setConversationId(conversationId);
        return ResponseEntity.ok(chatService.addMessage(message));
    }

    @DeleteMapping("/{conversationId}")
    public ResponseEntity<Void> deleteChat(@PathVariable String conversationId) {
        chatService.deleteChat(conversationId);
        return ResponseEntity.ok().build();
    }
}
