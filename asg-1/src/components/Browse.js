import Favorite from "./Favorite";
import Filter from "./Filter"
import MovieList from "./MovieList";
export default function Browse(){

    return(
        <div className="flex h-screen">
            <Filter/>
            <MovieList/>
            <Favorite/>
        </div>
    );
}