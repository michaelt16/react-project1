export default function Filter(){
    return(
        <div className="col-span-1 bg-gray-300 p-4">
            <h2 className="text-lg font-bold mb-4 mt-2">Filters</h2>
            <h3 className="text-md mb-2">Title</h3>
            <input type="text" className="rounded-md w-full p-2 border border-gray-400 drop-shadow-md mb-4"/>
            <h3 className="text-md mb-2">Genre</h3>
            <select className="bg-white border border-gray-400 rounded p-2 mb-4 w-full">
                {/* later were gonna loop through the genre that randy has */}
                <option>Action</option>
                <option>Comedy</option>
                <option>Drama</option>
                <option>Horror</option>
                <option>Romance</option>
            </select>
            <h3 className="text-mb mt-4 mb-2">Release Date</h3>
            <select className="bg-white border border-gray-400 rounded p-2 mb-4 w-full">
                <option>Before</option>
                <option>After</option>
                <option>Between</option>
            </select>
            <input type="date" className="bg-white border border-gray-400 rounded p-2 mb-4 w-full" />
            <h3 className="text-md mb-2">Rating</h3>
            <input type="range" min="0" max="10" className="w-full mb-12" />
            <div className="flex justify-center">
                <input type="submit" className="border p-4 px-8 rounded-md bg-grey text-white cursor-pointer hover:bg-gray-600 mr-2"></input>
                <input type="submit" value="Clear" className="border p-4 px-10 rounded-md bg-grey text-white cursor-pointer hover:bg-gray-600 ml-2"></input>
            </div>
        </div>
    )
}