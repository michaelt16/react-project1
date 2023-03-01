import Header from './components/Header';
import Home from "./components/Home";
import Browse from "./components/Browse";
import Detail from "./components/Detail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import css from "./App.css";

function App() {
    const [movies, setMovies] = useState([]);
    const [favoriteVisible, setfavoriteVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    // a back up movie list specially used for favorite function
    // we can implement favorite on state
    // but we want favorite remains even after refresh
    const [copyMovies, setCopyMovies] = useState([])
    const URL = "https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=200";


    const closeFavorite = () => {
      setfavoriteVisible(!favoriteVisible);
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
        }
        return m;
      });
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

    useEffect(() => {
        // if local storage has nothing
        if (localStorage.getItem("movies") == null) {
        // fetch and put data into local storage
            fetch(URL)
                .then((resp) => resp.json())
                .then((data) => {
                    setLoading(true);
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
                    // to demo the loading animation, make it last for 1.5 seconds
                    setTimeout(() => {
                      setLoading(false);
                    }, 1500);
                });  
        // in case the local storage already have something     
        } else {
            setLoading(true);
            setMovies(JSON.parse(localStorage.getItem("movies")))
            setCopyMovies(JSON.parse(localStorage.getItem("movies")))
            setTimeout(() => {
              setLoading(false);
            }, 1500);
        }

        return () => {
            // component will unmount
            
        }
      // dependency array to prevent useEffect gets called every render
      }, []);

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
              setCopyMovies={setCopyMovies} />}
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
                genreList={genreList()}
                loading={loading}
                setLoading={setLoading}
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
