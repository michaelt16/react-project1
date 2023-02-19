import Header from './components/Header';
import Home from "./components/Home";
import Browse from "./components/Browse"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import css from "./App.css"

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Header/>
     
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