import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    setMessage(null);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });
      setMessage(response.data.message);
      
      // Redirect based on the 'role' received in the response
      if (response.data.role === 'ADMIN') {
        navigate('/admin-dashboard');
      } else if (response.data.role === 'USER') {
        navigate('/user-dashboard');
      } else {
        console.warn("Unexpected user role:", response.data.role);
        navigate('/user-dashboard'); // Default to user dashboard
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    }
  };

  return (
    <div className="login-page-container">
      <h2 className="login-page-heading">Login</h2>
      <div className="login-page-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-page-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-page-input"
        />
        <button
          onClick={handleLogin}
          className="login-page-button"
        >
          Login
        </button>
        {message && <p className="login-page-message">{message}</p>}
        {error && <p className="login-page-error">{error}</p>}
      </div>
      <p className="login-page-register">
        Don't have an account? <a href="/register" className="login-page-register-link">Register here</a>
      </p>
    </div>
  );
}

export default LoginPage;