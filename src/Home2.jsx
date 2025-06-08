import './Home2.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Static movie details (since we can't fetch from Google)
const movieDetails = {
  'Daaku Maharaja': {
    image: '/download (1).jpeg',
    rating: '7.8/10 (50K votes)',
    languages: 'Hindi, Tamil, Telugu',
    duration: '2h 45m',
    genre: 'Action, Drama',
    releaseDate: '15 August 2025',
    description: 'A powerful story of a fearless leader fighting for justice in a corrupt world.',
  },
  'Locked': {
    image: '/images (2).jpeg',
    rating: '7.6/10 (40.1K votes)',
    languages: 'Tamil, Kannada, Hindi, Telugu',
    duration: '2h 48m',
    genre: 'Action, Thriller',
    releaseDate: '1 May 2025',
    description: 'A gripping thriller about a man trapped in a dangerous game of survival.',
  },
  'Thelusu Kada': {
    image: '/images (3).jpeg',
    rating: '8.0/10 (30K votes)',
    languages: 'Telugu, Tamil',
    duration: '2h 30m',
    genre: 'Comedy, Drama',
    releaseDate: '10 June 2025',
    description: 'A heartwarming tale of friendship and love set in a small village.',
  },
  'Chhaava': {
    image: '/images (4).jpeg',
    rating: '7.5/10 (25K votes)',
    languages: 'Hindi, Marathi',
    duration: '3h 10m',
    genre: 'Historical, Action',
    releaseDate: '20 December 2024',
    description: 'An epic historical drama depicting the life of a legendary warrior.',
  },
  'Game Changer': {
    image: '/images (5).jpeg',
    rating: '8.2/10 (60K votes)',
    languages: 'Telugu, Hindi, Tamil',
    duration: '2h 55m',
    genre: 'Action, Political Thriller',
    releaseDate: '5 January 2025',
    description: 'A high-stakes political thriller about a man challenging a corrupt system.',
  },
};

function Home2() {
  // Get the movie name from the query parameter
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const movieName = queryParams.get('movie') || 'Daaku Maharaja';

  // State to manage the selected location
  const [selectedLocation, setSelectedLocation] = useState('Vijayawada'); // Default to current location
  // State to manage the rating popup visibility
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  // State to manage the user's selected rating
  const [userRating, setUserRating] = useState(0);
  // State to manage the hover state for stars
  const [hoverRating, setHoverRating] = useState(0);
  // State to store the submitted rating
  const [submittedRating, setSubmittedRating] = useState(null);

  // List of available locations
  const locations = ['Vijayawada', 'Chennai', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'];

  // Get movie details
  const movie = movieDetails[movieName] || movieDetails['Daaku Maharaja'];

  // Handle rating submission
  const handleSubmitRating = () => {
    setSubmittedRating(userRating);
    setShowRatingPopup(false);
    setUserRating(0); // Reset user rating for next time
    setHoverRating(0); // Reset hover rating
  };

  // Handle share button click
  const handleShare = () => {
    const shareData = {
      title: `Check out ${movieName}`,
      text: `I'm watching ${movieName}! Check it out here:`,
      url: `https://yourapp.com/movie?movie=${encodeURIComponent(movieName)}`, // Replace with your app's URL
    };

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
        `${shareData.text} ${shareData.url}`
      )}`;
      window.location.href = whatsappUrl;
    }
  };

  // Handle book tickets button click
  const handleBookTickets = () => {
    navigate(`/theatre?movie=${encodeURIComponent(movieName)}&location=${encodeURIComponent(selectedLocation)}`);
  };

  return (
    <div className="movie-details-page-container">
      {/* Header */}
      <header className="movie-details-header">
        <div className="movie-details-logo">bookmyshow</div>
        <div className="movie-details-nav-links">
          <span>Movies</span>
          <span>Stream</span>
          <span>Plays</span>
          <span>Sports</span>
          <span>Activities</span>
        </div>
        <div className="movie-details-header-right">
          <select
            className="movie-details-location-dropdown"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Centered Movie Details Section */}
      <div className="movie-details-wrapper">
        <div className="movie-details">
          <div className="movie-poster">
            <img src={movie.image} alt={movieName} />
          </div>
          <div className="movie-info">
            <h1>{movieName}</h1>
            <div className="rating">
              <span>⭐ {movie.rating}</span>
              <button
                className="movie-details-rate-btn"
                onClick={() => setShowRatingPopup(true)}
              >
                Rate now
              </button>
              {submittedRating && (
                <span className="movie-details-user-rating">
                  Your rating: {submittedRating}/5 ⭐
                </span>
              )}
            </div>
            <div className="details">
              <span>Trailers (7)</span>
              <span>2D</span>
              <span>{movie.languages}</span>
            </div>
            <div className="meta">
              <span>{movie.duration} • {movie.genre} • UA16+ • {movie.releaseDate}</span>
            </div>
            <button
              className="movie-details-book-tickets-btn"
              onClick={handleBookTickets}
            >
              Book tickets
            </button>
            <span className="movie-details-in-cinemas">In cinemas</span>
          </div>
          <div className="movie-details-share">
            <button className="movie-details-share-btn" onClick={handleShare}>
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Rating Popup */}
      {showRatingPopup && (
        <div className="movie-details-rating-popup-overlay">
          <div className="movie-details-rating-popup">
            <h3>Rate this movie</h3>
            <div className="movie-details-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`movie-details-star ${star <= (hoverRating || userRating) ? 'filled' : ''}`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUserRating(star)}
                >
                  ⭐
                </span>
              ))}
            </div>
            <div className="movie-details-rating-actions">
              <button className="movie-details-submit-rating-btn" onClick={handleSubmitRating}>
                Submit
              </button>
              <button
                className="movie-details-cancel-rating-btn"
                onClick={() => {
                  setShowRatingPopup(false);
                  setUserRating(0);
                  setHoverRating(0);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* About the Movie */}
      <div className="movie-details-about-movie">
        <h2>About the movie</h2>
        <p>{movie.description}</p>
      </div>
    </div>
  );
}

export default Home2;