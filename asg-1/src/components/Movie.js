import { Link } from "react-router-dom";
import 'flowbite';

export default function Movie(props) {
    const movie = props.movie;
    const index = props.index;

    // this method replaces icon with error image
    const imageHandler = (e) => {
        props.handleImageError(e);
    };

    const favoriteHandler = (id) => {
        props.setFavorite(id);
    };      

    // concat the title with the year
    const titleText = `${movie.title} (${movie.release_date.substring(0, 4)})`

    let isFavorited;
    
    // retrieve the favorite status of the movie
    for (let m of props.copyMovies) {
        if (m.id == movie.id) {
            isFavorited = m.isFavorited;
        }
    }
    const favoriteIcon = isFavorited? "💙" : "🤍";

    return (
        <div
            className="border rounded-xl shadow bg-gray-100 grid grid-rows-5"
            title={titleText}
            key={movie.id}>

            {/* the poster portion */}
            <div className="relative row-span-4">
                <Link to={`/detail/${movie.id}`}>
                    {/* poster image */}
                    {movie.imageLoaded && (
                        <img
                            src={`https://www.themoviedb.org/t/p/w342${movie.poster}`}
                            className="rounded object-fill w-full h-full cursor-pointer"
                            onError={imageHandler}
                            id={movie.id}
                        />
                    )}
                    {/* fallback image */}
                    {!movie.imageLoaded && (
                        <img
                            src={props.broken_image}
                            className="rounded object-cover w-full h-full"
                        />
                    )}
                </Link>
                {/* the rating button is absolute to its parent */}
                <div className="absolute bottom-0 right-0 mb-1 mr-1">
                    <div className="bg-indigo-400 text-white text-md rounded-full w-8 h-8 mb-2 mr-2 flex items-center justify-center">
                        <span className="font-bold right-1 bottom-1">{movie.ratings.average}</span>
                    </div>
                </div>
            </div>

            {/* the title portion */}
            <div className="relative row-span-1 grid grid-rows-2 grid-cols-5">
                <h3 className="col-span-4 row-span-2 font-bold px-4 py-4 text-md overflow-hidden truncate ...">
                    {movie.title} ({movie.release_date.substring(0, 4)})
                </h3>
                
                {/* favorite button */}
                <div className="row-span-2 grid">
                    <button
                        type="button"
                        className="relative text-2xl items-center justify-center"
                        onClick={() => favoriteHandler(movie.id)}
                        title={props.copyMovies[index].isFavorited? "Remove from Favorite" : "Add to Favorite"}>
                        {favoriteIcon}
                    </button>
                </div>
            </div>

        </div>
    );
}