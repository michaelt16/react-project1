export default function Favorite(props) {
    // filter the favorite movies
    const filteredMovies = props.movies.filter(e => e.isFavorited);

    const imageHandler = (e) => {
        
    };

    const removeFavorite = (id) => {
        const updatedMovies = props.movies.map(movie => {
            if (movie.id === id) {
              movie.isFavorited = false;
            }
            return movie;
        });
        // update local storage so that the favorite remains
        localStorage.setItem("movies", JSON.stringify(updatedMovies))
        props.setMovies(updatedMovies)
    }

    const broken_image = require("../img/broken_image.png");
    
    return (
        <div className="w-1/4 bg-gray-300 p-4 overflow-y-scroll hide-scroll">
            <div className="justify-between flex">
                <div className="text-lg font-bold mb-4 mt-2">Favorite</div>
                <div
                    className="text-lg font-bold mb-4 mt-2 justify-end cursor-pointer"
                    onClick={props.closeFavorite}>X</div>
            </div>

            {filteredMovies.map(movie => {
                return(
                    <div
                        className="grid gap-4 grid-cols-6 mb-4"
                        key={movie.id}>
                        <div className="relative col-span-2">
                            {/* poster image */}
                            {movie.imageLoaded && (
                                <img
                                    src={`https://www.themoviedb.org/t/p/w154${movie.poster}`}
                                    className="rounded object-cover w-full cursor-pointer"
                                    onError={imageHandler}
                                    id={movie.id}
                                    alt={movie.title}
                                    title={movie.title}
                                />
                            )}
                            {/* fallback image */}
                            {!movie.imageLoaded && (
                                <img
                                    src={broken_image}
                                    className="rounded object-cover w-full cursor-pointer"
                                    id={movie.id}
                                    alt={movie.title}
                                    title={movie.title}
                                />
                            )}
                            {/* overlay div */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100">
                                <button
                                    className="text-white text-sm bg-red-500 rounded-full w-5 h-5 items-center justify-center absolute top-0 right-0 mt-1 mr-1"
                                    onClick={() => removeFavorite(movie.id)}>
                                X
                                </button>
                            </div>
                        </div>
                        
                        
                        {/* movie info */}
                        <div className="font-bold col-span-4">
                        {`${movie.title} (${movie.runtime} mins)`}
                        </div>
                        
                        
                    </div>
                )
            })}

            <div>
            
            </div>
        </div>

        
    );
}
