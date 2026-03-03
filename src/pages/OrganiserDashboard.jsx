import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const OrganiserDashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="card dashboard-card">
          <div className="dashboard-header">
            <div className="welcome-section">
              <h1>Welcome, Organiser! 🎪</h1>
              <p className="user-email">Email: {userEmail}</p>
            </div>
            <button className="btn btn-danger btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="dashboard-body">
            <p className="dashboard-description">
              Create and manage your events efficiently. Track registrations,
              analyze attendance, and grow your event portfolio.
            </p>

            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>My Events</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>Total Registrations</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>Revenue</h3>
                  <p className="stat-number">$0</p>
                </div>
              </div>
            </div>

            <div className="dashboard-actions">
              <h3>Organiser Tools</h3>
              <div className="action-buttons">
                <button className="btn btn-primary btn-small">
                  Create Event
                </button>
                <button className="btn btn-secondary btn-small">
                  My Events
                </button>
                <button className="btn btn-primary btn-small">
                  Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganiserDashboard;
