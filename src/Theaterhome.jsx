import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Theaterhome.css';

// Expanded theater data with more locations and languages
const theaters = [
    {
        name: "PVR Cinemas",
        location: "Chennai, Tamil Nadu",
        showTimings: ["10:00 AM", "1:30 PM", "4:00 PM", "7:30 PM", "10:00 PM"],
        language: "Tamil"
    },
    {
        name: "INOX",
        location: "Bangalore, Karnataka",
        showTimings: ["9:30 AM", "12:00 PM", "3:00 PM", "6:30 PM", "9:00 PM"],
        language: "Kannada"
    },
    {
        name: "Cinepolis",
        location: "Mumbai, Maharashtra",
        showTimings: ["11:00 AM", "2:00 PM", "5:30 PM", "8:00 PM", "11:00 PM"],
        language: "Hindi"
    },
    {
        name: "Sathyam Cinemas",
        location: "Hyderabad, Telangana",
        showTimings: ["10:30 AM", "1:00 PM", "4:30 PM", "7:00 PM", "9:30 PM"],
        language: "Telugu"
    },
    {
        name: "SPI Cinemas",
        location: "Coimbatore, Tamil Nadu",
        showTimings: ["9:00 AM", "12:30 PM", "3:30 PM", "6:00 PM", "9:30 PM"],
        language: "Tamil"
    },
    {
        name: "PVR Orion",
        location: "Pune, Maharashtra",
        showTimings: ["10:15 AM", "1:45 PM", "4:15 PM", "7:45 PM", "10:15 PM"],
        language: "Marathi"
    },
    {
        name: "INOX Quest",
        location: "Kolkata, West Bengal",
        showTimings: ["11:30 AM", "2:30 PM", "5:00 PM", "8:30 PM", "11:00 PM"],
        language: "Hindi"
    },
    {
        name: "Vijaya Theater",
        location: "Vijayawada, Andhra Pradesh",
        showTimings: ["10:45 AM", "1:15 PM", "4:45 PM", "7:15 PM", "10:45 PM"],
        language: "Telugu"
    },
    {
        name: "AGS Cinemas",
        location: "Madurai, Tamil Nadu",
        showTimings: ["9:45 AM", "12:15 PM", "3:45 PM", "6:15 PM", "9:45 PM"],
        language: "Tamil"
    },
    {
        name: "Carnival Cinemas",
        location: "Ahmedabad, Gujarat",
        showTimings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"],
        language: "Hindi"
    },
    {
        name: "E-Square",
        location: "Pune, Maharashtra",
        showTimings: ["11:15 AM", "2:15 PM", "5:15 PM", "8:15 PM", "11:15 PM"],
        language: "Hindi"
    },
    {
        name: "Devi Cineplex",
        location: "Chennai, Tamil Nadu",
        showTimings: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:30 PM"],
        language: "Telugu"
    },
    {
        name: "INOX Lepl",
        location: "Vijayawada, Andhra Pradesh",
        showTimings: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"],
        language: "Telugu"
    },
    {
        name: "PVR Ripples",
        location: "Vijayawada, Andhra Pradesh",
        showTimings: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM", "9:30 PM"],
        language: "Hindi"
    }
];

// Movie language mapping
const movieLanguages = {
    'Daaku Maharaja': ['Hindi', 'Tamil', 'Telugu'],
    'Locked': ['Tamil', 'Kannada', 'Hindi', 'Telugu'],
    'Thelusu Kada': ['Telugu', 'Tamil'],
    'Chhaava': ['Hindi', 'Marathi'],
    'Game Changer': ['Telugu', 'Hindi', 'Tamil']
};

const Theaterhome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const movieName = queryParams.get('movie') || 'Locked';
    const selectedLocation = queryParams.get('location') || 'Vijayawada';

    const supportedLanguages = movieLanguages[movieName] || ['Tamil', 'Kannada', 'Hindi', 'Telugu'];

    const filteredTheaters = theaters.filter(theater => 
        supportedLanguages.includes(theater.language) &&
        theater.location.toLowerCase().includes(selectedLocation.toLowerCase())
    );

    const handleBookShow = (theaterName, timing, language) => {
        const query = `?movie=${encodeURIComponent(movieName)}&theater=${encodeURIComponent(theaterName)}&showtime=${encodeURIComponent(timing)}&language=${encodeURIComponent(language)}`;
        navigate(`/seat-allocation${query}`);
    };

    return (
        <div className="theater-container">
            <header className="header">
                <h1 className="header-title">
                    BookMyShow - Theater Selection for "{movieName}" in {selectedLocation}
                </h1>
                <div className="header-info">
                    Languages: {supportedLanguages.join(', ')}
                </div>
            </header>

            {filteredTheaters.length > 0 ? (
                <div className="theater-list">
                    {filteredTheaters.map((theater, index) => (
                        <div key={index} className="theater-card">
                            <div className="theater-info">
                                <div>
                                    <h2 className="theater-name">{theater.name}</h2>
                                    <p className="theater-details">
                                        {theater.location} | Language: {theater.language}
                                    </p>
                                </div>
                                <span className="show-count">
                                    Total Shows: {theater.showTimings.length}
                                </span>
                            </div>

                            <div className="show-timings">
                                {theater.showTimings.map((timing, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleBookShow(theater.name, timing, theater.language)}
                                        className="show-time-btn"
                                    >
                                        {timing}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-theaters">
                    No theaters available for "{movieName}" in {selectedLocation} in supported languages.
                </div>
            )}

            <footer className="footer">
                © 2025 BookMyShow. All rights reserved.
            </footer>
        </div>
    );
};


export default Theaterhome