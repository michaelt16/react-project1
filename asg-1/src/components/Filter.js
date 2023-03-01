import {useState} from "react"
export default function Filter(props){
    const [range, setRange] = useState("")
    const [titleValue, setTitleValue] = useState("")
    const [dateValue, setDateValue] = useState("")
    const [genre, setGenre] = useState("")

    const [filteredMovies, setFilteredMovies] = useState([])
    const [beforeAfterDateToggle, setBeforeAfterDateToggle] = useState("Before")
    const [beforeAfterRatingToggle, setBeforeAfterRatingToggle] = useState("Before")
   
    const disableOtherInput = (e) => {
        const currentTarget = e.target.name;
        // get an collection of all inputs, textarea, button, etc
        // const inputs = e.target.form.elements;
        // store the value of the target in a temp variable
        const temp = e.target.value;

        // disable everything
        setTitleValue("")
        setDateValue("")
        setGenre("")
        setRange("")

        // put the value back to where it belongs
        if (currentTarget == "search") {
            setTitleValue(temp)
        } else if (currentTarget == "genre") {
            setGenre(temp)
        } else if (currentTarget == "dateOption") {
            setDateValue(temp)
        } else if (currentTarget == "range") {
            setRange(temp)
        }
    }

    const dateBeforeAfter = (e) => {
        setBeforeAfterDateToggle(e.target.value)
    }

    const ratingBeforeAfter = (e) => {
        setBeforeAfterRatingToggle(e.target.value)
    }

    const handleSearch = (e) => {
        setTitleValue(e.target.value)
    }
    
    const handleGenre = (e) => {
        setGenre(e.target.value)
    }

    const handleDate = (e) => {
        setDateValue(e.target.value)
    }

    const handleRange = (e) => {
        setRange(e.target.value);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        let results;
        // handle title search
        if (titleValue != "") {
            // change the search result with every key stroke
            results = props.copyMovies.filter(data => data.title.toLowerCase().includes(titleValue.toLowerCase()))
        }
        // handle title search
        if (titleValue != "") {
            results = props.copyMovies.filter(movie=> movie.title.toLowerCase().includes(titleValue.toLowerCase()))
        }
        // handle genre
        if (genre != "") {
            results = props.copyMovies.filter(movie => movie.details.genres.some(g => g.name === genre))
        }
        // handle date
        if (dateValue != "") {
            if (beforeAfterDateToggle === "Before") {
                results = props.copyMovies.filter(data => data.release_date.substring(0,4) <= dateValue)
            } else {
                results = props.copyMovies.filter(data => data.release_date.substring(0,4) >= dateValue)
            }
        }
        if (range != "") {
            if(beforeAfterRatingToggle === "Before"){
                results = props.copyMovies.filter(data => data.ratings.average <= range)
            } else {
                results = props.copyMovies.filter(data => data.ratings.average >= range)
            }
        }
        if (results == undefined) {
            props.setMovies(props.copyMovies);
        } else {
            props.setMovies(results);
        }
    }

    const showAll = (e) =>{
        props.setMovies(props.copyMovies);
        handleClear();
    }

    const handleClear= () => {
        setBeforeAfterRatingToggle("Before");
        setBeforeAfterDateToggle("Before");
        setTitleValue("");
        setGenre("");
        setDateValue("");
        setRange("");
    }

    return(
        <div className="row-span-1 bg-gray-300 p-4">
            <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold mb-4 mt-2">Filters</h2>
                {/* title search field */}
                <h3 className="text-md mb-2">Title</h3>
                <input type="text"
                    name="search"
                    value={titleValue}
                    className="rounded-md w-full p-2 border border-gray-400 drop-shadow-md mb-4"
                    onChange={handleSearch}
                    onClick={disableOtherInput}/>
                    
                {/* genre field */}
                <h3 className="text-md mb-2">Genre</h3>
                <select
                    value={genre}
                    className="bg-white border border-gray-400 rounded p-2 mb-4 w-full"
                    name="genre"
                    onChange={handleGenre}
                    onClick ={disableOtherInput}>
                        {props.genreList.map((genre)=>{
                        return <option>{genre}</option>
                    })}
                </select>

                {/* date field */}
                <h3 className="text-mb mt-4 mb-2">Release Date</h3>
                <select
                    name="dateOption"
                    className="bg-white border border-gray-400 rounded p-2 mb-4 w-full"
                    onClick ={disableOtherInput}
                    onChange={dateBeforeAfter}>
                    <option>Before</option>
                    <option>After</option>
                </select>
                <input
                    type="number"
                    value={dateValue}
                    min="1900"
                    max="2099"
                    step="1"
                    name="date"
                    maxLength="4"
                    className="bg-white border border-gray-400 rounded p-2 mb-4 w-full"
                    onChange={handleDate}
                    onClick={disableOtherInput}/>
                
                {/* rating field */}
                <h3 className="text-md mb-2">Rating</h3>
                    <select
                        name="rangeOption"
                        className="bg-white border border-gray-400 rounded p-2 mb-4 w-full"
                        onClick={disableOtherInput}
                        onChange={ratingBeforeAfter}>
                        <option>Before</option>
                        <option>After</option>
                    </select>
                <div className="flex gap-2">
                    <input
                        name="range"
                        type="range"
                        min="0"
                        max="10"
                        className="w-full mb-12 mt-1"
                        onChange={handleRange}
                        value={range}
                        onClick={disableOtherInput} />
                    {range}
                </div>

                {/* buttons */}
                <div className="flex justify-center gap-2">
                    <input type="submit" value ="Submit" name="submit" className="border p-2 px-4 rounded-md bg-grey text-white cursor-pointer hover:bg-gray-600"></input>
                    <input type="reset" value="Clear" name="clear" onClick={handleClear} className="border p-2 px-6 rounded-md bg-grey text-white cursor-pointer hover:bg-gray-600"></input>
                    <input type="reset" value="Reset" name="reset" onClick={showAll} className="border p-2 px-6 rounded-md bg-red-700 text-white cursor-pointer hover:bg-red-900"></input>
                </div>
            </form>
        </div>
    )
}