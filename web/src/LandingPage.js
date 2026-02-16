import React from 'react';
import { Link } from 'react-router-dom';
import './css/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">MyApp</div>
        <nav>
            {/* Top right navigation */}
            <Link to="/login" className="btn btn-primary">Log In</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
        </nav>
      </header>

      <main className="hero-section">
        <h1>Welcome to the Future</h1>
        <p className="hero-subtitle">
          A simple, secure, and fast way to manage your data. 
          Join us today and experience the difference.
        </p>
        
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-large btn-primary">
            Create an Account
          </Link>
          <Link to="/login" className="btn btn-large btn-secondary">
            I already have an account
          </Link>
        </div>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2026 My App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;