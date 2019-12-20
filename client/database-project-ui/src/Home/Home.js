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

  const [key, setKey] = useState("hardcode");
  const [header, setHeader] = useState("hardcode");
  const [books, setBooks] = useState([{}]);
  
  let query = props.query
  
  useEffect(() => {
    //var HOME_URL = process.env.REACT_APP_API_URL + `home/category/${key}`;
    console.log({key});
    //console.log(HOME_URL);
    
    if (query == "" ){
    (async () => {
      payload = await axios(process.env.REACT_APP_API_URL + `home/category/${key}`)
      // console.log(payload);
      // console.log(payload.data);
      setBooks(payload.data)
    })();
  }else{
    (async ()=>{
      payload = await axios(process.env.REACT_APP_API_URL + `search/${query}`)
      setBooks(payload.data)
      console.log(payload.data)
    })();
  }
  }, [key]);

if(payload.data){
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
                <br/>
                <Nav.Link className="ticket-selection" eventKey="hardcode"><div>Books That We Love</div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="kindle"><div>Best Seller</div></Nav.Link>
                <Nav.Link className="ticket-selection" eventKey="books"><div>Latest Releases</div></Nav.Link>
                <br/>
                <br/>
                <br/>
                <div className="ticket-selection-title">CATEGORIES</div>
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
            {payload.data.length>0?
            <div className="card-container-home">
              {books.map((book) => (
                <BookCard
                  asin={book.asin}
                  imUrl={book.imUrl}
                  rating={book.rating}
                  count={book.count}
                />
              ))}
            </div>:<div>No such book exists</div>}
          </Col> 
      </Row> 
    </React.Fragment>
  )}else{
    return (<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />)
  }
}

export default withRouter(withContext(Home));
