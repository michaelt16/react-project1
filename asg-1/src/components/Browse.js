import Favorite from "./Favorite";
import Filter from "./Filter"
import MovieList from "./MovieList";
import { useState } from "react";

export default function Browse(props){
     
       
       
    const [initialMovies]= useState(props.movies)
    const[copyMovies]=useState(props.copyMovies)

    const handleChange = (newVal)=>{ 
        props.setMovies(newVal)
        console.log("updatesd",newVal)
    }
    return(
        <div className="grid grid-cols-5 h-screen">
            {console.log("initialMovies",initialMovies)}
            {console.log("allmovies",copyMovies,props.movies)}
            
             <Filter movies= {props.movies} 
            genreList ={props.genreList} 
            initialMovies = {initialMovies}
            setMovies = {props.setMovies}
            onSubmit={handleChange}
            copyMovies = {props.copyMovies}
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
                    movies={initialMovies}
                    setMovies={props.setMovies}
                    closeFavorite={props.closeFavorite}/>}
            
        </div>
    );
}