import tvLogo from "./Images/television.png"

export default function Header() {
    return (
        <nav className="flex items-center justify-between bg-grey">
            <div className="flex items-center">
            <img className="h-20 px-8 py-2 hover:cursor-pointer inline"src= {tvLogo} alt="logo" />
            </div>
            <div >
            <button className="bg-gray-600 w-20 text-white text-[10px] font-semibold py-2 px-2 mr-10  rounded-lg hover:bg-gray-700">About Us</button>
            </div>    
        </nav> 
    );
}