import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home'); // Route for Home.jsx
  };

  return (
    <div className="user-dashboard-container">
      <h2 className="user-dashboard-heading">User Dashboard</h2>
      <p className="user-dashboard-message">Welcome, User! You have standard access.</p>
      <button 
        onClick={goToHome} 
        className="user-dashboard-button"
      >
        Go to Home
      </button>
    </div>
  );
}

export default UserDashboard;