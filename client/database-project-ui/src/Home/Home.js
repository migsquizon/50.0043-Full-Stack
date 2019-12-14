import React, { useState, useEffect } from 'react';
import { Navbar,Nav, Overlay, Card, Form, Row, Col, Badge, OverlayTrigger, Button } from 'react-bootstrap';
import './Home.css';
import axios from 'axios';
import BookCard from '../Book/BookCard.js';
import { withContext } from '../Auth/AuthContext';
import { withRouter } from 'react-router-dom';
require('dotenv/config');


var payload = [];

function Home(props) {

  const [key, setKey] = useState("top");
  const [books, setBooks] = useState([{}]);

  useEffect(() => {
    //var HOME_URL = process.env.REACT_APP_API_URL + `home/category/${key}`;
    console.log({key});
    //console.log(HOME_URL);
    (async () => {
      payload = await axios(process.env.REACT_APP_API_URL + `home/category/${key}`)
      console.log(payload);
      console.log(payload.data);
      setBooks(payload.data)
    })();
  }, [key]);

  return (
    <React.Fragment>
      <Row style={{height: '100vh'}}>
          <Col xs={2}>
            <div className="sidebar-container">
              <Nav 
                activeKey={key}
                className="flex-column"
                onSelect= {key => setKey(key)}  
              >
                <Nav.Link className="ticket-selection" eventKey="top"><div>Books That We Love</div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="kindle"><div>Best Seller</div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="books"><div>Latest Releases</div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="romance"><div>Romance</div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="fantasy"><div>Fantasy</div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="thriller"><div>Thriller</div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="horror"><div>Horror</div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="fiction"><div>Fiction</div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="politics"><div>Politics</div></Nav.Link>
              </Nav>
            </div>

          </Col>
          <Col xs={10}>
            <div className="card-container-home">
              {books.map((book) => (
                <BookCard
                  asin={book.asin}
                  imUrl={book.imUrl}
                  rating={book.rating}
                />
              ))}
            </div>
          </Col> 
      </Row> 
    </React.Fragment>
  )
}

export default withRouter(withContext(Home));
