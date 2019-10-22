import React from 'react';
import StarRatings from 'react-star-ratings';
import Truncate from 'react-truncate';

function EachReview(props) {
  return (
    <div>
      {props.username}
      <div className="review-rating">
        <span>
          <StarRatings
            name="book-rating"
            rating={props.rating}
            numberOfStars={5}
            starRatedColor="#F8CF46"
            starEmptyColor="#D0CDC6"
            starDimension="15px"
            starSpacing="2px"
          />
        </span>
        <span>{props.review_title}</span>
        {props.date}
        <Truncate lines={10} ellipsis={<span>read more</span>}>
        {props.review}
        </Truncate>
      </div>
      <div className="review-helpful">
        {props.helpful} people found this helpful
      </div>
    </div>
  )
}

export default EachReview;