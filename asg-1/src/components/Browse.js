import Favorite from "./Favorite";
import Filter from "./Filter"
import MovieList from "./MovieList";

export default function Browse(props){

    return(
        <div className="grid grid-cols-5 h-screen">
            <Filter/>
            <MovieList
                movies={props.movies}
                setMovies={props.setMovies}
                favoriteVisible={props.favoriteVisible}
                setFavorite={props.setFavorite}
                handleImageError={props.handleImageError}
                />

            {props.favoriteVisible && 
                <Favorite
                    movies={props.movies}
                    setMovies={props.setMovies}
                    closeFavorite={props.closeFavorite}/>}
            
        </div>
    );
}