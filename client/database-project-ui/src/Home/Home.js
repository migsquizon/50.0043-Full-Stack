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
                className="sidebar-nav"
                onSelect= {key => setKey(key)}  
              >
                <Nav.Link className="ticket-selection" eventKey="top"><div><span>Books That We Love</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="kindle"><div><span>Best Seller</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="books"><div><span>Latest Releases</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="romance"><div><span>Romance</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="fantasy"><div><span>Fantasy</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="thriller"><div><span>Thriller</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="horror"><div><span>Horror</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="fiction"><div><span>Fiction</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="politics"><div><span>Politics</span><span className="number-of-tickets"></span></div></Nav.Link>
              </Nav>
            </div>

          </Col>
          <Col xs={10}>
            <div className="card-container-home">
              {books.map((book) => (
                <BookCard
                  asin={book.asin}
                  imUrl={book.imUrl}
                />
              ))}
            </div>
          </Col> 
      </Row> 
    </React.Fragment>
  )
}

export default withRouter(withContext(Home));
