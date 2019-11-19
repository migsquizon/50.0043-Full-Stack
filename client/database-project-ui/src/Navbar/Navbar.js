import React, { Component } from 'react';
import { Button, Form, FormControl, Row, Col } from 'react-bootstrap';
import  { withContext } from '../Auth/AuthContext';
import { withRouter } from 'react-router-dom';
import './Navbar.css';

// function onLogout(e) { 
//   e.preventDefault();
//   localStorage.removeItem("user");
//   props.logout();
//   props.history.push("/");  
// }

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {query: ''};
    this.onLogout = this.onLogout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
    //this.props.history.push("/"); 
  }

  handleInputChange() {
    this.setState({
      query: this.search.value
    })
  }

  onSearch(event) {
    event.preventDefault();
    this.props.sendQuery(this.state.query);
    if (this.props.location.pathname == '/book-info') {
      window.location.reload();
    } else {
      this.props.history.push('/book-info');
    }
  }

  render() {

  
    return(
      <React.Fragment>
      {(!localStorage.getItem('user')) ? ( 
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
                  <Form.Control type="text" placeholder="Search" ref={input => this.search = input} onChange={this.handleInputChange}/>
                </Form>
              </Col>
              <Col sm={1}>
                <Button variant="outline-success" onClick={(event) => this.onSearch(event)}>Search</Button>
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
      ) : (
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
                <Form.Control type="text" placeholder="Search" ref={input => this.search = input} onChange={this.handleInputChange}/>
              </Form>
            </Col>
            <Col sm={1}>
              <Button variant="outline-success" type='submit'>Search</Button>
            </Col>
            <Col sm={4}>
              <div className="nav-menu">
                <ul className="nav-menu-list">
                  <li className="nav-item">
                    <a href="/" className="nav-a">Home</a>
                  </li>
                  <li className="nav-item">
                    <a href="/add-book" className="nav-a">Add a Book</a>
                  </li>
                  <li className="nav-item">
                    <a href="/" className="nav-a" onClick={(event) => this.onLogout(event)}>Logout</a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </nav>
      </header>
      )}
      </React.Fragment>
    );
  }
}

export default withRouter(withContext(Navbar));