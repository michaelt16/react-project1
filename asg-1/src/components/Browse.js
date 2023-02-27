import Favorite from "./Favorite";
import Filter from "./Filter"
import MovieList from "./MovieList";
import { useState } from "react";

export default function Browse(props){

    const [initialMovies]= useState(props.movies)

    const handleChange = (newVal)=>{ 
        props.setMovies(newVal)
        console.log("updatesd",newVal)
    }
    return(
        <div className="grid grid-cols-5 h-screen">
            {console.log("initialMovies",initialMovies)}

             <Filter movies= {props.movies} 
            genreList ={props.genreList} 
            initialMovies = {initialMovies}
            setMovies = {props.setMovies}
            onSubmit={handleChange}
            />
            <MovieList
                movies={props.movies}
                setMovies={props.setMovies}
                favoriteVisible={props.favoriteVisible}
                setFavorite={props.setFavorite}
                handleImageError={props.handleImageError}
                //onClick={handleChange}
                initialMovies={initialMovies}
                />

            {props.favoriteVisible && 
                <Favorite
                    movies={props.movies}
                    setMovies={props.setMovies}
                    closeFavorite={props.closeFavorite}/>}
            
        </div>
    );
}