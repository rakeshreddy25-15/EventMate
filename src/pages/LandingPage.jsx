import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              EventMate - AI Based Event Planning & Scheduling System
            </h1>
            <p className="hero-subtitle">
              Simplify event planning and management with our comprehensive platform.
              Book events, manage registrations, and organize seamlessly.
            </p>
            <p className="hero-description">
              Whether you're an organizer looking to host events or a user eager to discover
              and book events, our platform makes it easy and efficient.
            </p>

            <div className="hero-buttons">
              <Link to="/login" className="btn btn-primary btn-large">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary btn-large">
                Register
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <div className="icon-large">📅</div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Why Choose?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Easy Event Discovery</h3>
              <p>Find and book events that match your interests with advanced filtering.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎪</div>
              <h3>Event Organization</h3>
              <p>Organize and manage your events efficiently with our powerful tools.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Analytics & Insights</h3>
              <p>Track registrations and get insights into your event performance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Reliable</h3>
              <p>Your data is safe with our enterprise-grade security measures.</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 EventMate - AI Based Event Planning & Scheduling System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
