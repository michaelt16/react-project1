import Header from './Header';
import Home from "./Home";
import Browse from "./Browse"


import { BrowserRouter, Routes, Route } from "react-router-dom";
import css from "../App.css"
function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Browse/>} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </BrowserRouter>
      
      
    </div>
  );
}

export default App;
