import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import Home from './Home';
import Home2 from './Home2';
import Theaterhome from './Theaterhome';
import Seatallocation from './Seatallocation';
import Payment from './Payment';
import PaymentHandler from './PaymentHandler';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie" element={<Home2 />} />
        <Route path="/theatre" element={<Theaterhome />} />
        <Route path="/seat-allocation" element={<Seatallocation />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-handler" element={<PaymentHandler />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;