import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'User',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasSpecialChar = /[@#$%&*]/.test(password);
    const isCorrectLength = password.length === 8;
    return {
      isValid: hasSpecialChar && isCorrectLength,
      hasSpecialChar,
      isCorrectLength,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    if (name === 'password') {
      const validation = validatePassword(value);
      setErrors((prev) => ({
        ...prev,
        password: validation.isValid ? '' : 'Invalid password format',
      }));
    }

    if (name === 'confirmPassword') {
      const match = value === formData.password;
      setErrors((prev) => ({
        ...prev,
        confirmPassword: match ? '' : 'Passwords do not match',
      }));
    }

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? '' : 'Invalid email format',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const validation = validatePassword(formData.password);
    if (!validation.isValid) {
      newErrors.password = validation.isCorrectLength
        ? 'Password must contain at least one special symbol (@, #, $, %, &, *)'
        : 'Password must be exactly 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Store registration data in localStorage
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <h2 className="auth-title">Create Account</h2>

        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={errors.fullName ? 'error' : ''}
            />
            {errors.fullName && (
              <div className="validation-message error">{errors.fullName}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <div className="validation-message error">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password (exactly 8 chars + special symbol)
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Pass@123"
              className={errors.password ? 'error' : formData.password && !errors.password ? 'success' : ''}
            />
            <small className="password-hint">
              Requirements: 8 characters exactly, include one special symbol (@, #, $, %, &, *)
            </small>
            {errors.password && (
              <div className="validation-message error">{errors.password}</div>
            )}
            {formData.password && !errors.password && (
              <div className="validation-message success">✓ Password valid</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'error' : formData.confirmPassword && !errors.confirmPassword ? 'success' : ''}
            />
            {errors.confirmPassword && (
              <div className="validation-message error">
                {errors.confirmPassword}
              </div>
            )}
            {formData.confirmPassword && !errors.confirmPassword && (
              <div className="validation-message success">✓ Passwords match</div>
            )}
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
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
