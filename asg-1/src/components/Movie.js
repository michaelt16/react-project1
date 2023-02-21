export default function Movie(props) {
    const movie = props.movie;
    const index = props.index;

    // this method replaces icon with error image
    const imageHandler = (e) => {
        props.handleImageError(e);
    };

    const handleFavorite = (id) => {
    // handle favorite button click here
    };

    const broken_image = require("../img/broken_image.png");

    return (
        <div className="border mb-2 rounded-xl shadow bg-gray-100 cursor-pointer" key={index}>
            <div className="relative">
                {/* poster */}
                {movie.imageLoaded && (
                    <img
                        src={`https://www.themoviedb.org/t/p/w342${movie.poster}`}
                        className="rounded object-fill w-full h-80"
                        onError={imageHandler}
                        id={index}
                    />
                )}
                {/* fallback image */}
                {!movie.imageLoaded && (
                    <img
                        src={broken_image}
                        className="rounded object-fill w-full h-80"
                    />
                )}

                {/* the rating button is absolute to its parent */}
                <div className="absolute bottom-0 right-0 mb-2 mr-2">
                    <div className="bg-indigo-400 text-white rounded-full w-10 h-10 flex items-center justify-center relative">
                        <span className="font-bold right-1 bottom-1">{movie.ratings.average}</span>
                    </div>
                </div>
            </div>
            <button
                className="absolute top-0 right-0 bg-opacity-10 text-white rounded-full w-10 h-10 flex items-center justify-center"
                onClick={() => handleFavorite(movie.id)}>
                🖤
            </button>
            <h3 className="font-bold px-3 py-2 mb-2 overflow-hidden">
                {movie.title} ({movie.release_date.substring(0, 4)})
            </h3>
            
        </div>
    );
}