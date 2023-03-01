import Header from './components/Header';
import Home from "./components/Home";
import Browse from "./components/Browse";
import Detail from "./components/Detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import css from "./App.css";

function App() {
    const URL = "https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=30";
    
    const [movies, setMovies] = useState([]);
    const [favoriteVisible, setfavoriteVisible] = useState(false);
    // a back up movie list specially used for favorite function
    // we can implement favorite on state
    // but we want favorite remains even after refresh
    const [copyMovies, setCopyMovies] = useState([])
    const [searchedMovies,setSearchedMovies] = useState([])
    const closeFavorite = () => {
      setfavoriteVisible(!favoriteVisible);
    }
    
    const handleChange= (newVal) =>{
      //console.log("retrieveed from storage")
      console.log("new search", newVal)
      setMovies(newVal)
     // setSearchedMovies (newVal)
    }
    const setFavorite = (id) => {
      const updatedMovies = [...copyMovies];
      // switch isFavorited boolean
      for (let movie of updatedMovies) {
        if (movie.id == id) {
          movie.isFavorited = !movie.isFavorited;
        }
      }
      setCopyMovies(updatedMovies)
      // update local storage so that the favorite remains
      localStorage.setItem("movies", JSON.stringify(updatedMovies))
    }

    // this method replaces icon with error image
    const handleImageError = (e) => {
      // copy the movies
      const updatedMovies = [...movies];
      updatedMovies[e.target.id].imageLoaded = false;
      localStorage.setItem("movies", JSON.stringify(updatedMovies))
      setMovies(updatedMovies);
    };

    useEffect(() => {
      // if local storage has nothing
      if (localStorage.getItem("movies") == null) {
      // fetch and put data into local storage
          fetch(URL)
              .then((resp) => resp.json())
              .then((data) => {
                  // sorting by title
                  data.sort((a, b) => {
                    return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
                  });
                  // create an key imageLoaded to indicate if the image is successfully loaded
                  data.forEach(e => e["imageLoaded"] = true);
                  data.forEach(e => e["isFavorited"] = false);
                  data.forEach(e => e["isRated"] = false);
                  data.forEach(e => e["userRating"] = null);
                  localStorage.setItem("movies", JSON.stringify(data));
                  setMovies(JSON.parse(localStorage.getItem("movies")))
                  // create a backup
                  setCopyMovies(JSON.parse(localStorage.getItem("movies")))
              });       
      } else {
          setMovies(JSON.parse(localStorage.getItem("movies")))
          setCopyMovies(JSON.parse(localStorage.getItem("movies")))
      }
    // dependency array to prevent useEffect gets called every render
    }, []);
    const genreList =()=>{
        const genre=[];
        copyMovies.map((movie)=>{
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
          setMovies = {setMovies}
          copyMovies={copyMovies}/>

          <Routes>
            <Route path="/" element={<Home
              closeFavorite={closeFavorite}
              favoriteVisible={favoriteVisible}
              setMovies={setMovies}
              movies={movies}
              copyMovies={copyMovies}
              setCopyMovies={setCopyMovies}
              onClick={handleChange} />}
            />

            <Route path="/search" element={<Browse 
              closeFavorite={closeFavorite}
                favoriteVisible={favoriteVisible}
                setFavorite={setFavorite}
                setMovies={setMovies}
                movies={movies}
                copyMovies={copyMovies}
                setCopyMovies={setCopyMovies}
                genreList = {genreList()} />}
            />

            <Route path="/browse"
              element={<Browse
                closeFavorite={closeFavorite}
                favoriteVisible={favoriteVisible}
                setFavorite={setFavorite}
                setMovies={setMovies}
                movies={movies}
                copyMovies={copyMovies}
                setCopyMovies={setCopyMovies}
                handleImageError={handleImageError}
                genreList = {genreList()}
                />}
            />

            <Route path="/detail/:id" element={<Detail
                setMovies={setMovies}
                movies={movies}
                copyMovies={copyMovies}
                setCopyMovies={setCopyMovies}
                setFavorite={setFavorite}
                favoriteVisible={favoriteVisible} />}
            />

          </Routes>
      </BrowserRouter>
      </div>
    );
}

export default App;