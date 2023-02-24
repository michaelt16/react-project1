import tvLogo from "../img/television.png"
import {useNavigate,Router} from "react-router-dom"

export default function Header(props) {
    const navigate = useNavigate();
    function handleClick(){
        navigate("/")
    }
    return (
        <nav className="flex items-center justify-between bg-grey">
            <div className="flex items-center">
                
            <img className="h-20 px-8 py-2 hover:cursor-pointer inline"
                src= {tvLogo}
                alt="logo"
                onClick={handleClick} />
            </div>

            <div>
                <button className="bg-gray-600 w-20 text-white font-semibold py-2 px-2 mr-10 rounded-lg hover:bg-gray-700">
                    About
                </button>
                <button className="bg-gray-600 w-20 text-white font-semibold py-2 px-2 mr-10 rounded-lg hover:bg-gray-700"
                    onClick={props.closeFavorite}>
                    Favorite
                </button>
            </div>    
        </nav> 
    );
}