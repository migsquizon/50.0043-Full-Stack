import React, { useState, useEffect, useRef } from 'react';
import StarRatings from 'react-star-ratings';
import { Row, Col, Button } from 'react-bootstrap';
import  { withContext } from '../Auth/AuthContext';
import BookCarousel from './BookCarousel';
import Reviews from '../Reviews/Reviews';
import Ratings from '../Extras/Ratings';
import axios from 'axios';
import './BookInfo.css';
require('dotenv/config');

console.log(process.env);

//var API_URL = process.env.REACT_APP_API_URL + "book/";
//API_URL = "http://13.229.185.245:5000/book/B009EALX3K?verbose=3&also_bought=5&buy_after_viewing=5&num_reviews=5";
var payload = [];

function getTopReview() {
  
}

function BookInfo(props) {

  const [asin, setAsin] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imUrl, setImUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [num_ratings, setNumRatings] = useState(0);
  const [price, setPrice] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [category, setCategory] = useState("");
  const [also_bought, setAlsoBought] = useState([]);
  const [buy_after_viewing, setBuyAfterViewing] = useState([]);

  useEffect(() => { 
    var query = props.getQuery();
    //URL = process.env.REACT_APP_API_URL + "book/" + query + "?verbose=3&also_bought=5&buy_after_viewing=5&num_reviews=5";
    (async () => {
      payload = await axios(process.env.REACT_APP_API_URL + "book/" + query + "?verbose=3&also_bought=5&buy_after_viewing=5&num_reviews=5");
      var payload_num_ratings = await axios(process.env.REACT_APP_API_URL + "reviews/" + query + "?verbose=0");
      var payload_ratings = await axios(process.env.REACT_APP_API_URL + "reviews/" + query + "?verbose=1");
      console.log(payload)
      // console.log(payload_num_ratings);
      // console.log(payload_num_ratings.data[0].count);
      // console.log(payload_ratings);
      // {payload.data.related.also_bought.map((book) => (
      //   console.log(book.asin)
      // ))}

      if (payload.title) {
        setTitle(payload.data.title);
      }

      if (payload.author) {
        setAuthor(payload.data.author);
      }

      if (payload.data.description) {
        setDescription(payload.data.description);
      }

      //NOT YET IMPLEMENTED
      if (payload_ratings.data) {
        setRating(payload_ratings.data);
      }


      if (payload_num_ratings.data[0].count) {
        setNumRatings(payload_num_ratings.data[0].count);
      }

      setAsin(payload.data.asin);
      setImUrl(payload.data.imUrl);

      if (payload.data.price) {
        setPrice(payload.data.price);
      }

      if (payload.data.reviews) {
        setReviews(payload.data.reviews);
      }

      if (payload.data.categories) {
        setCategory(payload.data.categories[0][1]);
      }

      if (payload.data.related) {
        if (payload.data.related.also_bought) {
          setAlsoBought(payload.data.related.also_bought);
        }
  
        if (payload.data.related.buy_after_viewing) {
          setBuyAfterViewing(payload.data.related.buy_after_viewing);
        }
      }
  
    })();
  }, []);

  if (payload) {
    return (
      <div className="page-container">
        <div className="book-main-info-container">
          <div className="book-img-container-lg">
            <img src={imUrl} fluid />
          </div>
          <div className="book-page-container">
            <div className="book-info-title-container">
              <span className="book-info-title">{asin}</span>
              <span><Button className="btn-sm add-reading-list-button">Add to reading list</Button></span>
            </div>
            <div className="book-info-author">
              <span style={{ 'color': '#B9C6CE' }}>under&nbsp;</span><span style={{ 'color': '#1D72A7' }}>{category}</span>
            </div>
            {num_ratings > 0 ? 
              <React.Fragment>
                <div className="book-info-ratings">
                  <span>
                    <Ratings
                      rating={rating}
                      starDimension='15px'
                    />
                  </span>
                  <span>&nbsp;{num_ratings} Ratings</span>
                </div>
              </React.Fragment> :
              <React.Fragment>
                {localStorage.getItem('user') ? 
                <div className="book-info-ratings">
                  This book currently has no ratings. Leave a <a href="/add-review">&nbsp;review?</a>
                </div> :
                <div className="book-info-ratings">
                  This book currently has no ratings. &nbsp;<a href="/login">Sign in</a> &nbsp;to add a review.
                </div>}
              </React.Fragment>
            }

            <div className="buy-amazon-container">
              <Button className="buy-amazon-button">
                <div style={{ 'color': '#000000' }}>Price on Amazon</div>
          <div style={{ 'color': '#831313', 'float': 'left', 'fontSize': '16px' }}>{price > 0 ? <b>${price}</b> : <b>NA</b>}</div>
              </Button>
            </div>
            {description != '' && 
              <React.Fragment>
                <div className="top-review">
                  {description}
                </div>
              </React.Fragment>
            }
            
            {/* <div className="top-review-username">
              &#8212;<i>{data.top_review_username}, top review for {data.title}</i>
            </div> */}
          </div>
        </div>
        <hr />
        {also_bought.length > 0 && 
          <React.Fragment>
            <div className="readers-also-viewed">Readers also viewed</div>
            <div className="carousel-container">
              <BookCarousel 
                data={also_bought}
              />
            </div>
            <hr />  
          </React.Fragment>}
        {reviews.length > 0 ? 
          <React.Fragment>
            <div className="readers-also-viewed">Reviews</div>
            <div className="review-container-main-page">
              <Reviews 
                data={reviews}
                rating={rating}
              />
            </div>
            <hr />
          </React.Fragment> :
          <React.Fragment>
            <div className="readers-also-viewed">Reviews</div>
            <div className="review-container-main-page">
              There are no user reviews yet.
            </div>
            <hr />
          </React.Fragment>
        }
        {buy_after_viewing.length > 0 && 
          <React.Fragment>
            <div className="readers-also-viewed">Because you viewed this book</div>
            <div className="carousel-container">
              <BookCarousel 
                data={buy_after_viewing}
              />
            </div>
          </React.Fragment>}
      </div>

      
    )
  }

  return (
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
  )
}
export default withContext(BookInfo);
