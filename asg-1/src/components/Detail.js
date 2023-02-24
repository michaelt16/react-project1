import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

export default function Detail(props) {
    // query parameter
    const { id } = useParams();
    // parameters passed in by Link
    const location = useLocation();
    const movie = location.state.movie;
    const index = location.state.index;
    const close = location.state.close;
    const setFavorite = location.state.setFavorite;
    
    const [rating, setRating] = useState(null);

    const imdbLink = `https://www.imdb.com/title/${movie.imdb_id}`;
    const tmdbLink = `https://www.themoviedb.org/movie/${movie.tmdb_id}`;

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    }

    const handleAddRating = () => {
        if (rating !== null) {
          // Add rating to movie
          console.log(`Added rating ${rating} to movie ${movie.title}`);
        }
    }

    const getStarIcon = (index) => {
        // round up the rating
        const ratingValue = Math.round(movie.ratings.average * 2) / 2;
        if (index <= Math.floor(ratingValue) - 1) {
          return fullStar;
        } else if (index === Math.floor(ratingValue) && ratingValue % 1 !== 0) {
          return halfStar;
        } else {
          return emptyStar;
        }
    }

    const stars = Array.from({length: 10}, (v, i) => i).map(index => {
        return <FontAwesomeIcon icon={getStarIcon(index)} key={index} />;
    });    
    

    
    return (
        <div className="movie-details">
            <h2>{movie.title}</h2>
            <div className="movie-info">
            <div className="column">
                <img src={`https://www.themoviedb.org/t/p/w342${movie.poster}`} alt={movie.title} />
                <div className="movie-links">
                <a href={imdbLink} target="_blank" rel="noreferrer">IMDb</a>
                <a href={tmdbLink} target="_blank" rel="noreferrer">TMDB</a>
                </div>
            </div>
            <div className="column">
                <div className="movie-rating">
                {stars}
                </div>
                <div className="movie-rating-form">
                {rating === null && (
                    <>
                    <input type="radio" name="rating" value="1" onChange={handleRatingChange} /> 1
                    <input type="radio" name="rating" value="2" onChange={handleRatingChange} /> 2
                    <input type="radio" name="rating" value="3" onChange={handleRatingChange} /> 3
                    <input type="radio" name="rating" value="4" onChange={handleRatingChange} /> 4
                    <input type="radio" name="rating" value="5" onChange={handleRatingChange} /> 5
                    <button onClick={handleAddRating}>Add Rating</button>
                    </>
                )}
                {rating !== null && (
                    <p>Your rating: {rating}</p>
                )}
                </div>
            </div>
            </div>
            
            <div className="movie-actions">
                <button onClick={close}>Close</button>
                <button onClick={() => setFavorite(index)}>Add to Favorites</button>
            </div>
        </div>
      );
    
}

