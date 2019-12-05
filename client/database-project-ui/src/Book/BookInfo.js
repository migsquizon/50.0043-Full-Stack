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

var API_URL = process.env.REACT_APP_API_URL + "book/";
//API_URL = "http://13.229.185.245:5000/book/B009EALX3K?verbose=3&also_bought=5&buy_after_viewing=5&num_reviews=5";
var payload = [];

const data = {
  "asin": "0000031852",
  "title": "Girls Ballet Tutu Zebra Hot Pink",
  "author": "Bella Forrest",
  "rating": 4.3,
  "num_ratings": 35,
  "price": 3.17,
  "imUrl": "https://images-na.ssl-images-amazon.com/images/I/41F5kmyiPsL._SX329_BO1,204,203,200_.jpg",
  "related":
  {
    "also_bought": ["B00JHONN1S", "B002BZX8Z6", "B00D2K1M3O", "0000031909", "B00613WDTQ", "B00D0WDS9A", "B00D0GCI8S", "0000031895", "B003AVKOP2", "B003AVEU6G", "B003IEDM9Q", "B002R0FA24", "B00D23MC6W", "B00D2K0PA0", "B00538F5OK", "B00CEV86I6", "B002R0FABA", "B00D10CLVW", "B003AVNY6I", "B002GZGI4E", "B001T9NUFS", "B002R0F7FE", "B00E1YRI4C", "B008UBQZKU", "B00D103F8U", "B007R2RM8W"],
    "also_viewed": ["B002BZX8Z6", "B00JHONN1S", "B008F0SU0Y", "B00D23MC6W", "B00AFDOPDA", "B00E1YRI4C", "B002GZGI4E", "B003AVKOP2", "B00D9C1WBM", "B00CEV8366", "B00CEUX0D8", "B0079ME3KU", "B00CEUWY8K", "B004FOEEHC", "0000031895", "B00BC4GY9Y", "B003XRKA7A", "B00K18LKX2", "B00EM7KAG6", "B00AMQ17JA", "B00D9C32NI", "B002C3Y6WG", "B00JLL4L5Y", "B003AVNY6I", "B008UBQZKU", "B00D0WDS9A", "B00613WDTQ", "B00538F5OK", "B005C4Y4F6", "B004LHZ1NY", "B00CPHX76U", "B00CEUWUZC", "B00IJVASUE", "B00GOR07RE", "B00J2GTM0W", "B00JHNSNSM", "B003IEDM9Q", "B00CYBU84G", "B008VV8NSQ", "B00CYBULSO", "B00I2UHSZA", "B005F50FXC", "B007LCQI3S", "B00DP68AVW", "B009RXWNSI", "B003AVEU6G", "B00HSOJB9M", "B00EHAGZNA", "B0046W9T8C", "B00E79VW6Q", "B00D10CLVW", "B00B0AVO54", "B00E95LC8Q", "B00GOR92SO", "B007ZN5Y56", "B00AL2569W", "B00B608000", "B008F0SMUC", "B00BFXLZ8M"],
    "bought_together": ["B002BZX8Z6"]
  },
  "salesRank": { "Toys & Games": 211836 },
  "brand": "Coxlures",
  "categories": [["Sports & Outdoors", "Other Sports", "Dance"]],
  "top_review": "Another fascinating and eye opening read by my favorite anchor/reporter/ hero. An important addition to her previous book this one focuses on the oil and gas industries. Russia, Tillerson Exon Mobil are all exposed and it’s a mouth gaping account of corporate greed, lies and how we need to act now, before it’s too late.",
  "top_review_username": "noobkenneth",
}

function getTopReview() {
  
}

function BookInfo(props) {

  const [asin, setAsin] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [imUrl, setImUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [num_rating, setNumRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [also_bought, setAlsoBought] = useState([]);
  const [buy_after_viewing, setBuyAfterViewing] = useState([]);

  useEffect(() => { 
    var query = props.getQuery();
    console.log(query);
    URL = API_URL + query + "?verbose=3&also_bought=5&buy_after_viewing=5&num_reviews=5";
    (async () => {
      payload = await axios(URL);
      console.log(payload);
      console.log(payload.data.asin);
      console.log("HELLO");
      // {payload.data.related.also_bought.map((book) => (
      //   console.log(book.asin)
      // ))}

      if (payload.title) {
        setTitle(payload.data.title);
      }

      if (payload.author) {
        setAuthor(payload.data.author);
      }

      if (payload.description) {
        setAuthor(payload.data.description);
      }

      //NOT YET IMPLEMENTED
      if (payload.rating) {
        setRating(payload.rating);
      }

      if (payload.num_rating) {
        setNumRating(payload.num_rating);
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
        setCategories(payload.data.categories);
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
              <span style={{ 'color': '#B9C6CE' }}>by&nbsp;</span><span style={{ 'color': '#1D72A7' }}>{data.author}</span>
            </div>
            <div className="book-info-ratings">
              <span>
                <Ratings
                  rating={data.rating}
                  starDimension='15px'
                />
              </span>
              <span>&nbsp;{data.num_ratings} Ratings</span>
            </div>
            <div className="buy-amazon-container">
              <Button className="buy-amazon-button">
                <div style={{ 'color': '#000000' }}>Buy on Amazon</div>
                <div style={{ 'color': '#831313', 'float': 'left', 'fontSize': '16px' }}><b>${price}</b></div>
              </Button>
            </div>
            <div className="top-review">
              "{data.top_review}"
            </div>
            <div className="top-review-username">
              &#8212;<i>{data.top_review_username}, top review for {data.title}</i>
            </div>
          </div>
        </div>
        <hr />
        <div className="readers-also-viewed">Readers also viewed</div>
        <div className="carousel-container">
          <BookCarousel 
            data={also_bought}
          />
        </div>
        <hr />
        <div className="readers-also-viewed">Reviews</div>
        <div className="review-container-main-page">
          <Reviews 
            data={reviews}
          />
        </div>
        <hr />
        <div className="readers-also-viewed">Because you viewed this book</div>
        <div className="carousel-container">
          <BookCarousel 
            data={buy_after_viewing}
          />

        </div>
      </div>

      
    )
  }

  return (
    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
  )
}
export default withContext(BookInfo);
