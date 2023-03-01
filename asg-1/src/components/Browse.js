import Favorite from "./Favorite";
import Filter from "./Filter"
import MovieList from "./MovieList";
import { useState, useEffect } from "react";

export default function Browse(props){
    const [initialMovies] = useState(props.movies);
    const URL = "https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=30";

    useEffect(() => {
        // if local storage has nothing
        if (localStorage.getItem("movies") == null) {
        // fetch and put data into local storage
            fetch(URL)
                .then((resp) => resp.json())
                .then((data) => {
                    // sorting by title
                    data.sort((a, b) => {
                      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
                    });
                    // create an key imageLoaded to indicate if the image is successfully loaded
                    data.forEach(e => e["imageLoaded"] = true);
                    data.forEach(e => e["isFavorited"] = false);
                    data.forEach(e => e["isRated"] = false);
                    data.forEach(e => e["userRating"] = null);
                    localStorage.setItem("movies", JSON.stringify(data));
                    props.setMovies(JSON.parse(localStorage.getItem("movies")))
                    // create a backup
                    props.setCopyMovies(JSON.parse(localStorage.getItem("movies")))
                });       
        } else {
            props.setMovies(JSON.parse(localStorage.getItem("movies")))
            props.setCopyMovies(JSON.parse(localStorage.getItem("movies")))
        }
      // dependency array to prevent useEffect gets called every render
      }, []);

    return(
        <div className="grid grid-cols-5 h-screen">
             <Filter
                movies= {props.movies} 
                genreList={props.genreList} 
                initialMovies={initialMovies}
                setMovies={props.setMovies}
                copyMovies={props.copyMovies}
            />

            <MovieList
                movies={props.movies}
                setMovies={props.setMovies}
                setCopyMovies={props.setCopyMovies}
                copyMovies={props.copyMovies}
                favoriteVisible={props.favoriteVisible}
                setFavorite={props.setFavorite}
                handleImageError={props.handleImageError}
                //onClick={handleChange}
                initialMovies={initialMovies}
            />

            {props.favoriteVisible && 
                <Favorite
                    movies={props.copyMovies}
                    setMovies={props.setCopyMovies}
                    closeFavorite={props.closeFavorite}/>}
            
        </div>
    );
}