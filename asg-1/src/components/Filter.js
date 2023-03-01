import {useState} from "react"
export default function Filter(props){
    const [range, setRange]= useState(10)
    const [titleValue, setTitleValue]= useState("")
    const [dateValue, setDateValue] = useState("")

    const [filteredMovies, setFilteredMovies] =useState([])
     const [beforeAfterDatetoggle,setBeforeAfterDateToggle]=useState("Before")
    const [beforeAfterRatingtoggle,setBeforeAfterRatingToggle]=useState("Before")
   
    const disableOtherInput =(e)=>{
        
        const currentTarget = e.target.name
        const inputs = e.target.form.elements
        for (let i = 0; i < inputs.length; i++){
            let input = inputs[i]
            if (input.name !== currentTarget && input.name !=="submit" && input.name !=="clear"){
                input.disabled=true;
                setTitleValue("")
                setDateValue("")
                
                if(currentTarget==="dateOption"||currentTarget==="date"){
                    inputs[2].disabled=false;
                    inputs[3].disabled=false;  
                }else if(currentTarget==="rangeOption"|| currentTarget==="range"){
                    inputs[4].disabled=false;
                    inputs[5].disabled=false;
                }
            }else{
                input.disabled=false;
            }
        }
        
    }
    const dateBeforeAfter=(e)=>{
        setBeforeAfterDateToggle(e.target.value)
    }
    const ratingBeforeAfter=(e)=>{
        setBeforeAfterRatingToggle(e.target.value)
    }
    const handleRange=(e)=>{
        setRange(e.target.value)
        let rangeSorted;
        disableOtherInput(e)
        if(beforeAfterRatingtoggle === "Before"){
            rangeSorted = props.movies.filter((data)=>{
            return data.ratings.average <= e.target.value
        })
        }else{
            rangeSorted = props.movies.filter((data)=>{
                return data.ratings.average >= e.target.value
            })
        }
        console.log("sorted Range",rangeSorted)
        setFilteredMovies(rangeSorted)

    }
    const handleDate=(e)=>{
        console.log(e.target.value)
        setDateValue(e.target.value)
        let dateSorted;
        if(beforeAfterDatetoggle ==="Before"){
             dateSorted = props.movies.filter((data)=>{
            return data.release_date.substring(0,4) <= e.target.value
        })
        }else{
              dateSorted = props.movies.filter((data)=>{
            return data.release_date.substring(0,4) >= e.target.value

        })}
       
        console.log(dateSorted)
        setFilteredMovies(dateSorted)
    }
    const handleSearch =(e)=>{
        let text = e.target.value
        setTitleValue(text)
        console.log("TEXT FILTER:",text)
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
    // const showAll =(e)=>{
    //     e.preventDefault()
    //     console.log("all",props.copyMovies)
    //     try{
    //         console.log("showing all!")
    //         props.onSubmit(props.copyMovies)
    //     }catch(e){
    //         console.log("error",e.message)
    //     }
    // }
    const handleClear=(e)=>{
        console.log("reseted, here is intial movies:",props.initialMovies)
        try{
            console.log("initial movie is submitted!")
            props.setMovies(props.initialMovies)
            
        }catch(e){
            console.log("error",e.message)
        }
        
        setRange(5)
        setBeforeAfterRatingToggle("Before")
        setBeforeAfterDateToggle("Before")
        setTitleValue("")
        setDateValue("")
        
    }

    return(
        <div className="row-span-1 bg-gray-300 p-4">
           
           <form onSubmit={handleSubmit}>
            <h2 className="text-lg font-bold mb-4 mt-2">Filters</h2>
            <h3 className="text-md mb-2">Title</h3>
            <input type="text" name="search" value={titleValue}className="rounded-md w-full p-2 border border-gray-400 drop-shadow-md mb-4" onChange={handleSearch} onClick ={disableOtherInput}/>
            <h3 className="text-md mb-2">Genre</h3>
            <select className="bg-white border border-gray-400 rounded p-2 mb-4 w-full" name ="genre" onChange={handleGenre} onClick ={disableOtherInput}>
                 {props.genreList.map((genre)=>{
                   return <option>{genre}</option>
               })}
            </select>
            <h3 className="text-mb mt-4 mb-2">Release Date</h3>
            <select name ="dateOption" className="bg-white border border-gray-400 rounded p-2 mb-4 w-full" onClick ={disableOtherInput} onChange={dateBeforeAfter}>
                <option>Before</option>
                <option>After</option>
            </select>
            <input type="number" value={dateValue} min="1900" max="2099" step="1" name="date" maxLength = "4" className="bg-white border border-gray-400 rounded p-2 mb-4 w-full" onChange = {handleDate}onClick ={disableOtherInput}/>
            <h3 className="text-md mb-2">Rating({range})</h3>
              <select name ="rangeOption" className="bg-white border border-gray-400 rounded p-2 mb-4 w-full" onClick ={disableOtherInput} onChange={ratingBeforeAfter}>
                <option>Before</option>
                <option>After</option>
            </select>
            <input name="range"type="range" min="0" max="10" className="w-full mb-12" onChange={handleRange}onClick ={disableOtherInput}/>
            <div className="flex justify-center gap-2">
                <input type="submit" value ="Submit" name="submit" className="border p-2 px-4 rounded-md bg-grey text-white cursor-pointer hover:bg-gray-600"></input>
                <input type="reset" name="clear"onClick={handleClear} value="Clear" className="border p-2 px-6 rounded-md bg-grey text-white cursor-pointer hover:bg-gray-600"></input>
                {/* <input type = "submit" name = "showAll" onClick ={showAll} value="Show All" className="border p-2 px-6 rounded-md bg-grey text-white cursor-pointer hover:bg-gray-600"></input> */}
            </div>
            </form>
        </div>
    )
}