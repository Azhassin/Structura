import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, MessageSquare, ExternalLink, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Initial welcome message
const WELCOME_MESSAGE = {
  id: 1,
  role: 'assistant',
  content: 'Hello! Welcome to Structura Studio. How can I help you today? 👋',
  navigate: null
};

const ChatBot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  // Load chat history and session from localStorage on mount
  useEffect(() => {
    // Load session ID
    const storedSessionId = localStorage.getItem('chat_session_id');
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      localStorage.setItem('chat_session_id', newSessionId);
    }

    // Load chat messages
    const storedMessages = localStorage.getItem('chat_messages');
    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch (e) {
        console.error('Failed to parse stored messages:', e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle navigation - minimize chatbot and navigate
  const handleNavigate = (path) => {
    if (path) {
      // Minimize chatbot first (keep chat intact)
      setIsOpen(false);
      
      // Small delay before navigating to allow smooth minimize
      setTimeout(() => {
        // Check if it's a hash link for same-page scrolling
        if (path.startsWith('/#')) {
          const elementId = path.substring(2);
          navigate('/');
          setTimeout(() => {
            const element = document.getElementById(elementId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        } else {
          navigate(path);
        }
      }, 300);
    }
  };

  // Reset chat - clear messages and start fresh
  const handleResetChat = () => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    localStorage.setItem('chat_session_id', newSessionId);
    setMessages([WELCOME_MESSAGE]);
    localStorage.setItem('chat_messages', JSON.stringify([WELCOME_MESSAGE]));
    setInputValue('');
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      navigate: null
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        session_id: sessionId,
        message: inputValue
      });

      const botMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.response,
        navigate: response.data.navigate || null
      };

      if (response.data.session_id !== sessionId) {
        setSessionId(response.data.session_id);
        localStorage.setItem('chat_session_id', response.data.session_id);
      }

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        navigate: null
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 shadow-2xl shadow-teal-500/40 transition-all duration-300 hover:scale-110"
          data-testid="chatbot-toggle-btn"
        >
          <MessageSquare className="w-7 h-7 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-teal-100" data-testid="chatbot-window">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Animated Robot GIF */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white/20 backdrop-blur-sm">
                <img 
                  src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f916/512.gif" 
                  alt="Robot" 
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">AI Assistant</h3>
                <p className="text-xs text-cyan-100">Online • Ready to help</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full"
              data-testid="chatbot-close-btn"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-teal-50/30 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-teal-100 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {/* Navigation button for assistant messages with navigation */}
                  {message.role === 'assistant' && message.navigate && (
                    <Button
                      onClick={() => handleNavigate(message.navigate)}
                      size="sm"
                      className="mt-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white text-xs rounded-full px-3 py-1 h-auto"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Go there now
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-teal-100 p-3 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-teal-100">
            <div className="flex gap-2">
              {/* Reset Chat Button */}
              <Button
                onClick={handleResetChat}
                variant="outline"
                className="rounded-full w-10 h-10 p-0 border-teal-200 hover:bg-teal-50 hover:border-teal-400"
                title="Reset Chat"
                data-testid="chatbot-reset-btn"
              >
                <RotateCcw className="w-4 h-4 text-teal-600" />
              </Button>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border-teal-200 focus:border-teal-500 focus:ring-teal-500 rounded-full px-4"
                data-testid="chatbot-input"
              />
              <Button
                onClick={handleSend}
                className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-full w-10 h-10 p-0 shadow-lg"
                disabled={!inputValue.trim() || isTyping}
                data-testid="chatbot-send-btn"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
