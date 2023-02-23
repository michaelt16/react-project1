import { useEffect, useState } from "react";
import Movie from "./Movie";

export default function MovieList(props) {
    const [movies, setMovies] = useState([]);
    const URL = "https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=30";

    useEffect(() => {
        // if local storage has nothing
        if (localStorage.getItem("movies") == null) {
        // fetch and put data into local storage
            fetch(URL)
                .then((resp) => resp.json())
                .then((data) => {
                    // create an key imageLoaded to indicate if the image is successfully loaded
                    data.forEach(e => e["imageLoaded"] = true);
                    localStorage.setItem("movies", JSON.stringify(data));
                    setMovies(JSON.parse(localStorage.getItem("movies")))
                });
        } else {
            setMovies(JSON.parse(localStorage.getItem("movies")))
        }
    // dependency array to prevent useEffect gets called every render
    }, []);

    // this method replaces icon with error image
    const handleImageError = (e) => {
        // copy the movies
        const updatedMovies = [...movies];
        updatedMovies[e.target.id].imageLoaded = false;
        setMovies(updatedMovies);
    };
    const broken_image = require("../img/broken_image.png");

    return (
        <div className={props.classList}>
            <h2 className="m-4 font-bold mb-4">Movies</h2>
            <div className="grid grid-cols-4 gap-4 grid-rows-2 mt-4 mx-4">
            {movies.map((movie, index) => 
                <Movie
                    key={movie.id}
                    index={index}
                    movie={movie}
                    broken_image={broken_image}
                    handleImageError={handleImageError}/>)}
            </div>
        </div>
    );
}
