import React from 'react';
import './Header.css';
import RobotLogo from './RobotLogo';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <RobotLogo />
          <span className="logo-text">RobotsForHire</span>
        </div>
        <nav className="nav">
          <a href="#solutions" className="nav-link">Solutions</a>
          <a href="#credentials" className="nav-link">Credentials</a>
          <a href="#contact" className="nav-link">Contact</a>
          <button className="nav-button">Get Started</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
