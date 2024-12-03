import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Groq } from 'groq-sdk';
import { Send, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { addChatMessage, editConversation, getChatMessages } from '../services/RecommendationServices.jsx';

const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true });

const Itinerary = ({ conversationId, email, setFlag }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getChatMessages(conversationId);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      setLoading(true);
      try {
        const userMessage = { role: 'user', content: input };
        console.log('Messages:', messages);
        if(messages.length==0) {
          setFlag(true);
          console.log('Editing conversation');
          editConversation(conversationId, userMessage.content);
        }
        await addChatMessage(conversationId, userMessage);
        setMessages([...messages, userMessage]);
        setInput('');

        const chatCompletion = await groq.chat.completions.create({
          messages: [
            ...messages.map(msg => ({ role: msg.role, content: msg.content })),
            { role: 'user', content: input }
          ],
          model: "llama3-8b-8192",
          temperature: 1,
          max_tokens: 1024,
          top_p: 1,
          stream: true,
          stop: null
        });

        let aiResponse = "";
        for await (const chunk of chatCompletion) {
          aiResponse += chunk.choices[0]?.delta?.content || "";
        }

        const assistantMessage = { role: 'assistant', content: aiResponse };
        await addChatMessage(conversationId, assistantMessage);
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300'
              }`}
            >
              {message.role === 'assistant' && (
                <Sparkles className="inline-block mr-2 h-4 w-4" />
              )}
              {message.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="border-t border-gray-800 p-4 bg-gray-900">
        <div className="flex items-center">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
            className="flex-grow mr-2 bg-gray-800 text-gray-300 border-gray-700 focus:border-blue-500"
            disabled={loading}
          />
          <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;