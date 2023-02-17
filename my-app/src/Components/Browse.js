import Filter from "./Filter"
import MovieList from "./MovieList";
export default function Browse(){

    return(
        <div className="flex flex-row h-screen">
        <Filter/>
        <MovieList/>
        </div>
    );
}