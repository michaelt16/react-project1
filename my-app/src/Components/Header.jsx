import tvLogo from "./Images/television.png"

export default function Header() {
    return (
        <div className="text-3xl font-bold underline">
            <img src= {tvLogo} width ={"60"} height={"60"}/>
        </div>
    );
}