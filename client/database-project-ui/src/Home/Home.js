import React, { useState, useEffect } from 'react';
import { Navbar,Nav, Overlay, Card, Form, Row, Col, Badge, OverlayTrigger, Button } from 'react-bootstrap';
import './Home.css';
import axios from 'axios';
import BookCard from '../Book/BookCard.js';
import { withContext } from '../Auth/AuthContext';
import { withRouter } from 'react-router-dom';

var HOME_URL = "http://13.229.185.245:5000/home/category/top";
var payload = [];

function Home(props) {

  const [key, setKey] = useState("");
  const [books, setBooks] = useState([{}]);

  useEffect(() => {
    (async () => {
      payload = await axios(HOME_URL)
      console.log(payload);
      console.log(payload.data);
      setBooks(payload.data)
    })();
  }, []);

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
                <Nav.Link className="ticket-selection" eventKey="unsolved"><div><span>Books We Love</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="new"><div><span>Best Seller</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="urgent"><div><span>Latest Releases</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="unassigned"><div><span>Romance</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="open"><div><span>Thriller</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="pending"><div><span>Fiction</span><span className="number-of-tickets"></span></div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="solved"><div><span>Non-Fiction</span><span className="number-of-tickets"></span></div></Nav.Link>
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
