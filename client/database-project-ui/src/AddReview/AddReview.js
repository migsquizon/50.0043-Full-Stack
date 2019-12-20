import React, { Component } from 'react';
import { withContext } from '../Auth/AuthContext';
import { withRouter } from 'react-router-dom';
import Ratings from '../Extras/Ratings';
import StarRatings from 'react-star-ratings';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

class AddReview extends Component {
  constructor(props) {
    super(props);
    
    this.handleShowLogin = this.handleShowLogin.bind(this);
    this.handleCloseLogin = this.handleCloseLogin.bind(this);
    this.handleShowError = this.handleShowError.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


    
    this.state = {
      showLogin: false,
      reviewTitle: "",
      rating: 0,
      description: "",
      reviewerID: "A",
      message: "    "
    }
  }
  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
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

  handleSubmit = async event => {
    event.preventDefault();
    const bookreview = {
        summary:this.state.reviewTitle,
        overall:this.state.rating,
        reviewText:this.state.description,
        reviewerName:localStorage.getItem('first_name'),
        reviewerID:this.state.reviewerID
      };
     axios.post(process.env.REACT_APP_API_URL + `book/${this.props.asin}`,  bookreview )
    .then(res => {
        if (res.status === 200) {
            this.setState({ message: "Review successfully submitted!" })
            window.location.reload();//refresh when successful submit
        } else {
            this.setState({ message: "Oh no, something seems to be wrong!" })
        }
        console.log(res);
    })
  }



  
  render() {
    console.log(this.props.asin)
    return (
      <React.Fragment>
        <Button className="btn-sm add-reading-list-button" onClick={this.handleShowLogin}>Write a Review</Button>
        <Modal size="lg" show={this.state.showLogin} onHide={this.handleCloseLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formAddReviewAsin">
                <Form.Label>ASIN</Form.Label>
                <Form.Control readOnly
                              name="asin"
                              type="asin"
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
              <Form.Group controlId="formAddReviewRatings">
                <Form.Label>Ratings</Form.Label>
                <br/>
                <StarRatings
                name="book-rating"
                rating={this.state.rating}
                changeRating={this.changeRating}
                starDimension='12px'
                numberOfStars={5}
                svgIconPath="M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625"
                svgIconViewBox="0 0 20 20"
                starRatedColor="#F8CF46"
                starEmptyColor="#D0CDC6"
                starSpacing="3px"
                />
              </Form.Group>
              <Form.Group controlId="formAddReviewDescription">
                <Form.Label>Review</Form.Label>
                <Form.Control name="description"
                              type="description"
                              placeholder="Description"
                              as="textarea"
                              rows="3"
                              value={this.state.description}
                              onChange={this.handleChange}/>
              </Form.Group>
              {
                this.state.errorMessage &&
                <p style={{color: "red"}}>{this.state.errorMessage}</p>
              } 
              {this.state.message && <div>{this.state.message}</div>}
              <br />
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