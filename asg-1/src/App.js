import Header from './components/Header';
import Home from "./components/Home";
import Browse from "./components/Browse"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import css from "./App.css"

function App() {
    const URL = "https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=30";

    const [movies, setMovies] = useState([]);
    const [favoriteVisiable, setFavoriteVisiable] = useState(true);

    const closeFavorite = () => {
      setFavoriteVisiable(!favoriteVisiable);
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

    return (
      <div className="App">
        <BrowserRouter>
          <Header closeFavorite={closeFavorite}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Browse />} />
            <Route path="/browse"
              element={<Browse
                closeFavorite={closeFavorite}
                favoriteVisiable={favoriteVisiable}
                handleFavorite={handleFavorite}
                setMovies={setMovies}
                movies={movies}
                />} />
          </Routes>
      </BrowserRouter>
      </div>
    );
}

export default App;