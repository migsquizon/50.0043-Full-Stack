import React, { Component } from 'react';
import { withContext } from '../Auth/AuthContext';
import { withRouter } from 'react-router-dom';
import Ratings from '../Extras/Ratings';
import { Modal, Button, Form } from 'react-bootstrap';

class AddReview extends Component {
  constructor(props) {
    super(props);
    
    this.handleShowLogin = this.handleShowLogin.bind(this);
    this.handleCloseLogin = this.handleCloseLogin.bind(this);
    this.handleShowError = this.handleShowError.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onLogin = this.onLogin.bind(this);


    
    this.state = {
      showLogin: false,
      bookTitle: "",
      asin: "",
      reviewTitle: "",
      rating: 0,
      description: "",
    }
  }
  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  
  handleCloseLogin() {
    this.setState({ showLogin: false });

  }
  
  handleShowLogin() {
    this.setState({ showLogin: true });
 
  }

  handleShowError() {
    if (this.state.errorMessage === "") {
      this.setState({ showLogin: false })
    } else {
      
    }
  }


  
  onLogin = (e) => {
    const payload = {
      loginEmail: this.state.loginEmail,
      loginPassword: this.state.loginPassword
    }
    e.preventDefault();
    var loginEmail = this.state.loginEmail;

    if (loginEmail.includes("@accenture")) {
      this.props.adminLogin(this.state)
      this.props.history.push("/admin/dashboard/");    
        //.catch(err => {
        //  this.setState({errorMessage: err.response.data.message})
        //});
        
        //.catch((err) => console.log(err));
        // .catch((err) => {
        //   this.setState({errorMessage: err.response.data.error})
        // });
        
        
    // } else {
    //   console.log("false");
    //   this.props.login(payload)
    //     // .then(res => console.log(res.json()))
    // //     .catch((err) => {
    // //       this.setState({errorMessage: err.response.data.error})
    // // });
    } else {
      this.props.login(this.state);
      this.props.history.push("/user/dashboard/");
    }
    


    

  }
  
  render() {
    console.log(this.props.asin)
    return (
      <React.Fragment>
        <Button className="btn-sm add-reading-list-button" onClick={this.handleShowLogin}>Write a Review</Button>
        <Modal size="lg" show={this.state.showLogin} onHide={this.handleCloseLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Add a New Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.onLogin}>
              <Form.Group controlId="formAddReviewBookTitle">
                <Form.Label>Book Title</Form.Label>
                <Form.Control name="bookTitle"
                              type="bookTitle"
                              placeholder="Book Title"
                              value={this.state.bookTitle}
                              onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="formAddReviewAsin">
                <Form.Label>ASIN</Form.Label>
                <Form.Control required
                              name="asin"
                              type="asin"
                              placeholder="ASIN"
                              value={this.props.asin}
                              onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="formAddReviewReviewTitle">
                <Form.Label>Review Title</Form.Label>
                <Form.Control required
                              name="reviewTitle"
                              type="reviewTitle"
                              placeholder="Review Title"
                              value={this.state.reviewTitle}
                              onChange={this.handleChange}/>
              </Form.Group>
              <Ratings />
              <Form.Group controlId="formAddReviewDescription">
                <Form.Label>Review</Form.Label>
                <Form.Control name="description"
                              type="description"
                              placeholder="Description"
                              rows="3"
                              value={this.state.description}
                              onChange={this.handleChange}/>
              </Form.Group>
              {
                this.state.errorMessage &&
                <p style={{color: "red"}}>{this.state.errorMessage}</p>
              } 
              <Button variant="secondary" onClick={this.state.errorMessage ? (this.handleCloseLogin) : (this.handleShowLogin)} type="submit">
                Submit
              </Button>
            </form>

          </Modal.Body>
        </Modal>
      </React.Fragment>
    )
  }
}

export default withRouter(withContext(AddReview));