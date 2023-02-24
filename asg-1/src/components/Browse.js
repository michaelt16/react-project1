import Favorite from "./Favorite";
import Filter from "./Filter"
import MovieList from "./MovieList";

export default function Browse(props){


    return(
        <div className="flex h-screen">
            <Filter/>
            <MovieList
                movies={props.movies}
                setMovies={props.setMovies}
                favoriteVisible={props.favoriteVisible}
                setFavorite={props.setFavorite}
                />

            {props.favoriteVisible && 
                <Favorite
                    movies={props.movies}
                    setMovies={props.setMovies}
                    closeFavorite={props.closeFavorite}/>}
            
        </div>
    );
}