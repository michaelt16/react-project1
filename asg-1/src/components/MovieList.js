import Movie from "./Movie";
import { Link } from "react-router-dom";

export default function MovieList(props) {

    // this method replaces icon with error image
    const handleImageError = (e) => {
        // copy the movies
        const updatedMovies = [...props.movies];
        updatedMovies[e.target.id].imageLoaded = false;
        localStorage.setItem("movies", JSON.stringify(updatedMovies))
        props.setMovies(updatedMovies);
    };

    const setFavorite = (i) => {
        const updatedMovies = [...props.movies];
        updatedMovies[i].isFavorited = !updatedMovies[i].isFavorited;
        // update local storage so that the favorite remains
        localStorage.setItem("movies", JSON.stringify(updatedMovies))
        props.setMovies(updatedMovies)
    }

    const close = () => <Link to="/browse"></Link>

    const broken_image = require("../img/broken_image.png");

    let outsideDivClassList = props.favoriteVisible? "w-3/4" : "w-4/4"
    outsideDivClassList += " bg-gray-200 overflow-y-scroll hide-scroll"

    let insideDivClassList = props.favoriteVisible? "grid-cols-3" : "grid-cols-4"
    insideDivClassList += " grid gap-4 grid-rows-2 mt-4 mx-4"

    return (
        <div className={outsideDivClassList}>
            <h2 className="m-4 font-bold mb-4">Movies</h2>
            <div className={insideDivClassList}>
                {props.movies.map((movie, index) => 
                    <Link to={`/detail/${movie.id}`}
                        state={{
                            movie: movie,
                            index: index,
                        }}>
                        <Movie
                            key={movie.id}
                            index={index}
                            movie={movie}
                            broken_image={broken_image}
                            handleImageError={handleImageError}
                            setMovies={props.setMovies}
                            setFavorite={setFavorite}
                            />
                    </Link>
                )}
            </div>
        </div>
    );
}
