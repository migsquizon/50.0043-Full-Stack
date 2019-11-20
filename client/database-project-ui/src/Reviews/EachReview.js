import React from 'react';
import Ratings from '../Extras/Ratings';
import Truncate from 'react-truncate';
import './EachReview.css';

function EachReview(props) {
  return (
    <div className="each-review-container">
      <div className="review-username">
        {props.reviewerName}   
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
        <span>{props.helpful} people found this helpful</span>
        {/* <span>
          <svg width="120" height="120">
            <symbol viewBox="0 0 20 20">
              <path d="M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625" />
            </symbol>
          </svg>
        </span> */}
      </div>
    </div>
  )
}

export default EachReview;