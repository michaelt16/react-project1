import Movie from "./Movie";
import { Link } from "react-router-dom";

export default function MovieList(props) {

    const close = () => <Link to="/browse"></Link>

    const broken_image = require("../img/broken_image.png");

    let outsideDivClassList = props.favoriteVisible? "col-span-3" : "col-span-4"
    outsideDivClassList += " bg-gray-200 overflow-y-scroll hide-scroll"

    let insideDivClassList = props.favoriteVisible? "grid-cols-3" : "grid-cols-4"
    insideDivClassList += " grid gap-4 grid-rows-2 mt-4 mx-4"

    return (
        <div className={outsideDivClassList}>
            <h2 className="m-4 font-bold mb-4">Movies</h2>
            <div className={insideDivClassList}>
                {props.movies.map((movie, index) =>
                    <Movie
                        key={movie.id}
                        index={index}
                        movie={movie}
                        broken_image={broken_image}
                        handleImageError={props.handleImageError}
                        setMovies={props.setMovies}
                        setFavorite={props.setFavorite}
                        />
                )}
            </div>
        </div>
    );
}
