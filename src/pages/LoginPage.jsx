import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'User',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate email and password
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    // Validate password length
    if (formData.password.length !== 8) {
      setError('Password must be exactly 8 characters');
      return;
    }

    // For demo: accept any valid email/password format with exactly 8 chars
    // In real app, you'd validate against backend
    const userEmail = formData.email;
    const userRole = formData.role;

    // Store login data in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userEmail', userEmail);

    // Redirect based on role
    const roleRedirects = {
      User: '/user-dashboard',
      Admin: '/admin-dashboard',
      Organiser: '/organiser-dashboard',
    };

    navigate(roleRedirects[userRole]);
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h2 className="auth-title">Login</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password (exactly 8 characters)</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <small className="password-hint">
              Password must be exactly 8 characters (no more, no less)
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="role">Select Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Organiser">Organiser</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register" className="auth-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
