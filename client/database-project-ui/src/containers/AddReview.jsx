import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavBar from "./NavBar";
import axios from 'axios';



class AddReview extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:"",
      summary:"",
      rating:"",
      genre:"",
      review:""
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});

  };

  handleSubmit = async event => {
    event.preventDefault();

    const bookreview = {
      title:this.state.title,
      summary:this.state.summary,
      rating:this.state.rating,
      genre:this.state.genre,
      review:this.state.review
    };

    axios.post(`url.com`, { bookreview })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render(){
    return (
      <div>
        <NavBar/>
        <div className="col-sm-6 offset-sm-3 p-3">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Book Title/ASIN Number:</Form.Label>
              <Form.Control type="text" placeholder="Book Title" name="title" value={this.state.title} onChange={this.handleInput} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Review Title:</Form.Label>
              <Form.Control type="text" placeholder="Review Title" name="summary" value={this.state.summary} onChange={this.handleInput}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Rating (Out of 5 Stars):</Form.Label>
              <Form.Control as="select" name="rating" value={this.state.rating} onChange={this.handleInput}>
                <option value="" selected disabled>Please select</option>
                <option>★</option>
                <option>★★</option>
                <option>★★★</option>
                <option>★★★★</option>
                <option>★★★★★</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select Genre:</Form.Label>
              <Form.Control as="select" name="genre" value={this.state.genre} onChange={this.handleInput}>
                <option value="" selected disabled>Please select</option>
                <option>Horror</option>
                <option>Sci-fi</option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Mystery</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Review:</Form.Label>
              <Form.Control as="textarea" rows="5" placeholder="Write your review!" name="review" value={this.state.review} onChange={this.handleInput}/>
            </Form.Group>
            <Button variant="warning" type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}


export default AddReview;
