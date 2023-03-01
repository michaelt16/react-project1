import tvLogo from "../img/television.png"
import {useNavigate,Router} from "react-router-dom"
import Modal from "react-modal"
import {useState}from "react"

export default function Header(props) {
    const navigate = useNavigate();
    function handleClick(){
        navigate("/")
        const getLocal = JSON.parse(localStorage.getItem("movies"))
        console.log("retrieved",getLocal)
        props.setMovies(getLocal)
        // console.log("testsetsets",props.copyMovies)
        // props.setMovies(props.copyMovies)
    }
    const [open,setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <nav className="flex items-center justify-between bg-grey">
            <div className="flex items-center">
                
            <img className="h-20 px-8 py-2 hover:cursor-pointer inline"
                src= {tvLogo}
                alt="logo"
                onClick={handleClick} />
            </div>

            <div>

                {console.log(open)}
                <button className="bg-gray-600 w-20 text-white font-semibold py-2 px-2 mr-10 rounded-lg hover:bg-gray-700" onClick={handleOpen}>
                    About
                </button>
                <Modal isOpen={open} onRequestClose={handleClose} style={{overlay: {backgroundColor: 'rgba(0, 0, 0, 0.75)'}, content: {width: '50%', height: 'fit-content', margin: 'auto', borderRadius: '10px', boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)', padding: '20px'}}}>

                <div className="bg-white rounded-lg p-4 flex flex-col">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">About</h2>
                 <p className="py-2 text-gray-700">This is a COMP 4513 Assignment, created by <a href="https://github.com/michaelt16" className="text-blue-500 hover:underline">Michael Tandyo</a> and <a href="https://github.com/tsangkafu" className="text-blue-500 hover:underline">Sam Tang</a>.</p>
                 <p className="py-2 text-gray-700"><b>Technologies used:</b> React.js, Tailwind CSS, FontAwesomeIcon, Netlify</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded" onClick={handleClose}>Close</button>
                </div>
  
                </Modal>

                <button className="bg-gray-600 w-20 text-white font-semibold py-2 px-2 mr-10 rounded-lg hover:bg-gray-700"
                    onClick={props.closeFavorite}>
                    Favorite
                </button>
            </div>    
        </nav> 
    );
}