import React from 'react';
import Ratings from './Ratings';
import Truncate from 'react-truncate';
import './EachReview.css';

function EachReview(props) {
  return (
    <div className="each-review-container">
      <div className="review-username">
        {props.username}   
      </div>
      <div className="review-rating">
        <span>
          <Ratings
            rating={props.rating}
            starDimension='12px'
          />
        </span>
        <span style={{'padding-left':'10px'}}>{props.review_title}</span>
      </div>
      <div className="review-date">
        {props.date} 
      </div>
      <div className="review-content">
        {/* <Truncate lines={5} ellipsis={<p style={{'color':'#1D72A7'}}>read more</p>}> */}
          {props.review}
        {/* </Truncate> */}
      </div>
      <div className="review-helpful">
        {props.helpful} people found this helpful
      </div>
    </div>
  )
}

export default EachReview;