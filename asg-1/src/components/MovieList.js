import Movie from "./Movie";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function MovieList(props) {

    const close = () => <Link to="/browse"></Link>
    const [sortOrderTitle,setSortOrderTitle] = useState("desc");
    const [sortOrderDate, setSortOrderDate] = useState("desc");
    const [sortOrderRating, setSortOrderRating] = useState("desc");

    const broken_image = require("../img/broken_image.png");
   
    const handleTitle = (e)=>{
        props.setMovies(props.initialMovies)
        let sorted = [...props.movies].sort((movie1, movie2)=>{
            return sortOrderTitle === "asc"
            ? movie1.title.localeCompare(movie2.title)
            : movie2.title.localeCompare(movie1.title);
        })
        setSortOrderTitle(sortOrderTitle === "asc" ? "desc" : "asc" );
        setSortOrderDate("desc");
        setSortOrderRating("desc");
        props.setMovies(sorted)
    }
    // switching back and forth between date asc and desc
    const handleDate = (e) => {
        props.setMovies(props.initialMovies)
        let sorted = [...props.movies].slice().sort((movie1, movie2) => {
                return sortOrderDate === "asc"
            ? movie1.release_date.localeCompare(movie2.release_date)
            : movie2.release_date.localeCompare(movie1.release_date);
        });
    
        setSortOrderDate(sortOrderDate === "asc" ? "desc" : "asc");
        setSortOrderTitle("asc");
        setSortOrderRating("desc");
        props.setMovies(sorted);
  };
    // switching back and forth between rating asc and desc
    const handleRating = (e) => {
         props.setMovies(props.initialMovies)
        let sorted = [...props.movies].slice().sort((movie1,movie2)=>{
            return sortOrderRating ==="asc"
            ?movie1.ratings.average.toString().localeCompare(movie2.ratings.average.toString())
            : movie2.ratings.average.toString().localeCompare(movie1.ratings.average.toString());
        })
        setSortOrderRating(sortOrderRating === "asc" ? "desc" : "asc");
        setSortOrderDate("desc");
        setSortOrderTitle("asc");
        props.setMovies(sorted);
    }

    let outSideClass = (props.filterVisible && props.favoriteVisible) ? "col-span-3" :
        (!props.filterVisible && !props.favoriteVisible) ? "col-span-5" : "col-span-4"
    outSideClass += " bg-gray-200 overflow-y-scroll hide-scroll"

    let inSideColSpan = (props.filterVisible && props.favoriteVisible) ? "grid-cols-3" :
    (!props.filterVisible && !props.favoriteVisible) ? "grid-cols-5" : "grid-cols-4"
    inSideColSpan += " grid gap-4 grid-rows-2 mt-4 mx-4"
    

    return (
        <div className={outSideClass}>
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => {props.setFilterVisible(!props.filterVisible)}}
                        title={props.filterVisible? "Close filter" : "Open filter"}
                        className="border pb-1 px-2 text-xl rounded-md bg-grey text-white cursor-pointer hover:bg-gray-600">
                        {props.filterVisible? "???" : "???"}
                    </button>
                    <div className="text-xl font-bold">Movies</div>
                </div>
                <div className="flex justify-end">
                    <div className="inline-block">Sort By:</div>
                        <div className="mx-2 justify-items-end">
                            <label className="inline-block mx-4 font-bold mr-2 cursor-pointer" onClick={handleTitle}>Title</label>
                            <label className="inline-block mx-4 font-bold mr-2 cursor-pointer" onClick = {handleDate}>Date</label>
                            <label className="inline-block mx-4 font-bold cursor-pointer" onClick={handleRating}>Rating</label>
                        </div>
                </div>
            </div>

            <div className={inSideColSpan}>
                {props.movies.length > 0?
                props.movies.map((movie, index) =>
                    <Movie
                        key={movie.id}
                        index={index}
                        movie={movie}
                        broken_image={broken_image}
                        handleImageError={props.handleImageError}
                        setMovies={props.setMovies}
                        copyMovies={props.copyMovies}
                        setCopyMovies={props.setCopyMovies}
                        setFavorite={props.setFavorite}
                        />):
                    <p className="mx-20 w-full mt-8 col-span-2">No results found.</p>}
            </div>
        </div>
    );
}
