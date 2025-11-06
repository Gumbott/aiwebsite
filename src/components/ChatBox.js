import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';
import RobotLogo from './RobotLogo';
import { askAI } from '../chatHandler';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm an AI assistant from RobotsForHire. I can help you understand how AI automation can transform your business. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      // Get AI response
      const response = await askAI(inputValue);
      const botResponse = {
        text: response.answer,
        sender: 'bot',
        timestamp: response.timestamp || new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse = {
        text: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  const quickQuestions = [
    "What can AI agents do for my business?",
    "How does pricing work?",
    "Tell me about security",
    "Book a consultation"
  ];

  const handleQuickQuestion = async (question) => {
    setInputValue(question);
    const userMessage = {
      text: question,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await askAI(question);
      const botResponse = {
        text: response.answer,
        sender: 'bot',
        timestamp: response.timestamp || new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse = {
        text: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  return (
    <>
      <div className={`chat-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <>
            <RobotLogo size={24} color="#ffffff" />
            <span className="chat-toggle-text">Chat with us</span>
          </>
        )}
      </div>

      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <div className="chat-header-content">
              <RobotLogo size={28} color="#00ff88" />
              <div className="chat-header-text">
                <h3 className="chat-header-title">RobotsForHire AI</h3>
                <p className="chat-header-subtitle">Ask me anything about AI automation</p>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.sender === 'user' ? 'user' : 'bot'}`}>
                {message.sender === 'bot' && (
                  <div className="chat-avatar">
                    <RobotLogo size={20} color="#00ff88" />
                  </div>
                )}
                <div className="chat-message-content">
                  <p className="chat-message-text">{message.text}</p>
                  <span className="chat-message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="chat-quick-questions">
              <p className="quick-questions-title">Quick questions:</p>
              <div className="quick-questions-grid">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="quick-question-btn"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form className="chat-input-form" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="chat-send-button" disabled={!inputValue.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBox;
