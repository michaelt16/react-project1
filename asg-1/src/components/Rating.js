import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

export default function Rating(props) {
    const getStarIcon = (index) => {
        // round up the rating
        const ratingValue = Math.round(props.average * 2) / 2;
        if (index <= Math.floor(ratingValue) - 1) {
          return fullStar;
        } else if (index === Math.floor(ratingValue) && ratingValue % 1 !== 0) {
          return halfStar;
        } else {
          return emptyStar;
        }
    }

    const stars = Array.from({length: 10}, (v, i) => i).map(index => {
        return <FontAwesomeIcon icon={getStarIcon(index)} key={index} />;
    });

    return (
        <div className="movie-rating">
            {stars} {props.average} (Based on {props.count} ratings)
        </div>
    );
    
}

