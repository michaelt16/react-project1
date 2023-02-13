import Header from './Header';
import Home from "./Home";

import Browse from "./Browse"
import css from "../App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
 
  return (
    
    <div className="App">
      <Header/>
      <Home/>
      
     
    </div>
  );
}

export default App;
