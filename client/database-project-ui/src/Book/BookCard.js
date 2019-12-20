import React from 'react';
import StarRatings from 'react-star-ratings';
import Truncate from 'react-truncate';
import Ratings from '../Extras/Ratings';
import { withContext } from '../Auth/AuthContext';
import { withRouter } from 'react-router-dom';
import './BookCard.css';


function onSearch(event, props) {
  event.preventDefault();
  props.sendQuery(props.asin);
  if (props.location.pathname == '/book-info') {
    window.location.reload();
  } else {
    props.history.push('/book-info');
  }
}

function BookCard(props) {
  return (
    <div className="book-summary-container" onClick={(event) => onSearch(event, props)}>
      <div className="book-img-container">
        <img className="book-img-container-img" src={props.imUrl} fluid />
      </div>
      <div className="book-summary-content">
        <div className="book-card-title">
          {/* <Truncate lines={1} ellipsis={<span>...</span>} trimWhitespace="true"> */}
            {props.asin} 
            {/* using asin for now */}
          {/* </Truncate>       */}
        </div>
        <div className="book-card-author">
          {/* <Truncate lines={1} ellipsis={<span>...</span>}> */}
            {props.author}
          {/* </Truncate>      */}
        </div>
        <div className="book-card-ratings">
          <span>{
          props.rating?//this is done because dont want to show rating when searching as sql cannot take such high workload
            <Ratings
              rating={props.rating}
              starDimension='12px'
            />:undefined}
          </span>
          <span style={{'color': '#3B5260', 'font-size':'0.85rem'}}>&nbsp;{props.count}</span>
        </div>
      </div>
    </div>
  )
}

export default withRouter(withContext(BookCard));