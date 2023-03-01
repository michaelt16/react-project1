import { Link } from "react-router-dom";
import Favorite from "./Favorite";
import background from "../img/background.jpg";
import { useState } from "react";

export default function Home(props){
    const [searchInput,setSearchInput]= useState ("")

   function handleChange (e) {
       e.preventDefault()
       setSearchInput(e.target.value)
       console.log(e.target.value)
   }
   function handleSubmit(e){
       console.log(searchInput)
       let searched = [...props.movies].filter((data)=>{
           return data.title.toLowerCase().match(searchInput.toLowerCase())
       })
       props.onClick(searched)
   }

    return(
        <div className="grid grid-cols-5 bg-cover bg-center" style={{ backgroundImage: `url(${background})`, height: "100vh" }}>
            <div className={`py-60 col-span-4`}>
                 <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
                    <input onChange = {handleChange} className="my-4 w-full p-4 rounded-lg " type="text" placeholder="Search Movies..." />
                    <button onClick = {handleSubmit} className="w-40 p-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 mx-4">
                    <Link to="/search">Search</Link>
                    </button>
                    <button className= "w-60 p-4 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 ">
                    <Link to="/browse">Browse All Movies</Link>
                    </button>
                 </div>
            </div>
            
            {props.favoriteVisible && 
                        <Favorite
                            movies={props.copyMovies}
                            closeFavorite={props.closeFavorite}
                            setCopyMovies={props.backgroundsetCopyMovies}
                            setMovies={props.setCopyMovies} />}
        </div>
    )
    
}