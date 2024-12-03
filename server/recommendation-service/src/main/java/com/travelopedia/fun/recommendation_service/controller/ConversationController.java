package com.travelopedia.fun.recommendation_service.controller;


import com.travelopedia.fun.recommendation_service.clients.CustomerServiceProxy;
import com.travelopedia.fun.recommendation_service.model.Conversation;
import com.travelopedia.fun.recommendation_service.service.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private CustomerServiceProxy customerServiceProxy;

    @PostMapping
    public ResponseEntity<Conversation> createConversation(@RequestHeader("Authorization") String authorization, @RequestParam String conversationName) {
        // response is an object that contains the email of the user and message
        String email = customerServiceProxy.getExampleEndpoint(authorization);
        System.out.println(email);
        return ResponseEntity.ok(conversationService.createConversation(email, conversationName));
    }

    @GetMapping("/{conversationId}")
    public ResponseEntity<Conversation> getConversation(@PathVariable String conversationId) {
        return ResponseEntity.ok(conversationService.getConversation(conversationId));
    }

    @GetMapping
    public ResponseEntity<List<Conversation>> getConversationsByEmail(@RequestHeader("Authorization") String authorization) {
        System.out.println("auth" + authorization);
        String email = customerServiceProxy.getExampleEndpoint(authorization);
        System.out.println(email);
        return ResponseEntity.ok(conversationService.getConversationsByEmail(email));
    }

    @PutMapping("/{conversationId}")
    public ResponseEntity<Conversation> updateConversation(@PathVariable String conversationId, @RequestParam String conversationName) {
        System.out.println("Conversation Name: " + conversationName);
        return ResponseEntity.ok(conversationService.updateConversation(conversationId, conversationName));
    }

    @DeleteMapping("/{conversationId}")
    public ResponseEntity<Void> deleteConversation(@PathVariable String conversationId) {
        conversationService.deleteConversation(conversationId);
        return ResponseEntity.ok().build();
    }
}
