import tvLogo from "./Images/television.png"

export default function Header() {
    return (
        <nav className="flex items-center justify-between bg-grey">
            <div className="flex items-center">
            <img className="h-20 px-8 py-2 hover:cursor-pointer inline"src= {tvLogo} />
            </div>
            <div className="">
            <button className="bg-gray-500 w-20 text-white text-[10px] font-semibold py-2 px-2 mr-10 border border-gray-500 hover:border-transparent rounded">About Us</button>
            </div>    
        </nav>
       
          
    );
}