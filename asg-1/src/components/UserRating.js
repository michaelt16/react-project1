import React from 'react';

export default function UserRating(props) {
    const handleRatingChange = (value) => {
        props.setRating(value);
    }

    return (
        <div className="movie-rating-form gap-2 mt-2">
            <label htmlFor="steps-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Your Rating
            </label>
            <div className="flex gap-2">
                {props.movie.userRating == null &&
                    <input id="steps-range"
                        type="range"
                        min="0"
                        max="10"
                        value={props.rating}
                        step="1"
                        onChange={(event) => handleRatingChange(parseInt(event.target.value))}
                        className="mt-2 w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                }
                {props.movie.userRating != null &&
                    <input id="disabled-range"
                        type="range"
                        min="0"
                        max="10"
                        value={props.movie.userRating}
                        step="1"
                        className="mt-2 w-48 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        disabled
                        />
                }
                {props.movie.userRating == null &&
                    <div>{props.rating}</div>
                }
                {props.movie.userRating != null &&
                    <div>{props.movie.userRating}</div>
                }
            </div>
            
            {/* submit button */}
            {!props.movie.isRated &&
                <button
                    className="font-semibold mt-2 bg-grey text-white py-2 px-2 rounded-lg hover:bg-gray-700"
                    onClick={() => props.handleAddRating(props.rating)}>
                    Submit
                </button>
            }
        </div>
    );
    
}

