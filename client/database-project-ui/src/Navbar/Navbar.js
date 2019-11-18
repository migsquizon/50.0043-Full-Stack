import React from 'react';
import { Button, Form, FormControl, Row, Col } from 'react-bootstrap';
import './Navbar.css';

function Navbar(props) {
    return(
      <header className="nav-header">
        <nav className="nav-container">
          <Row>
            <Col sm={2}>
              <div className="name">
                The Library
              </div>
            </Col>
            <Col sm={5}>
              <Form>
                <Form.Control type="text" placeholder="Search" />
              </Form>
            </Col>
            <Col sm={1}>
              <Button variant="outline-success">Search</Button>
            </Col>
            <Col sm={4}>
              <div className="nav-menu">
                <ul className="nav-menu-list">
                  <li className="nav-item">
                    <a href="/" className="nav-a">Home</a>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-a">Login</a>
                  </li>
                  <li className="nav-item">
                    <a href="/register" className="nav-a">Register</a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </nav>
    </header>
    );
}

export default Navbar;