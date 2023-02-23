import Favorite from "./Favorite";
import Filter from "./Filter"
import MovieList from "./MovieList";
import { useState } from "react";

export default function Browse(props){

    let movieClassList = props.favoriteVisiable? "w-2/4" : "w-4/4"
    movieClassList += "p-4 bg-gray-200 overflow-y-scroll hide-scroll"

    return(
        <div className="flex h-screen">
            <Filter/>
            <MovieList classList={movieClassList}/>
            {props.favoriteVisiable && <Favorite closeFavorite={props.closeFavorite}/>}
            
        </div>
    );
}