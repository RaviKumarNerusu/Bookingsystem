import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Seatallocation.css';

const Seatallocation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const movieName = queryParams.get('movie') || 'Unknown Movie';
    const theaterName = queryParams.get('theater') || 'Unknown Theater';
    const showtime = queryParams.get('showtime') || 'Unknown Showtime';
    const language = queryParams.get('language') || 'Unknown Language';

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const columnsPerBlock = 10;
    const totalColumns = 20;
    const ticketPrice = 200;

    // Initialize seats randomly marked 'available' or 'reserved'
    const [seats, setSeats] = useState(() => {
        return rows.map(() =>
            Array(totalColumns).fill().map(() => ({
                status: Math.random() > 0.3 ? 'available' : 'reserved',
                animate: false,
            }))
        );
    });

    const [selectedCount, setSelectedCount] = useState(0);

    const totalCost = selectedCount * ticketPrice;

    const handleSeatClick = (rowIndex, colIndex) => {
        if (seats[rowIndex][colIndex].status === 'reserved') return;

        const newSeats = [...seats];
        const isSelected = seats[rowIndex][colIndex].status === 'selected';

        newSeats[rowIndex][colIndex] = {
            status: isSelected ? 'available' : 'selected',
            animate: !isSelected,
        };

        setSeats(newSeats);
        setSelectedCount(prev => (isSelected ? prev - 1 : prev + 1));

        // Remove animation after 500ms
        setTimeout(() => {
            const resetSeats = [...newSeats];
            resetSeats[rowIndex][colIndex].animate = false;
            setSeats(resetSeats);
        }, 500);
    };

    const handleConfirmSeats = () => {
        if (selectedCount === 0) {
            alert('Please select at least one seat.');
            return;
        }
        // Navigate to Payment page with booking details in state
        navigate('/payment', {
            state: {
                selectedCount,
                totalCost,
                movieName,
                theaterName,
                showtime,
                language
            }
        });
    };

    return (
        <div className="seat-allocation-container">
            <header className="seat-header">
                <div className="header-content">
                    <div className="header-left">
                        <h1>{movieName} - Seat Selection</h1>
                        <p>
                            Theater: {theaterName} | Showtime: {showtime} | Language: {language}
                        </p>
                    </div>
                    <div className="header-right">
                        <p className="ticket-cost">Ticket Cost: ₹{ticketPrice} per seat</p>
                        <p className="total-cost">Total Cost: ₹{totalCost}</p>
                    </div>
                </div>
            </header>

            <div className="legend">
                <div className="legend-item">
                    <div className="seat available"></div>
                    <span>Available</span>
                </div>
                <div className="legend-item">
                    <div className="seat reserved"></div>
                    <span>Reserved</span>
                </div>
                <div className="legend-item">
                    <div className="seat selected"></div>
                    <span>Selected</span>
                </div>
                <div className="selected-count">
                    Selected Seats: {selectedCount}
                </div>
            </div>

            <div className="seat-grid">
                <div className="seat-block">
                    {rows.map((row, rowIndex) => (
                        <div key={row} className="seat-row">
                            <span className="row-label">{row}</span>
                            {seats[rowIndex].slice(0, columnsPerBlock).map((seat, colIndex) => (
                                <div
                                    key={`${row}-${colIndex + 1}`}
                                    className={`seat ${seat.status} ${seat.animate ? 'animate-selection' : ''}`}
                                    onClick={() => handleSeatClick(rowIndex, colIndex)}
                                >
                                    {colIndex + 1}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="column-labels">
                        {Array.from({ length: columnsPerBlock }, (_, i) => i + 1).map(num => (
                            <span key={num}>{num}</span>
                        ))}
                    </div>
                </div>

                <div className="seat-block">
                    {rows.map((row, rowIndex) => (
                        <div key={row} className="seat-row">
                            {seats[rowIndex].slice(columnsPerBlock, totalColumns).map((seat, colIndex) => (
                                <div
                                    key={`${row}-${colIndex + columnsPerBlock + 1}`}
                                    className={`seat ${seat.status} ${seat.animate ? 'animate-selection' : ''}`}
                                    onClick={() => handleSeatClick(rowIndex, colIndex + columnsPerBlock)}
                                >
                                    {colIndex + columnsPerBlock + 1}
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="column-labels">
                        {Array.from({ length: columnsPerBlock }, (_, i) => i + columnsPerBlock + 1).map(num => (
                            <span key={num}>{num}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="screen">
                <div className="screen-text">MOVIE SCREEN</div>
            </div>

            <div className="confirm-section">
                <button className="confirm-btn" onClick={handleConfirmSeats}>
                    Confirm Seats
                </button>
            </div>
        </div>
    );
};

export default Seatallocation;
