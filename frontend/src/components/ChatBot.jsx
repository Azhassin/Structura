import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, MessageSquare, ExternalLink, RotateCcw, Bot } from 'lucide-react';
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

// Helper to get stored messages
const getStoredMessages = () => {
  try {
    const stored = localStorage.getItem('chat_messages');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse stored messages:', e);
  }
  return [WELCOME_MESSAGE];
};

// Helper to get stored session ID
const getStoredSessionId = () => {
  const stored = localStorage.getItem('chat_session_id');
  if (stored) {
    return stored;
  }
  const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('chat_session_id', newSessionId);
  return newSessionId;
};

const ChatBot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // Initialize from localStorage immediately
  const [messages, setMessages] = useState(() => getStoredMessages());
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(() => getStoredSessionId());
  const messagesEndRef = useRef(null);

  // Save messages to localStorage whenever they change (but not on initial mount with default)
  const saveMessages = useCallback((msgs) => {
    localStorage.setItem('chat_messages', JSON.stringify(msgs));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle navigation - minimize chatbot and navigate
  const handleNavigate = (path) => {
    if (path) {
      // Save current messages before navigating
      saveMessages(messages);
      
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
    const newMessages = [WELCOME_MESSAGE];
    setMessages(newMessages);
    localStorage.setItem('chat_messages', JSON.stringify(newMessages));
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
    saveMessages(newMessages);
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

      setMessages(prev => {
        const updated = [...prev, botMessage];
        saveMessages(updated);
        return updated;
      });
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        navigate: null
      };
      setMessages(prev => {
        const updated = [...prev, errorMessage];
        saveMessages(updated);
        return updated;
      });
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
      {/* Chat Button - Always fixed at bottom right */}
      {!isOpen && (
        <div 
          className="chatbot-button-wrapper"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999
          }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
            style={{ boxShadow: '0 10px 40px rgba(20, 184, 166, 0.4)' }}
            data-testid="chatbot-toggle-btn"
          >
            <MessageSquare className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <>
          {/* Mobile overlay backdrop */}
          <div 
            className="md:hidden"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 99998
            }}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Chat window container */}
          <div 
            className="chatbot-window bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-teal-100"
            style={{
              position: 'fixed',
              zIndex: 99999,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'calc(100% - 32px)',
              height: 'calc(100% - 32px)',
              maxWidth: '400px',
              maxHeight: '600px'
            }}
            data-testid="chatbot-window"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 md:p-5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white/20 backdrop-blur-sm">
                  <Bot className="w-6 h-6 text-white" />
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
            <div className="p-4 bg-white border-t border-teal-100 flex-shrink-0">
              <div className="flex gap-2">
                {/* Reset Chat Button */}
                <Button
                  onClick={handleResetChat}
                  variant="outline"
                  className="rounded-full w-10 h-10 p-0 border-teal-200 hover:bg-teal-50 hover:border-teal-400 flex-shrink-0"
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
                  className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white rounded-full w-10 h-10 p-0 shadow-lg flex-shrink-0"
                  disabled={!inputValue.trim() || isTyping}
                  data-testid="chatbot-send-btn"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatBot;
