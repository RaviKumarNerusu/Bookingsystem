import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentHandler.css';

const PaymentHandler = () => {
  const location = useLocation();
  console.log('Location State:', location.state);

  const [paymentAmount, setPaymentAmount] = useState(location.state?.totalCost || '');
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [adminNotified, setAdminNotified] = useState(false);
  const [isWaitingForAdmin, setIsWaitingForAdmin] = useState(false);
  const [adminResponse, setAdminResponse] = useState(null);
  const [confirmationId, setConfirmationId] = useState(null);
  const [billDetails, setBillDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const qrImageUrl = '/WhatsApp%20Image%202025-06-05%20at%2020.08.22_b4ea5e6e.jpg';

  const handlePayNow = async (e) => {
    e.preventDefault();
    if (!paymentAmount) {
      setErrorMessage('Please enter a valid payment amount.');
      return;
    }
    setErrorMessage('');
    setPaymentInitiated(true);
    setIsWaitingForAdmin(true);

    try {
      const response = await fetch('http://localhost:8080/api/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('admin:securePassword123')
        },
        body: JSON.stringify({
          amount: paymentAmount,
          item: location.state?.movieName || 'Movie Ticket',
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to initiate payment');
      }
      setConfirmationId(result.confirmationId);
      setAdminNotified(true);
    } catch (error) {
      setErrorMessage(error.message || 'Failed to notify admin. Please try again.');
      setIsWaitingForAdmin(false);
    }
  };

  useEffect(() => {
    let interval;
    if (adminNotified && !adminResponse && confirmationId) {
      interval = setInterval(async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/check-confirmation?confirmationId=${confirmationId}`, {
            headers: {
              'Authorization': 'Basic ' + btoa('admin:securePassword123')
            }
          });
          const result = await response.json();
          if (!response.ok) {
            throw new Error(result.message || 'Error checking admin response');
          }
          if (result.error) {
            setErrorMessage(result.error);
            setIsWaitingForAdmin(false);
            clearInterval(interval);
            return;
          }
          if (result.adminResponse) {
            setAdminResponse(result.adminResponse);
            if (result.adminResponse === 'yes') {
              setBillDetails({
                transactionId: result.transactionId,
                amount: result.amount,
                date: result.date,
                time: new Date(`2025-06-05T22:37:00+05:30`).toLocaleTimeString('en-IN', { hour12: true, hour: '2-digit', minute: '2-digit' }), // 10:37 PM IST
                item: result.item,
                billNumber: 'BN' + Math.floor(Math.random() * 1000000),
              });
            } else {
              setErrorMessage('Payment rejected by admin. Please contact support.');
            }
            setIsWaitingForAdmin(false);
            clearInterval(interval);
          }
        } catch (error) {
          setErrorMessage(error.message || 'Error checking admin response. Please try again.');
          setIsWaitingForAdmin(false);
          clearInterval(interval);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [adminNotified, adminResponse, confirmationId]);

  useEffect(() => {
    let timeout;
    if (adminNotified && !adminResponse) {
      timeout = setTimeout(() => {
        setErrorMessage('Admin did not respond in time. Please contact support.');
        setIsWaitingForAdmin(false);
      }, 300000);
    }
    return () => clearTimeout(timeout);
  }, [adminNotified, adminResponse]);

  return (
    <div className="payment-handler-container">
      <div className="payment-card">
        <h1 className="payment-title">Payment</h1>
        {location.state && (
          <div className="booking-details">
            <p><strong>Movie:</strong> {location.state.movieName}</p>
            <p><strong>Theater:</strong> {location.state.theaterName}</p>
            <p><strong>Showtime:</strong> {location.state.showtime}</p>
            <p><strong>Language:</strong> {location.state.language}</p>
            <p><strong>Selected Seats:</strong> {location.state.selectedCount}</p>
            <p><strong>Total Cost:</strong> ₹{location.state.totalCost}</p>
          </div>
        )}
        <form onSubmit={handlePayNow} className="payment-form">
          <div className="form-group">
            <label htmlFor="paymentAmount">Payment Amount (₹):</label>
            <input
              type="number"
              id="paymentAmount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter amount"
              readOnly={!!location.state?.totalCost}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {!paymentInitiated && (
            <button
              type="submit"
              className="submit-button"
              disabled={!paymentAmount || isWaitingForAdmin}
            >
              Pay Now
            </button>
          )}
        </form>
        {paymentInitiated && (
          <div className="qr-section">
            <p className="payment-instruction">
              {adminNotified ? (
                <>
                  Waiting for admin confirmation via SMS...
                  {isWaitingForAdmin && <span className="loading-spinner"></span>}
                </>
              ) : (
                <>
                  Notifying admin via SMS...
                  <span className="loading-spinner"></span>
                </>
              )}
            </p>
            <img
              src={qrImageUrl}
              alt="QR Code for Payment"
              className="qr-code-image"
              onError={() => console.error('Failed to load QR code image. Check if the file exists at:', qrImageUrl)}
            />
          </div>
        )}
        {billDetails && adminResponse === 'yes' && (
          <div className="bill-details">
            <h2>Bill Details</h2>
            <p><strong>Bill Number:</strong> {billDetails.billNumber}</p>
            <p><strong>Transaction ID:</strong> {billDetails.transactionId}</p>
            <p><strong>Amount Paid:</strong> ₹{billDetails.amount}</p>
            <p><strong>Date:</strong> {billDetails.date}</p>
            <p><strong>Time:</strong> {billDetails.time}</p>
            <p><strong>Item:</strong> {billDetails.item}</p>
            <p className="thank-you">Thank you for your purchase!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHandler;