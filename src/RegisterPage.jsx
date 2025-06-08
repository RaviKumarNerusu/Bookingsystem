// RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Using useNavigate for potential redirect after success

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleRegister = async () => {
    setError(null); // Clear previous errors
    setMessage(null); // Clear previous messages
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        email,
        password,
      });
      setMessage(response.data.message); // Set success message
      alert(response.data.message); // Keep the alert for immediate feedback

      // Optionally, redirect to login page after successful registration
      navigate('/login'); 

    } catch (error) {
      // Handle different types of errors
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      alert("Registration Error: " + errorMessage); // Provide feedback
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#28a745' }}>Register</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: 'calc(100% - 16px)', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: 'calc(100% - 16px)', padding: '8px', margin: '8px 0', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <button
          onClick={handleRegister}
          style={{ width: '100%', padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
        >
          Register
        </button>
        {message && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{message}</p>}
        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
      </div>
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already have an account? <a href="/login" style={{ color: '#007bff', textDecoration: 'none' }}>Login here</a>
      </p>
    </div>
  );
}

export default RegisterPage;