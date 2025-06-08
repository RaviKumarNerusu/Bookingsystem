// AdminDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any authentication tokens/data (e.g., from localStorage)
    localStorage.removeItem('userRole'); // Example: if you store role
    console.log("Admin logged out");
    navigate('/login'); // Redirect to login page
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '2px 2px 8px rgba(0,0,0,0.1)', marginTop: '50px', textAlign: 'center' }}>
      <h2 style={{ color: '#dc3545' }}>Admin Dashboard</h2>
      <p>Welcome, Admin! You have special privileges here.</p>
      <button
        onClick={handleLogout}
        style={{ padding: '10px 20px', background: '#f00', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginTop: '20px' }}
      >
        Logout
      </button>
    </div>
  );
}

export default AdminDashboard;