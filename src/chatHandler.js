import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { isRateLimited, sanitizeInput, isSpam } from './formHandler.js';

export const askAI = async (question) => {
  try {
    // Rate limiting check
    if (isRateLimited()) {
      return {
        answer: "Please wait a moment before sending another message.",
        timestamp: new Date()
      };
    }

    // Input validation and sanitization
    const sanitizedQuestion = sanitizeInput(question);
    
    if (!sanitizedQuestion || sanitizedQuestion.length < 2) {
      return {
        answer: "Please enter a valid question.",
        timestamp: new Date()
      };
    }

    // Spam check
    if (isSpam(sanitizedQuestion)) {
      console.warn('Spam detected in chat');
      return {
        answer: "I apologize, but I cannot process that type of message.",
        timestamp: new Date()
      };
    }

    // Store the question in Firestore with metadata
    await addDoc(collection(db, 'chat_history'), {
      question: sanitizedQuestion,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      clientTimestamp: new Date().toISOString(),
      sessionId: localStorage.getItem('sessionId') || Math.random().toString(36).substring(7)
    });

    // Return simulated response for now
    return {
      answer: "AI agent not connected yet. Response simulated.",
      timestamp: new Date()
    };
  } catch (error) {
    console.error('Error in AI request:', error);
    return {
      answer: "Sorry, I'm having trouble processing your request. Please try again.",
      timestamp: new Date()
    };
  }
};