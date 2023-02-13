
import  { useEffect, useState } from "react";

export default function useDatabase(){

    const[movie,setMovies] = useState([])

    useEffect(()=>{
        async function getData(){
            const resp = await fetch("https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=10")
            const data = await resp.json()
            setMovies(data)

        }
        getData()

    }, [])
    console.log(movie)
   return movie

}