import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const UserDashboard = () => {
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
              <h1>Welcome, User! 👋</h1>
              <p className="user-email">Email: {userEmail}</p>
            </div>
            <button className="btn btn-danger btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="dashboard-body">
            <p className="dashboard-description">
              You are successfully logged in to EventMate - AI Based Event Planning & Scheduling System.
            </p>

            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>Upcoming Events</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🎟️</div>
                <div className="stat-content">
                  <h3>Booked Events</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">💬</div>
                <div className="stat-content">
                  <h3>Messages</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>
            </div>

            <div className="dashboard-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="btn btn-primary btn-small">
                  Browse Events
                </button>
                <button className="btn btn-secondary btn-small">
                  My Bookings
                </button>
                <button className="btn btn-primary btn-small">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
