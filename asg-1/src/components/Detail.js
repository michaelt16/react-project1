import React from 'react';
import Favorite from "./Favorite";
import Rating from "./Rating";
import UserRating from "./UserRating";
import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from 'react-router-dom';
import Modal from "react-modal"
export default function Detail(props) {
    // query parameter
    const { id } = useParams();
    const movie = props.copyMovies.find(m => m.id == id);
    
    const [rating, setRating] = useState(0);

    const imdbLink = `https://www.imdb.com/title/${movie.imdb_id}`;
    const tmdbLink = `https://www.themoviedb.org/movie/${movie.tmdb_id}`;

    const handleAddRating = (rating) => {
        let updatedMovies = props.copyMovies.map(m => {
            if (m.id == id) {
              m.isRated = true;
              m.userRating = rating;
            }
            return m;
        });
        // update local storage so that the favorite remains
        localStorage.setItem("movies", JSON.stringify(updatedMovies));
        props.setCopyMovies(updatedMovies);
    }

    let genres = ""
    movie.details.genres.forEach(genre => {
        genres += genre.name + ", ";
    })
    // remove the last comma
    genres = genres.slice(0, -2);
    
    // concat the title with the year
    const targetMovie = props.copyMovies.find(m => m.id == id);
    const favoriteIcon = targetMovie.isFavorited? "💙" : "🤍";

    const broken_image = require("../img/broken_image.png");
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#1A1A1A",
          border: "none",
          borderRadius: "8px",
          padding: "0",
        },
        overlay: {
          backgroundColor: "rgba(0,0,0,0.7)",
          zIndex: "1000",
        },
      };
    const [open,setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <div className="grid grid-cols-5 h-screen">
            {/* poster portion */}
            <div className="col-span-1 p-5">
                {/* poster image */}
                {movie.imageLoaded && (
                    <img
                        src={`https://www.themoviedb.org/t/p/w780${movie.poster}`}
                        className="rounded-lg object-cover cursor-pointer "
                        id={movie.id}
                        alt={movie.title}
                        onClick={handleOpen}
                    />
                )}
                {/* fallback image */}
                {!movie.imageLoaded && (
                    <img
                        src={broken_image}
                        className="rounded-lg object-cover w-full cursor-pointer"
                        id={movie.id}
                        alt={movie.title}
                        title={movie.title}
                        onClick={handleOpen}
                    />
                )}

                <Modal isOpen={open} onRequestClose={handleClose} style={customStyles}>

                <img
                     src={`https://www.themoviedb.org/t/p/w780${movie.poster}`}
                     className="rounded object-cover w-96"
                        alt={movie.title}
          />
                </Modal>
                {/* button portion */}
                <div className="flex py-5 justify-center">
                    <Link to="/browse">
                        <button className="bg-grey text-white font-semibold py-2 px-2 rounded-lg hover:bg-gray-700">
                            Close
                        </button>
                    </Link>
                </div>
            </div>

            <div className={`col-span-${props.favoriteVisible? 3: 4} p-5 bg-gray-100`}>
                <div className="flex">
                    <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
                    <h2 className="text-4xl px-2">({movie.release_date.substring(0, 4)})</h2>
                    <button className="text-2xl px-1"
                        onClick={() => props.setFavorite(movie.id)}>
                        {favoriteIcon}
                    </button>
                </div>

                <Rating
                    average={movie.ratings.average}
                    count={movie.ratings.count} />

                {/* external link */}
                <div className="flex gap-2 mt-2">
                    <a href={tmdbLink} target="_blank" rel="noreferrer">
                        <img
                            className="py-1"
                            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                            width="40px" />
                    </a>
                    <a href={imdbLink} target="_blank" rel="noreferrer">
                        <img
                            className="py-1"
                            src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
                            width="40px" />
                    </a>
                </div>
                
                {/* rating range slider */}
                <UserRating
                    movie={movie}
                    setRating={setRating}
                    handleAddRating={handleAddRating}
                    rating={rating}
                />

                {/* quote */}
                <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white py-5">
                    <svg aria-hidden="true" className="w-10 h-10 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/></svg>
                    <p>"{movie.tagline}"</p>
                </blockquote>

                {/* movie details */}
                <div>
                    <strong>Release Date: </strong>{movie.release_date}<br/>
                    <strong>Genre: </strong>{genres}<br/>
                    <strong>Runtime: </strong>{movie.runtime} mins<br/>
                    <strong>Revenue: </strong>${movie.revenue.toLocaleString()} <br/>
                    <strong>Overview: </strong>{movie.details.overview}
                </div>
            </div>
            {props.favoriteVisible && 
                <Favorite
                    movies={props.copyMovies}
                    setMovies={props.setCopyMovies}
                    closeFavorite={props.closeFavorite}/>}
        </div>
      );
    
}

