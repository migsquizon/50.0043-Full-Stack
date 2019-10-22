import React from 'react';
import StarRatings from 'react-star-ratings';
import Truncate from 'react-truncate';
import Ratings from './Ratings'
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
      <Ratings
        rating={props.rating}
        starDimension='12px'
      />
      {props.num_ratings}

    </div>
  )
}

export default BookCard;