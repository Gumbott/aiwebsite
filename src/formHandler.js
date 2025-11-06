import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './firebase';

// Security utility functions
export const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .slice(0, 2000); // Limit length
};

export const validateEmail = (email) => {
  const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

export const isSpam = (text) => {
  const spamPatterns = [
    /viagra/i,
    /casino/i,
    /\$\$\$/,
    /<script/i,
    /http:\/\/|https:\/\//g
  ];
  return spamPatterns.some(pattern => pattern.test(text));
};

// Rate limiting using localStorage
export const isRateLimited = () => {
  const now = Date.now();
  const lastSubmission = localStorage.getItem('lastFormSubmission');
  const submissionCount = parseInt(localStorage.getItem('submissionCount') || '0');
  
  if (lastSubmission) {
    const timeSinceLastSubmission = now - parseInt(lastSubmission);
    if (timeSinceLastSubmission < 1000) { // 1 second cooldown
      return true;
    }
    if (timeSinceLastSubmission < 86400000) { // 24 hours
      if (submissionCount > 50) { // Max 50 submissions per day
        return true;
      }
    } else {
      // Reset counter after 24 hours
      localStorage.setItem('submissionCount', '0');
    }
  }
  
  localStorage.setItem('lastFormSubmission', now.toString());
  localStorage.setItem('submissionCount', (submissionCount + 1).toString());
  return false;
};

// Initialize collections if they don't exist
const initializeCollections = async () => {
  try {
    // Check if leads collection exists by attempting to read
    const leadsSnapshot = await getDocs(collection(db, 'leads'));
    console.log('Leads collection ready:', !leadsSnapshot.empty ? 'Has data' : 'Empty');
    
    // Check if chat_history collection exists
    const chatSnapshot = await getDocs(collection(db, 'chat_history'));
    console.log('Chat history collection ready:', !chatSnapshot.empty ? 'Has data' : 'Empty');
    
  } catch (error) {
    console.error('Error checking collections:', error);
  }
};

// Run initialization
initializeCollections();

// Test function to verify Firestore connection
export const testFirestore = async () => {
  try {
    const testDoc = await addDoc(collection(db, 'leads'), {
      test: true,
      message: 'Test connection successful',
      timestamp: serverTimestamp()
    });
    console.log('Test document written with ID:', testDoc.id);
    return true;
  } catch (error) {
    console.error('Error writing test document:', error);
    return false;
  }
};

export const submitForm = async (formData) => {
  try {
    // Rate limiting check
    if (isRateLimited()) {
      console.warn('Rate limit exceeded');
      return { 
        success: false, 
        error: 'Too many submissions. Please try again later.' 
      };
    }

    // Input validation and sanitization
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: formData.email?.toLowerCase().trim(),
      company: sanitizeInput(formData.company),
      message: sanitizeInput(formData.message),
    };

    // Validation checks
    if (!sanitizedData.name || sanitizedData.name.length < 2) {
      return { success: false, error: 'Please enter a valid name' };
    }

    if (!validateEmail(sanitizedData.email)) {
      return { success: false, error: 'Please enter a valid email address' };
    }

    if (!sanitizedData.message || sanitizedData.message.length < 10) {
      return { success: false, error: 'Please enter a detailed message' };
    }

    // Spam check
    if (isSpam(sanitizedData.name) || isSpam(sanitizedData.message)) {
      console.warn('Spam detected');
      return { success: false, error: 'Your message was flagged as suspicious' };
    }

    // Add metadata
    const enhancedData = {
      ...sanitizedData,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      submittedFrom: window.location.href,
      clientTimestamp: new Date().toISOString()
    };

    const docRef = await addDoc(collection(db, 'leads'), enhancedData);
    console.log('Form submission successful with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting form:', error);
    return { success: false, error: 'An error occurred. Please try again.' };
  }
};