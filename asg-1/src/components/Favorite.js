import { useEffect, useState } from "react";
import Movie from "./Movie";

export default function Favorite(props) {
    // filter the favorite movies
    const movies = props.movies.filter(e => e.isFavorited);

    const imageHandler = (e) => {
        
    };

    const broken_image = require("../img/broken_image.png");
    
    return (
        <div className="w-1/4 bg-gray-300 p-4 overflow-y-scroll hide-scroll">
            <div className="justify-between flex">
                <div className="text-lg font-bold mb-4 mt-2">Favorite</div>
                <div
                    className="text-lg font-bold mb-4 mt-2 justify-end cursor-pointer"
                    onClick={props.closeFavorite}>X</div>
            
            </div>

            {movies.map(movie => {
                return(
                    <div className="flex gap-4">
                        {/* poster image */}
                        {movie.imageLoaded && (
                            <img
                                src={`https://www.themoviedb.org/t/p/w154${movie.poster}`}
                                className="rounded object-fill w-24 cursor-pointer pb-2/3 mb-2"
                                onError={imageHandler}
                                id={movie.id}
                            />
                        )}
                        {/* fallback image */}
                        {!movie.imageLoaded && (
                            <img
                                src={broken_image}
                                className="rounded object-fill w-24"
                            />
                        )}
                        <div className="font-bold">
                            {`${movie.title} (${movie.runtime} mins)`}
                        </div>
                    </div>
                )
                
                })
            }
            <div>
            
            </div>
        </div>

        
    );
}
