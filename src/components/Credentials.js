import React from 'react';
import './Credentials.css';

const Credentials = () => {
  const credentials = [
    {
      title: 'NZ Diploma in Cyber Security',
      description: 'Certified in cybersecurity best practices, ensuring your AI solutions meet the highest security standards and comply with New Zealand privacy regulations.',
      icon: '🔒'
    },
    {
      title: 'Microsoft Certified Copilot Agent Builder',
      description: 'Expert in building and deploying Microsoft Copilot agents with enterprise-grade security, seamless integration, and intelligent automation.',
      icon: '🤖'
    },
    {
      title: 'Data Privacy & Compliance',
      description: '100% compliant with NZ Privacy Act 2020. Your business data is protected with end-to-end encryption and secure cloud infrastructure.',
      icon: '🛡️'
    }
  ];

  return (
    <section id="credentials" className="credentials">
      <div className="credentials-container">
        <h2 className="credentials-title">Our Expertise</h2>
        <p className="credentials-subtitle">
          Built on certified expertise and industry best practices
        </p>
        <div className="credentials-grid">
          {credentials.map((credential, index) => (
            <div key={index} className="credential-card">
              <div className="credential-icon">{credential.icon}</div>
              <h3 className="credential-title">{credential.title}</h3>
              <p className="credential-description">{credential.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Credentials;
