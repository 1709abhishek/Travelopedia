package com.travelopedia.fun.recommendation_service.controller;


import com.travelopedia.fun.recommendation_service.clients.CustomerServiceProxy;
import com.travelopedia.fun.recommendation_service.model.Chat;
import com.travelopedia.fun.recommendation_service.model.ChatMessage;
import com.travelopedia.fun.recommendation_service.model.ChatMessageRequest;
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

    @Autowired
    private CustomerServiceProxy customerServiceProxy;

    @GetMapping("/{conversationId}")
    public ResponseEntity<List<ChatMessage>> getChatMessages(@RequestHeader("Authorization") String authorization, @PathVariable String conversationId) {
        String email = customerServiceProxy.getExampleEndpoint(authorization);
        if(email == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok(chatService.getChatMessagesByConversationId(conversationId));
    }

    @PostMapping("/{conversationId}")
    public ResponseEntity<ChatMessage> addMessage(@PathVariable String conversationId, @RequestBody ChatMessageRequest chatMessageRequest) {


        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setConversationId(conversationId);
        chatMessage.setContent(chatMessageRequest.getMessage());
        chatMessage.setRole(chatMessageRequest.getRole());
        return ResponseEntity.ok(chatService.addMessage(chatMessage));
    }

    @DeleteMapping("/{conversationId}")
    public ResponseEntity<Void> deleteChat(@RequestHeader("Authorization") String authorization, @PathVariable String conversationId) {
        String email = customerServiceProxy.getExampleEndpoint(authorization);
        if(email == null) {
            return ResponseEntity.status(401).build();
        }
        chatService.deleteChat(conversationId);
        return ResponseEntity.ok().build();
    }
}
