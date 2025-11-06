import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2 className="contact-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Ready to transform your business with AI automation? Let's talk.
        </p>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3 className="contact-item-title">Location</h3>
              <p className="contact-item-text">New Lynn, Auckland<br />New Zealand</p>
            </div>
            <div className="contact-item">
              <h3 className="contact-item-title">Services</h3>
              <p className="contact-item-text">
                AI Agent Development<br />
                Business Process Automation<br />
                Microsoft Copilot Integration<br />
                Security Compliance Consulting
              </p>
            </div>
          </div>
          <div className="contact-form-container">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="Your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="your.email@company.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="company" className="form-label">Company</label>
                <input
                  type="text"
                  id="company"
                  className="form-input"
                  placeholder="Your company name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">Tell us about your business needs</label>
                <textarea
                  id="message"
                  className="form-textarea"
                  placeholder="What tasks would you like your AI robots to handle?"
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="form-submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
