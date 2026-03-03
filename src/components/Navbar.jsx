import React from 'react';
import '../styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('userRole');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <span className="brand-icon">🤖</span>
            EventMate
          </Link>
        </div>

        <ul className="navbar-menu">
          <li>
            <Link to="/">Home</Link>
          </li>

          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to={
                    userRole === 'User'
                      ? '/user-dashboard'
                      : userRole === 'Admin'
                      ? '/admin-dashboard'
                      : '/organiser-dashboard'
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button className="btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
