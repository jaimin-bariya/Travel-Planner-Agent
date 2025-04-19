import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  MessageSquare,
  User,
  Bot,
  Send,
  Star,
  Download,
  Printer,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';



const FollowUpQuestions = ({ preferences, destinations, itinerary }) => {
    const [messages, setMessages] = useState([
      {
        id: '1',
        content: `Your travel itinerary is ready! It includes ${destinations.length} destinations over ${itinerary.totalDays} days. Is there anything you'd like to change or any questions you have about your plan?`,
        sender: 'assistant',
        timestamp: new Date()
      }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [rating, setRating] = useState(null);
    const [showRating, setShowRating] = useState(false);
    const messagesEndRef = useRef(null);
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleSendMessage = () => {
      if (!newMessage.trim()) return;
  
      // Add user message
      const userMessage= {
        id: Date.now().toString(),
        content: newMessage,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setNewMessage('');
  
      // Simulate assistant response
      setTimeout(() => {
        let responseContent = '';
        
        // Simple keyword matching for demonstration
        const lowercaseMessage = newMessage.toLowerCase();
        
        if (lowercaseMessage.includes('hotel') || lowercaseMessage.includes('accommodation')) {
          responseContent = "I can definitely help with accommodation changes. You can choose from luxury hotels, budget-friendly options, or local homestays. Would you like me to suggest specific hotels for any of your destinations?";
        } else if (lowercaseMessage.includes('food') || lowercaseMessage.includes('restaurant') || lowercaseMessage.includes('meal')) {
          responseContent = "Regarding food options, I can adjust your meal plan to include more local cuisine or specific dietary preferences. Would you like recommendations for restaurants with vegetarian, halal, or other specific options?";
        } else if (lowercaseMessage.includes('budget') || lowercaseMessage.includes('cost') || lowercaseMessage.includes('expensive')) {
          responseContent = "I understand budget considerations are important. The current total cost is around $" + itinerary.totalCost + ". I can suggest ways to reduce costs like choosing different accommodations or adjusting activities. What's your target budget?";
        } else if (lowercaseMessage.includes('time') || lowercaseMessage.includes('days') || lowercaseMessage.includes('duration')) {
          responseContent = "I can adjust the duration of your trip. Currently, it's planned for " + itinerary.totalDays + " days. Would you like to make it shorter or longer? I can reorganize the itinerary accordingly.";
        } else if (lowercaseMessage.includes('transport') || lowercaseMessage.includes('travel') || lowercaseMessage.includes('flight')) {
          responseContent = "For transportation, I can adjust your travel options between destinations. Would you prefer more flights for efficiency or more train/bus travel to enjoy the scenery and reduce costs?";
        } else if (lowercaseMessage.includes('activity') || lowercaseMessage.includes('attraction') || lowercaseMessage.includes('visit')) {
          responseContent = "I can modify the activities in your itinerary. Would you like more cultural experiences, outdoor adventures, or relaxation time? Let me know your preferences and I'll adjust accordingly.";
        } else if (lowercaseMessage.includes('done') || lowercaseMessage.includes('finish') || lowercaseMessage.includes('complete')) {
          responseContent = "Great! I'm glad you're happy with the itinerary. Would you mind rating your experience with our planning service? Your feedback helps us improve.";
          setShowRating(true);
        } else {
          responseContent = "Thank you for your message. I'll help adjust your itinerary based on your feedback. Could you provide more specific details about what you'd like to change or any questions you have about the plan?";
        }
  
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          content: responseContent,
          sender: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prevMessages => [...prevMessages, assistantMessage]);
      }, 1000);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };
  
    const handleRating = (value) => {
      setRating(value);
      toast({
        title: "Thank you for your feedback!",
        description: `You rated your experience ${value} out of 5 stars.`,
      });
    };
  
    const handlePrint = () => {
      window.print();
      toast({
        title: "Print initiated",
        description: "Your itinerary has been sent to the printer.",
      });
    };
  
    const handleDownload = () => {
      toast({
        title: "Download started",
        description: "Your itinerary is being downloaded as a PDF.",
      });
    };
  
    const handleShare = () => {
      toast({
        title: "Share options",
        description: "Share options dialog opened.",
      });
    };
  
    return (
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-travel-600" /> 
                Follow-up Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`flex gap-3 max-w-[80%] ${
                        message.sender === 'user' 
                          ? 'flex-row-reverse' 
                          : 'flex-row'
                      }`}
                    >
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'user' 
                            ? 'bg-travel-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div 
                        className={`p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-travel-600 text-white' 
                            : 'bg-white border text-gray-800'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p 
                          className={`text-xs mt-1 ${
                            message.sender === 'user' 
                              ? 'text-travel-100' 
                              : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
  
              <div className="flex gap-2">
                <Textarea
                  placeholder="Ask any questions or request changes to your itinerary..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="resize-none"
                />
                <Button 
                  onClick={handleSendMessage} 
                  className="bg-travel-600 hover:bg-travel-700"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
  
              {showRating && (
                <div className="mt-6 p-4 bg-travel-50 rounded-lg">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Star className="h-5 w-5 text-travel-600" /> Rate your experience
                  </h3>
                  <RadioGroup 
                    className="flex space-x-2"
                    onValueChange={(value) => handleRating(parseInt(value))}
                    defaultValue={rating?.toString()}
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id={`r${value}`} value={value.toString()} />
                        </div>
                        <label 
                          htmlFor={`r${value}`} 
                          className="text-sm mt-1 cursor-pointer"
                        >
                          {value}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handlePrint}
              >
                <Printer className="mr-2 h-4 w-4" /> Print Itinerary
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleDownload}
              >
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" /> Share Itinerary
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  
  export default FollowUpQuestions;
  