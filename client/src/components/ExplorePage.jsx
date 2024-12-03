import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HelpCircle, PlusCircle, Settings } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Itinerary from "../components/Itinerary";
import { createConversation, deleteConversation, getConversations } from '../services/RecommendationServices.jsx';
import Header from "./Header.jsx";

function ExplorePage() {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [userEmail, setUserEmail] = useState('user@example.com'); // Replace with actual user email
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, [flag]);

  const fetchConversations = async () => {
    try {
      const jwt = localStorage.getItem('token');
      const fetchedConversations = await getConversations(jwt);
      setConversations(fetchedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  const handleNewItinerary = async () => {
    try {
      const jwt = localStorage.getItem('token');
      const newConversation = await createConversation(jwt, 'New Itinerary');
      setConversations([...conversations, newConversation]);
      setActiveConversation(newConversation);
    } catch (error) {
      console.error('Error creating new conversation:', error);
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      await deleteConversation(conversationId);
      setConversations(conversations.filter(conv => conv.conversationId !== conversationId));
      if (activeConversation && activeConversation.conversationId === conversationId) {
        setActiveConversation(null);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-gray-300">
      <Header />
      <div className="flex flex-1 overflow-hidden mt-14">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <Button variant="outline" className="w-full justify-start text-black hover:text-white hover:bg-blue-600" onClick={handleNewItinerary}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Itinerary
            </Button>
          </div>
          <ScrollArea className="flex-grow">
            {conversations.map((conversation) => (
              <Button
                key={conversation.conversationId}
                variant="ghost"
                className="w-full justify-start text-left text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => setActiveConversation(conversation)}
              >
                {conversation.conversationName}
              </Button>
            ))}
          </ScrollArea>
          <div className="p-4 border-t border-gray-800">
            <Button variant="ghost" className="w-full justify-start mb-2 text-gray-300 hover:text-white hover:bg-gray-800">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help
            </Button>
          </div>
        </div>

        {/* Main chat area */}
        {activeConversation ? (
          <Itinerary conversationId={activeConversation.conversationId} email={userEmail} setFlag={setFlag}/>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select or create an itinerary to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;