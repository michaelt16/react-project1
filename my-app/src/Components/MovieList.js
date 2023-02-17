import { useEffect, useState } from "react"

export default function MovieList(){

    const [movies, setMovies] = useState([])
    
    useEffect(()=>{
        if (movies.length > 0){
            const temp = localStorage.getItem("key")
            
        }else{
            fetch("https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=11")
            .then(resp=>resp.json())
            .then(data=>{setMovies(data) 
                return data
            }).then((data)=>{
                localStorage.setItem("key", JSON.stringify(data))
            })
        }
    })
    return(
        
        <div className="w-3/4 p-4 bg-gray-200">
            <h2 className="m-4 font-bold mb-4">Movies</h2>
            <div className="grid grid-cols-6 gap-4 grid-rows-2 mt-6 mx-4">
            {movies.map((movie)=>{
                
                return(<div className="border  mb-2 rounded-xl shadow relative bg-gray-100 cursor-pointer">
                <img src={`https://www.themoviedb.org/t/p/w342${movie.poster}`} className="rounded mb-2"></img>
                <h3 className="font-bold px-3 py-2 mb-2 overflow-hidden">{movie.title} ({movie.release_date.substring(0,4)})</h3>
                <div className="absolute bg-indigo-400 mb-2 text-white rounded-full bottom-16 right-0 text-center w-10 h-10 flex items-center justify-center">
                <span className="font-bold ">{movie.ratings.average}</span>
                </div>
            </div>)
                
             
            })}
                
            
                    
            </div>
        </div>
    )
}