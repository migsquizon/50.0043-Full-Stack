import React from 'react';
import StarRatings from 'react-star-ratings';

function Ratings(props) {
    return (
        <StarRatings
        name="book-rating"
        rating={props.rating}
        starDimension={props.starDimension}
        numberOfStars={5}
        svgIconPath="M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625"
        svgIconViewBox="0 0 20 20"
        starRatedColor="#F8CF46"
        starEmptyColor="#D0CDC6"
        starSpacing="3px"
      />
    )
}

export default Ratings;