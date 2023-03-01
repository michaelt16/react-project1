import Favorite from "./Favorite";
import Filter from "./Filter"
import MovieList from "./MovieList";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

export default function Browse(props){
    const [initialMovies] = useState(props.movies);
    const [filterVisible, setFilterVisible] = useState(true)

    return(
        <div className="grid grid-cols-5 h-screen">
            {/* loading animation */}
            {/* ref: https://stackabuse.com/how-to-create-a-loading-animation-in-react-from-scratch/ */}
            {props.loading &&
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>}
            {filterVisible && 
                <Filter
                    movies= {props.movies} 
                    genreList={props.genreList} 
                    initialMovies={initialMovies}
                    setMovies={props.setMovies}
                    copyMovies={props.copyMovies}
                />
            }

            <MovieList
                movies={props.movies}
                setMovies={props.setMovies}
                setCopyMovies={props.setCopyMovies}
                copyMovies={props.copyMovies}
                favoriteVisible={props.favoriteVisible}
                setFavorite={props.setFavorite}
                filterVisible={filterVisible}
                setFilterVisible={setFilterVisible}
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