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
      <div className="book-summary-content">
        <div className="book-card-title">
          <Truncate lines={1} ellipsis={<span>...</span>} trimWhitespace="true">
            {props.asin} 
            {/* using asin for now */}
          </Truncate>      
        </div>
        <div className="book-card-author">
          {/* <Truncate lines={1} ellipsis={<span>...</span>}> */}
            {props.author}
          {/* </Truncate>      */}
        </div>
        <div className="book-card-ratings">
          <span>
            <Ratings
              rating={props.rating}
              starDimension='12px'
            />
          </span>
          <span style={{'color': '#3B5260', 'font-size':'0.85rem'}}>&nbsp;{props.num_ratings}</span>
        </div>
      </div>
    </div>
  )
}

export default BookCard;