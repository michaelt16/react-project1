import { useEffect, useState } from "react";
import Movie from "./Movie";

export default function Favorite(props) {
    
    return (
        <div className="w-1/4 bg-gray-300 p-4 overflow-y-scroll hide-scroll flex justify-between">
            <div className="text-lg font-bold mb-4 mt-2">Favorite</div>
            <div
                className="text-lg font-bold mb-4 mt-2 justify-end cursor-pointer"
                onClick={props.closeFavorite}>X</div>
        </div>
    );
}
