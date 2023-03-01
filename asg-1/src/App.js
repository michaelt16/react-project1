import Header from './components/Header';
import Home from "./components/Home";
import Browse from "./components/Browse";
import Detail from "./components/Detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import css from "./App.css";

function App() {
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

    // replace icon with error image
    const handleImageError = (e) => {
      let updatedMovies = copyMovies.map(m => {
        if (m.id == e.target.id) {
          m.imageLoaded = false;
          console.log("CONDIT" + m.id);
        }
        return m;
      });
      console.log(e.target.id);
      localStorage.setItem("movies", JSON.stringify(updatedMovies));
      setCopyMovies(updatedMovies);
    };

    const genreList =()=>{
      const genre=[];
      genre.push("")
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