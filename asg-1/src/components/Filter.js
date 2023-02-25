import {useState} from "react"
export default function Filter(props){

    const [range, setRange]= useState(10)
    
    //const [titleFilter, setTitleFilter]= useState("")
    const [filteredMovies, setFilteredMovies] =useState([])
    const handleSearch =(e)=>{
        let text = e.target.value
        console.log("TEXT FILTER:",text)
        //setTitleFilter(text)
      
        let searched= props.movies.filter((data)=>{
            return data.title.toLowerCase().includes(text.toLowerCase())
        })
        console.log("searcbed",searched)
        setFilteredMovies(searched)
    }

    const handleGenre = (e)=>{
        console.log(e.target.value)
        const searchedVal = e.target.value.toLowerCase()
        let filteredMovies = props.movies.filter((movie)=>{
            //so what this does is if its null it will evaluate to an empty array
            const genres = movie.details.genres || []
            for (let i = 0; i < genres.length;i++){
                if (genres[i].name.toLowerCase()===searchedVal)    {
                    return true;
                }
            }
            return false;
            //can also use this neat function 
           // return genres.some((genre)=>genre.name.toLowerCase()===searchedVal)
        })
        console.log(filteredMovies)
        setFilteredMovies(filteredMovies)
    }
    const handleSubmit =(e)=>{
        e.preventDefault()  
        console.log("test2",e.target.value) 
        console.log("filter",filteredMovies)
            // props.onSubmit(props.oldMovies)
        try{
            console.log("submitted!")
            props.onSubmit(filteredMovies)
       
        }catch(e){
            console.log("error",e.message)
        }
            
    }
    const handleClear=(e)=>{
        console.log("reseted, here is intial movies:",props.initialMovies)
        props.setMovies(props.initialMovies)
        setRange(5)
        
        
    }

    return(
        <div className="w-1/4 bg-gray-300 p-4">
            
            <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4 mt-2">Filters</h2>
            <h3 className="text-md mb-2">Title</h3>
            <input type="text" className="rounded-md w-full p-2 border border-gray-400 drop-shadow-md mb-4" onChange={handleSearch}/>
            <h3 className="text-md mb-2">Genre</h3>
            <select className="bg-white border border-gray-400 rounded p-2 mb-4 w-full" onChange={handleGenre}>
                {/* later were gonna loop through the genre that randy has */}
            
               {props.genreList.map((genre)=>{
                   return <option>{genre}</option>
               })}

            </select>
            <h3 className="text-mb mt-4 mb-2">Release Date</h3>
            <select className="bg-white border border-gray-400 rounded p-2 mb-4 w-full">
                <option>Before</option>
                <option>After</option>
                <option>Between</option>
            </select>
            <input type="date" className="bg-white border border-gray-400 rounded p-2 mb-4 w-full" />
            <h3 className="text-md mb-2">Rating ({range})</h3>
           
            <input type="range" min="0" max="10" className="w-full mb-12" onChange={(e)=>setRange(e.target.value)} />
            
            <div className="flex justify-center">
                <input type="submit" value ="Submit" name="submit" className="border p-4 px-8 rounded-md bg-grey text-white cursor-pointer hover:bg-gray-600 mr-2" ></input>
                <input type="reset" onClick={handleClear}value="Clear"  className="border p-4 px-10 rounded-md bg-grey text-white cursor-pointer hover:bg-gray-600 ml-2"></input>
            </div>
            </form>
        </div>
    )
}