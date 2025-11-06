import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import ChatBox from './components/ChatBox';
import LoadingOverlay from './components/LoadingOverlay';
import { testFirestore } from './formHandler';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [overlayFadeOut, setOverlayFadeOut] = useState(false);

  useEffect(() => {
    const minimumDisplayMs = 2500; // ensure the overlay is visible long enough
    const mountedAt = Date.now();

    // Test Firestore connection
    testFirestore().then(success => {
      console.log('Firestore connection test:', success ? 'Successful' : 'Failed');
    });

    const finishAfterMinimum = () => {
      const elapsed = Date.now() - mountedAt;
      const remaining = Math.max(0, minimumDisplayMs - elapsed);
      setTimeout(() => {
        setIsLoading(false);
        // trigger overlay fade-out, then unmount
        setOverlayFadeOut(true);
        setTimeout(() => setOverlayVisible(false), 450);
      }, remaining);
    };

    const onWindowLoad = () => finishAfterMinimum();
    // Fallback in case 'load' never fires
    const timeoutId = setTimeout(() => finishAfterMinimum(), minimumDisplayMs + 1000);
    window.addEventListener('load', onWindowLoad);
    return () => {
      window.removeEventListener('load', onWindowLoad);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="App">
      {overlayVisible && <LoadingOverlay fadeOut={overlayFadeOut} />}
      <Header />
      <main className={`content-shell ${!overlayVisible ? 'content-visible' : ''}`}>
        <Hero />
        <Features />
        <Credentials />
        <Contact />
      </main>
      <ChatBox />
    </div>
  );
}

export default App;


