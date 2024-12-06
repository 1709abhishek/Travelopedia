import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Trash2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Itinerary from "../components/Itinerary";
import { createConversation, deleteConversation, getConversations } from '../services/RecommendationServices.jsx';
import Header from "./Header.jsx";
import Footer from "../components/Footer.jsx";

function ExplorePage() {
  const [conversations, setConversations] = useState([]);
  const location = useLocation();
  const [activeConversation, setActiveConversation] = useState(null);
  const [userEmail, setUserEmail] = useState('user@example.com'); // Replace with actual user email
  const [flag, setFlag] = useState(false);

  const fetchConversations = useCallback(async () => {
    try {
      const jwt = localStorage.getItem('token');
      const fetchedConversations = await getConversations(jwt);
      console.log("fetchedConversations", fetchedConversations);
      setConversations(fetchedConversations);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations, flag]);

  useEffect(() => {
    // setActiveConversation(location?.state.flag? conversations[conversations.length - 1]: activeConversation);
    // console.log("active conversations", activeConversation, location.state.flag, conversations);
  }, [activeConversation]);

  useEffect(() => {
    console.log("conversations", conversations);
    console.log("activeConversation", activeConversation);
  }, [conversations, activeConversation]);

  const handleNewItinerary = async () => {
    try {
      const jwt = localStorage.getItem('token');
      const newConversation = await createConversation(jwt, 'New Itinerary');
      setConversations(prevConversations => [...prevConversations, newConversation]);
      setActiveConversation(newConversation);
    } catch (error) {
      console.error('Error creating new conversation:', error);
    }
  };

  const handleDeleteConversation = async (conversationId) => {
    try {
      await deleteConversation(conversationId);
      setConversations(prevConversations => 
        prevConversations.filter(conv => conv.conversationId !== conversationId)
      );
      if (activeConversation && activeConversation.conversationId === conversationId) {
        setActiveConversation(null);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const handleConversationClick = useCallback((conversation) => {
    console.log("Clicked conversation:", conversation.conversationName);
    setActiveConversation(conversation);
  }, []);

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
              <div key={conversation.conversationId} className="flex items-center justify-between p-2 hover:bg-gray-800">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left ${
                    activeConversation && activeConversation.conversationId === conversation.conversationId
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  } focus:outline-none focus:ring-0 focus-visible:ring-0`}
                  onClick={() => handleConversationClick(conversation)}
                >
                  {conversation.conversationName.substring(0, 20)}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteConversation(conversation.conversationId);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Main chat area */}
        {activeConversation ? (
          <Itinerary 
            key={activeConversation.conversationId}
            conversationId={activeConversation.conversationId} 
            email={userEmail} 
            setFlag={setFlag} 
            activeConversation={activeConversation}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select or create an itinerary to get started.</p>
          </div>
        )}
      </div>
      <hr className="divider bg-gray-900"></hr>
      {/* <!-- Footer --> */}
      {/* <Footer></Footer> */}
    </div>
  );
}

export default ExplorePage;

