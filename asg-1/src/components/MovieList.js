import { useEffect, useState } from "react";
import Movie from "./Movie";

export default function MovieList(props) {

    // this method replaces icon with error image
    const handleImageError = (e) => {
        // copy the movies
        const updatedMovies = [...props.movies];
        updatedMovies[e.target.id].imageLoaded = false;
        localStorage.setItem("movies", JSON.stringify(updatedMovies))
        props.setMovies(updatedMovies);
    };

    const setFavorite = (i) => {
        const updatedMovies = [...props.movies];
        updatedMovies[i].isFavorited = !updatedMovies[i].isFavorited;
        // update local storage so that the favorite remains
        localStorage.setItem("movies", JSON.stringify(updatedMovies))
        props.setMovies(updatedMovies)
    }

    const broken_image = require("../img/broken_image.png");

    return (
        <div className={props.classList}>
            <h2 className="m-4 font-bold mb-4">Movies</h2>
            <div className="grid grid-cols-4 gap-4 grid-rows-2 mt-4 mx-4">
            {props.movies.map((movie, index) => 
                <Movie
                    key={movie.id}
                    index={index}
                    movie={movie}
                    broken_image={broken_image}
                    handleImageError={handleImageError}
                    setMovies={props.setMovies}
                    setFavorite={setFavorite}
                    />)}
            </div>
        </div>
    );
}
