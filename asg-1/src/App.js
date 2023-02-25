import Header from './components/Header';
import Home from "./components/Home";
import Browse from "./components/Browse"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import css from "./App.css"

function App() {
    const URL = "https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=50";

    const [movies, setMovies] = useState([]);
    const [searchedMovies,setSearchedMovies]=useState([])
    const [favoriteVisible, setfavoriteVisible] = useState(false);
    const [genre,setGenre]=([])
    const closeFavorite = () => {
      setfavoriteVisible(!favoriteVisible);
    }

    const handleChange= (newVal) =>{
      //console.log("retrieveed from storage")
      console.log("new search",newVal)
      setMovies(newVal)
     // setSearchedMovies (newVal)
    }
   
    

    const handleFavorite = (id) => {
      // updatedFavorite = favorite;
      // // toggle the favorite
      // updatedFavorite[id] = !updatedFavorite[id];
      // setFavorite(updatedFavorite);
    }

    useEffect(() => {
      // if local storage has nothing
      if (localStorage.getItem("movies") == null) {
      // fetch and put data into local storage
          fetch(URL)
              .then((resp) => resp.json())
              .then((data) => {
                  // create an key imageLoaded to indicate if the image is successfully loaded
                  data.forEach(e => e["imageLoaded"] = true);
                  data.forEach(e => e["isFavorited"] = false);
                  localStorage.setItem("movies", JSON.stringify(data));
                  setMovies(JSON.parse(localStorage.getItem("movies")))
              });
      } else {
          setMovies(JSON.parse(localStorage.getItem("movies")))
          
      }
    // dependency array to prevent useEffect gets called every render
    }, []);

    const genreList =()=>{
        const genre=[];
        movies.map((movie)=>{
          if (movie.details.genres != null){
               movie.details.genres.map((data)=>{        
                    const exists = genre.includes(data.name) 
                        if(!exists){
                            genre.push(data.name)
                        }
                    })
                  }      
                })
              return genre;
      } 
    return (
      <div className="App"> 
        <BrowserRouter>
          <Header closeFavorite={closeFavorite}
          setMovies = {setMovies}/>
          <Routes>
            <Route path="/" element={<Home
              closeFavorite={closeFavorite}
              favoriteVisible={favoriteVisible}
              movies={movies}
              onClick={handleChange}
              />} />
            <Route path="/search" element={<Browse 
                closeFavorite={closeFavorite}
                favoriteVisible={favoriteVisible}
                handleFavorite={handleFavorite}
                setMovies={setMovies}
                movies={movies}
                genreList = {genreList()}
                
                />} />
            <Route path="/browse"
              element={<Browse
                closeFavorite={closeFavorite}
                favoriteVisible={favoriteVisible}
                handleFavorite={handleFavorite}
                setMovies={setMovies}
                movies={movies}
                genreList = {genreList()}
                />} />
          </Routes>
      </BrowserRouter>
      </div>
    );
}

export default App;