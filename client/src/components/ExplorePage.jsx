import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Groq } from 'groq-sdk'
import { HelpCircle, PlusCircle, Send, Settings, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Header from "./Header.jsx"
const groq = new Groq({ apiKey: "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", dangerouslyAllowBrowser: true });

function ExplorePage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome! I can help you generate an itinerary. Where would you like to go?' },
  ])
  const [input, setInput] = useState('')





  const handleSend = async() => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      // setInput('')

      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Great choice! I\'ll start working on your itinerary. What dates are you planning for your trip?' }])
      }, 1000)
      console.log("messages",messages)
      console.log(input)
    }
    console.log("messages",messages)
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "user",
          "content": input
        }
      ],
      "model": "llama3-8b-8192",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": true,
      "stop": null
    });
    console.log(chatCompletion)
    const fetchItinerary = async () => {
      // const stream = await getGroqChatStream();
      let responseFinal = "";
      for await (const chunk of chatCompletion) {
        // Print the completion returned by the LLM.
        responseFinal+=chunk.choices[0]?.delta?.content;
        // const response = await getGroqChatStream(chunk.choices[0]?.delta?.content);
        // console.log(response)
        // Update the messages state with the new message
        
      }

      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: responseFinal }
      ]);
    }
    fetchItinerary().catch(console.error);
  }

  const getGroqChatStream = async (msg) => {
    let response = "";
    for(const message of msg || ""){
      response += message;
    }
    return response;
  }

  

  return (
    <div className="flex flex-col h-screen bg-black text-gray-300">
      <Header />
      <div className="flex flex-1 overflow-hidden mt-14">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <Button variant="outline" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Itinerary
            </Button>
          </div>
          <ScrollArea className="flex-grow">
            {/* Itinerary history would go here */}
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
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-grow mr-2 bg-gray-800 text-gray-300 border-gray-700 focus:border-blue-500"
              />
              <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




export default ExplorePage;
