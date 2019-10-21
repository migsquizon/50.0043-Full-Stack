import React from 'react';
import StarRatings from 'react-star-ratings';
import { Row, Col, Button } from 'react-bootstrap';
import BookCarousel from './BookCarousel';
import Reviews from './Reviews';
import './BookInfo.css';

const data = {
  "asin": "0000031852",
  "title": "Girls Ballet Tutu Zebra Hot Pink",
  "author": "Bella Forrest",
  "rating": 4.3,
  "num_ratings": 35,
  "price": 3.17,
  "imUrl": "http://ecx.images-amazon.com/images/I/51fAmVkTbyL._SY300_.jpg",
  "related":
  {
    "also_bought": ["B00JHONN1S", "B002BZX8Z6", "B00D2K1M3O", "0000031909", "B00613WDTQ", "B00D0WDS9A", "B00D0GCI8S", "0000031895", "B003AVKOP2", "B003AVEU6G", "B003IEDM9Q", "B002R0FA24", "B00D23MC6W", "B00D2K0PA0", "B00538F5OK", "B00CEV86I6", "B002R0FABA", "B00D10CLVW", "B003AVNY6I", "B002GZGI4E", "B001T9NUFS", "B002R0F7FE", "B00E1YRI4C", "B008UBQZKU", "B00D103F8U", "B007R2RM8W"],
    "also_viewed": ["B002BZX8Z6", "B00JHONN1S", "B008F0SU0Y", "B00D23MC6W", "B00AFDOPDA", "B00E1YRI4C", "B002GZGI4E", "B003AVKOP2", "B00D9C1WBM", "B00CEV8366", "B00CEUX0D8", "B0079ME3KU", "B00CEUWY8K", "B004FOEEHC", "0000031895", "B00BC4GY9Y", "B003XRKA7A", "B00K18LKX2", "B00EM7KAG6", "B00AMQ17JA", "B00D9C32NI", "B002C3Y6WG", "B00JLL4L5Y", "B003AVNY6I", "B008UBQZKU", "B00D0WDS9A", "B00613WDTQ", "B00538F5OK", "B005C4Y4F6", "B004LHZ1NY", "B00CPHX76U", "B00CEUWUZC", "B00IJVASUE", "B00GOR07RE", "B00J2GTM0W", "B00JHNSNSM", "B003IEDM9Q", "B00CYBU84G", "B008VV8NSQ", "B00CYBULSO", "B00I2UHSZA", "B005F50FXC", "B007LCQI3S", "B00DP68AVW", "B009RXWNSI", "B003AVEU6G", "B00HSOJB9M", "B00EHAGZNA", "B0046W9T8C", "B00E79VW6Q", "B00D10CLVW", "B00B0AVO54", "B00E95LC8Q", "B00GOR92SO", "B007ZN5Y56", "B00AL2569W", "B00B608000", "B008F0SMUC", "B00BFXLZ8M"],
    "bought_together": ["B002BZX8Z6"]
  },
  "salesRank": {"Toys & Games": 211836},
  "brand": "Coxlures",
  "categories": [["Sports & Outdoors", "Other Sports", "Dance"]]
}

function BookInfo(props) {
  return (
    <div>
      <div className="book-main-info-container">
        <Row>
          <Col xs={2}>
            <div className="book-img-container-lg">
              <img src={data.imUrl} fluid />
            </div>
          </Col>
          <Col xs={10}>
            <div className="book-info-title">
              <span>{data.title}</span><span><Button variant="light">Add to reading list</Button></span>
            </div>
            <div className="book-info-author">
              <span>by {data.author}</span>
            </div>
            <div className="book-info-ratings">
              <span>
                <StarRatings
                  name="book-rating"
                  rating={data.rating}
                  numberOfStars={5}
                  starRatedColor="#F8CF46"
                  starEmptyColor="#D0CDC6"
                  starDimension="15px"
                  starSpacing="2px"
                />
              </span>
              <span>{data.num_ratings} Ratings</span>
            </div>
            <Button variant="warning">
              <div>Buy on Amazon</div>
              <div>${data.price}</div>
            </Button>
          </Col>
        </Row>
      </div>
      <hr/>
      <div className="readers-viewed-container">
        <div>Readers also viewed</div>
        <BookCarousel/>
      </div>
      <hr/>
      <Reviews/>
      <hr/>
      <div className="readers-viewed-container">
        <div>Because you viewed this book</div>
        <BookCarousel/>
      </div>
 
    </div>
  )
}

export default BookInfo;
