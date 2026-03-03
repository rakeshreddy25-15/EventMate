import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';

const AdminDashboard = () => {
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
              <h1>Welcome, Admin! 👨‍💼</h1>
              <p className="user-email">Email: {userEmail}</p>
            </div>
            <button className="btn btn-danger btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <div className="dashboard-body">
            <p className="dashboard-description">
              You have administrative access to EventMate - AI Based Event Planning & Scheduling System.
              Manage users, events, and system settings from here.
            </p>

            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>Total Users</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-content">
                  <h3>Total Events</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🎪</div>
                <div className="stat-content">
                  <h3>Active Events</h3>
                  <p className="stat-number">0</p>
                </div>
              </div>
            </div>

            <div className="dashboard-actions">
              <h3>Admin Controls</h3>
              <div className="action-buttons">
                <button className="btn btn-primary btn-small">
                  Manage Users
                </button>
                <button className="btn btn-secondary btn-small">
                  Manage Events
                </button>
                <button className="btn btn-primary btn-small">
                  View Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
