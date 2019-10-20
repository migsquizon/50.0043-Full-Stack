import React from 'react';
import StarRatings from 'react-star-ratings';
import Truncate from 'react-truncate';
import './BookCard.css';

function BookCard(props) {
  return (
    <div className="book-summary-container">
      <div className="book-img-container">
        <img src={props.imUrl} fluid />
      </div>
      <Truncate lines={2} ellipsis={<span>...</span>}>
        {props.title}
      </Truncate>
      <Truncate lines={1} ellipsis={<span>...</span>}>
        {props.author}
      </Truncate>
      <StarRatings
        name="book-rating"
        rating={props.rating}
        numberOfStars={5}
        starRatedColor="#F8CF46"
        starEmptyColor="#D0CDC6"
        starDimension="15px"
        starSpacing="2px"
      />
      {props.num_ratings}

    </div>
  )
}

export default BookCard;