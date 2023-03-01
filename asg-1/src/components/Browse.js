import Favorite from "./Favorite";
import Filter from "./Filter"
import MovieList from "./MovieList";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

export default function Browse(props){
    const [initialMovies] = useState(props.movies);

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