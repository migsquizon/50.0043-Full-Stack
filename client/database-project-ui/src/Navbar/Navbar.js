import React, { Component } from 'react';
import { Button, Form, FormControl, Row, Col } from 'react-bootstrap';
import  { withContext } from '../Auth/AuthContext';
import { withRouter } from 'react-router-dom';
import Avatar from 'react-avatar';
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
    this.state = {query: '',
                  user: false};
    this.onLogout = this.onLogout.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
    window.location.reload();
    //this.props.history.push("/"); 
  }

  handleInputChange() {
    this.setState({
      query: this.search.value
    })
    this.props.setQuery(this.search.value)
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
    console.log(localStorage.getItem('user'))
    return(
      <React.Fragment>
      {(!localStorage.getItem('user')) ? ( 
        <header className="nav-header">
          <nav className="nav-container">
            <Row>
              <Col sm={2}>
                <div className="name">
                <a href="/">LIBRORUM</a>
                </div>
              </Col>
              <Col sm={4}>
              <Form>
                <Form.Control className="search-bar" type="text" placeholder="Search" ref={input => this.search = input} onChange={this.handleInputChange}/>
              </Form>
            </Col>
            <Col sm={1}>
              <img className="magnifying-glass" src={require("./magnifying-glass.svg")} onClick={(event) => this.onSearch(event)} />
            </Col>
              <Col sm={5}>
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
                <a href="/">LIBRORUM</a>
              </div>
            </Col>
            <Col lg={4} md={3} sm={2}>
              <Form>
                <Form.Control className="search-bar" type="text" placeholder="Search" ref={input => this.search = input} onChange={this.handleInputChange}/>
              </Form>
            </Col>
            <Col sm={1}>
              <img className="magnifying-glass" src={require("./magnifying-glass.svg")} onClick={(event) => this.onSearch(event)} />
            </Col>
            <Col lg={5} md={6} sm={7}>
              <div className="nav-menu">
                <ul className="nav-menu-list">
                   <li className="nav-item">
                    <div href="/" className="nav-a">Welcome, {localStorage.getItem("first_name")}</div>
                  </li>
                  <li className="nav-item">
                    <a href="/" className="nav-a">Home</a>
                  </li>
                  <li className="nav-item">
                    <a href="/add-book" className="nav-a">Add a Book</a>
                  </li>
                  <li className="nav-item">
                    <a href="/" className="nav-a" onClick={(event) => this.onLogout(event)}>Logout</a>
                  </li>
                  <li className="nav-item">
                    <Avatar name={localStorage.getItem("first_name")} size="40" round={true} color="#9F9FBD"/>
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