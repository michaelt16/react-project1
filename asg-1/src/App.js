import Header from './components/Header';
import Home from "./components/Home";
import Browse from "./components/Browse"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import css from "./App.css"

function App() {

    const [favoriteVisiable, setfavoriteVisiable] = useState(true);
    const closeFavorite = () => {
        setfavoriteVisiable(!favoriteVisiable);
    }

    return (
      <div className="App">
        <BrowserRouter>
          <Header closeFavorite={closeFavorite}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Browse />} />
            <Route path="/browse" element={<Browse closeFavorite={closeFavorite} favoriteVisiable={favoriteVisiable}/>} />
          </Routes>
      </BrowserRouter>
      </div>
    );
}

export default App;