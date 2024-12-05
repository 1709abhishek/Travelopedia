import axios from 'axios';

const API_BASE_URL = 'http://localhost:8200/api'; // Replace with your actual API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createConversation = async (jwt, conversationName) => {
  const response = await api.post('http://localhost:8200/api/conversations', null, {
    params: { conversationName },
    headers: { 'Authorization': `Bearer ${jwt}`},
  });
  return response.data;
};

export const getConversations = async (jwt) => {
  try {
  const response = await axios.get('http://localhost:8200/api/conversations', {
    'Content-Type': 'application/json',
    headers: { 'Authorization': `Bearer ${jwt}`},
    withCredentials: true
  });
  return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const getChatMessages = async (jwt, conversationId) => {
  const response = await axios.get(`http://localhost:8200/api/chats/${conversationId}`, {
    'Content-Type': 'application/json',
    headers: { 'Authorization': `Bearer ${jwt}`},
    withCredentials: true
  });
  return response.data;
};

export const addChatMessage = async (jwt,conversationId, message) => {
  // console.log("addChatMessage", message);
  const response = await axios.post(`http://localhost:8200/api/chats/${conversationId}`, {
      role: message.role,
      message: message.content
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    });
  return response.data;
};

export const deleteConversation = async (conversationId) => {
  await api.delete(`/conversations/${conversationId}`);
};

export const editConversation = async (conversationId, conversationName) => {
  await api.put(`/conversations/${conversationId}?conversationName=${conversationName}`);
}