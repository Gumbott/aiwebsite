import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      title: 'Based in New Lynn, Auckland',
      description: 'Local AI expertise, globally competitive solutions'
    },
    {
      title: 'Free on-site robot demos available',
      description: 'See our AI agents in action before you commit'
    },
    {
      title: '100% NZ Privacy Law compliant',
      description: 'Your data stays secure and meets all local regulations'
    },
    {
      title: 'Microsoft enterprise security',
      description: 'Built on Microsoft Copilot with enterprise-grade security'
    },
    {
      title: 'Set & forget automation',
      description: 'Once configured, your AI agents work autonomously'
    }
  ];

  return (
    <section id="solutions" className="features">
      <div className="features-container">
        <h2 className="features-title">Why Choose RobotsForHire?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">✓</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
