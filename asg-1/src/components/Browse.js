import Favorite from "./Favorite";
import Filter from "./Filter"
import MovieList from "./MovieList";
import { useEffect, useState } from "react";

export default function Browse(props){
    let movieClassList = props.favoriteVisible? "w-2/4" : "w-4/4"
    movieClassList += "p-4 bg-gray-200 overflow-y-scroll hide-scroll"
    //const [updatedMovies,setUpdatedMovies]=useState([])
 

    const [initialMovies]= useState(props.movies)

    const handleChange = (newVal)=>{ 
        props.setMovies(newVal)
        console.log("updatesd",newVal)
    }
    const handleClear = ()=>{
        
    }
    return(
        <div className="flex h-screen">
            {console.log("initial",initialMovies)}
            <Filter movies= {props.movies} 
            genreList ={props.genreList} 
            initialMovies = {initialMovies}
            setMovies = {props.setMovies}
            onSubmit={handleChange}
           
            />
            <MovieList
                movies={props.movies}
                classList={movieClassList}
                setMovies={props.setMovies}
                
                />

            {props.favoriteVisible && 
                <Favorite
                    movies={props.movies}
                    closeFavorite={props.closeFavorite} />}
            
        </div>
    );
}