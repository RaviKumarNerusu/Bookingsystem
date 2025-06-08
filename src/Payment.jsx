import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  // Extract booking details from navigation state
  const { selectedCount, totalCost, movieName, theaterName, showtime, language } = location.state || {};

  const handlePayment = () => {
    try {
      // Validate required data
      if (!totalCost || totalCost <= 0) {
        setError('Invalid payment amount.');
        return;
      }

      // Navigate to PaymentHandler with booking details
      navigate('/payment-handler', {
        state: {
          selectedCount,
          totalCost,
          movieName,
          theaterName,
          showtime,
          language,
        },
      });
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="payment-card">
      <h2>Pay for {movieName}</h2>
      <div className="payment-details">
        <p><strong>Theater:</strong> {theaterName}</p>
        <p><strong>Showtime:</strong> {showtime}</p>
        <p><strong>Language:</strong> {language}</p>
        <p><strong>Seats Selected:</strong> {selectedCount || 0}</p>
        <p><strong>Total Cost:</strong> ₹{totalCost || 0}</p>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="pay-button" onClick={handlePayment}>
        Pay ₹{totalCost || 0}
      </button>
    </div>
  );
};

export default Payment;