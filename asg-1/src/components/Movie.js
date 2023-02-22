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
    const title_text = `${movie.title} (${movie.release_date.substring(0, 4)})`

    return (
        <div
            className="border rounded-xl shadow bg-gray-100"
            title={title_text}
            key={index}>
            {/* the poster portion */}
            <div className="relative">
                {/* poster image */}
                {movie.imageLoaded && (
                    <img
                        src={`https://www.themoviedb.org/t/p/w342${movie.poster}`}
                        className="rounded object-fill w-full h-full cursor-pointer"
                        onError={imageHandler}
                        id={index}
                    />
                )}
                {/* fallback image */}
                {!movie.imageLoaded && (
                    <img
                        src={broken_image}
                        className="rounded object-fill w-full h-full"
                    />
                )}
                {/* the rating button is absolute to its parent */}
                <div className="absolute bottom-0 right-0 mb-1 mr-1 ">
                    <div className="bg-indigo-400 text-white rounded-full w-8 h-8 flex items-center justify-center">
                        <span className="font-bold right-1 bottom-1">{movie.ratings.average}</span>
                    </div>
                </div>
            </div>
            

            <div className="relative">
                <h3 className="font-bold px-4 py-2 overflow-hidden truncate ...">
                    {movie.title} ({movie.release_date.substring(0, 4)})
                </h3>

                <div className="grid grid-cols-5">
                    <button
                        className="relative col-start-3 text-4xl bottom-2 items-center justify-center"
                        onClick={() => handleFavorite(movie.id)}
                        title="Add to Favorite">
                        ♡
                    </button>
                </div>
            </div>
        </div>
    );
}