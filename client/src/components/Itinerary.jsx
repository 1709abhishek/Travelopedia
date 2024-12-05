import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Groq } from 'groq-sdk';
import { Send, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { addChatMessage, editConversation, getChatMessages } from '../services/RecommendationServices.jsx';
import StructuredItinerary from './StructuredItinerary';

const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true });

const Itinerary = ({ conversationId, email, setFlag, activeConversation }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, [activeConversation]);

  const isItineraryFormat = (content) => {
    // Check for the specific itinerary format with **Day
    return content.includes('**Day') && content.split('**Day').length > 1;
  };

  const fetchMessages = async () => {
    try {
      const jwt = localStorage.getItem('token');
      const fetchedMessages = await getChatMessages(jwt, conversationId);
      console.log("fetchedMessages", fetchedMessages);
      setMessages(fetchedMessages);

      const lastMessage = fetchedMessages[fetchedMessages.length - 1];
      if (lastMessage && lastMessage.role === 'assistant' && isItineraryFormat(lastMessage.content)) {
        setItinerary(lastMessage.content);
      } else {
        setItinerary(null);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      setLoading(true);
      try {
        const userMessage = { role: 'user', content: input };
        const jwt = localStorage.getItem('token');
        if(messages.length === 0) {
          setFlag(true);
          editConversation(conversationId, userMessage.content);
        }
        await addChatMessage(jwt, conversationId, userMessage);
        setMessages([...messages, userMessage]);
        setInput('');

        const chatCompletion = await groq.chat.completions.create({
          messages: [
            ...messages.map(msg => ({ role: msg.role === 'user' ? 'user' : 'assistant', content: msg.content })),
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
        await addChatMessage(jwt, conversationId, assistantMessage);
        setMessages(prevMessages => [...prevMessages, assistantMessage]);

        if (isItineraryFormat(aiResponse)) {
          setItinerary(aiResponse);
        } else {
          setItinerary(null);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderMessage = (message) => {
    if (message.role === 'user') {
      return message.content;
    }

    if (message.role === 'assistant') {
      if (isItineraryFormat(message.content)) {
        return (
          <div className="flex-grow overflow-auto bg-gray-900 border-t border-gray-700">
            <StructuredItinerary itinerary={message.content} />
          </div>
        );
      }
      return message.content;
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
              {renderMessage(message)}
            </div>
          </div>
        ))}
      </ScrollArea>
      
      <div className="border-t border-gray-800 p-4 bg-gray-900">
        <div className="flex items-center">
          <Input
            placeholder="Plan your itinerary with Travelopedia chatbot..."
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

