import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Browse from "./Browse"
import Favorite from "./Favorite";

export default function Home(props){
    return(
        <div className="bg-cover bg-center flex" style={{ backgroundImage: "url(https://via.placeholder.com/1920x1080)", height: "100vh" }}>
            <div className=" mx-auto py-60 w-3/4">
                 <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
                 <input className="my-4 w-full p-4 rounded-lg " type="text" placeholder="Search Movies..." />
                    <button className="w-40 p-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 mx-4">
                    <Link to="/search">Search</Link>
                    </button>
                    <button className= "w-60 p-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 ">
                    <Link to="/browse">Browse All Movies</Link>
                    </button>
                 </div>
            </div>
            {props.favoriteVisiable && 
                        <Favorite
                            movies={props.movies}
                            closeFavorite={props.closeFavorite} />}
        </div>
    )
    
}