import './Home.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ For navigation

function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([
    { name: 'Daaku Maharaja', image: '/download (1).jpeg' },
    { name: 'Locked', image: '/images (2).jpeg' },
    { name: 'Thelusu Kada', image: '/images (3).jpeg' },
    { name: 'Chhaava', image: '/images (4).jpeg' },
    { name: 'Game Changer', image: '/images (5).jpeg' },
  ]);

  const movies = [...filteredMovies]; // all movies

  const handleSearch = () => {
    const searchTerm = search.trim().toLowerCase();
    const matched = movies.some(movie => movie.name.toLowerCase() === searchTerm);

    if (matched) {
      setMessage('Movie available');
      setFilteredMovies(
        movies.filter(movie => movie.name.toLowerCase() === searchTerm)
      );
    } else {
      setMessage('Movie not available');
      setFilteredMovies(movies); // Reset all or empty
    }
  };

  const handleMovieClick = (movieName) => {
    navigate(`/movie?movie=${encodeURIComponent(movieName)}`); // ✅ navigate instead of window.open
  };

  return (
    <div className="home-container">
      <div className="search-box">
        <h1>BookMyShow</h1>
        <p>Online Ticket Booking Portal</p>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="image-container">
        <div className="image-row">
          {filteredMovies.map((movie, index) => (
            <img
              key={index}
              src={movie.image}
              alt={movie.name}
              className="movie-image"
              onClick={() => handleMovieClick(movie.name)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
