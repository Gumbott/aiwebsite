import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-category">ROBOTSFORHIRE</div>
          <h1 className="hero-title">Where AI Meets Real Work</h1>
          <p className="hero-description">
            We build autonomous AI agents to automate business workflows, so you can focus on what matters most.
          </p>
          <div className="hero-tagline">Smart. Secure. Set-and-Forget.</div>
          <div className="hero-buttons">
            <button className="hero-button secondary">Learn More</button>
            <button className="hero-button primary">Book a Free Call</button>
          </div>
          <div className="hero-features">
            <span className="feature-item">✓ AI Powered</span>
            <span className="feature-item">✓ Secure</span>
            <span className="feature-item">✓ Analytics</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
