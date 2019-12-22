import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './AddReview.css';
import NavBar from "./NavBar";
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import * as yup from 'yup';
require('dotenv/config');

// const schema = yup.object({
//   title: yup
//     .string()
//     .required(),
//   summary: yup
//   .string()
//   .required(),
//   overall: yup
//   .number()
//   .required(),
//   reviewerName: yup
//   .string()
//   .required(),
//   reviewerID: yup
//   .string()
//   .required(),
//   reviewText: yup
//   .string()
//   .required()
// })

class AddReview extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:"",
      summary:"",
      overall:0,
      reviewerName: "John",
      reviewerID:"GHJKGMHHGFFGB",
      reviewText:""
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});

  };

  handleValidation(){
    let title=this.state.title;
    let summary=this.state.summary;
    let overall=this.state.overall;
    let reviewText=this.state.reviewText;
    let formIsValid=true;

    if (title=="" || summary=="" || overall==0 || reviewText==""){
      formIsValid=false;
    }
    return formIsValid
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.handleValidation()){
      const bookreview = {
        title:this.state.title,
        summary:this.state.summary,
        overall:this.state.overall,
        genre:this.state.genre,
        reviewText:this.state.reviewText,
        reviewerName:this.state.reviewerName,
        reviewerID:this.state.reviewerID
      };
      console.log(bookreview)

      axios.post(process.env.REACT_APP_API_URL + `book/${bookreview.title}`,  bookreview )
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
      }
      else{
        alert("Please fill in all fields")
      }
  }

  render(){
    return (
      <div>
        {/* <NavBar/> */}
        <div className="col-6 offset-3">
        <h1 className='title'> Add New Review </h1>
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
              <Form.Label>Rating (Out of 5 Stars):</Form.Label><br></br>
              {/* <Form.Control as="select" name="overall" value={this.state.overall} onChange={this.handleInput}>
                <option value="" selected disabled>Please select</option>
                <option>★</option>
                <option>★★</option>
                <option>★★★</option>
                <option>★★★★</option>
                <option>★★★★★</option>
              </Form.Control> */}
              <StarRatings
                // name="book-rating"
                name="overall"
                rating={this.state.overall}
                starDimension='15px'
                numberOfStars={5}
                changeRating={(e)=>{this.setState({overall:e})}}
                svgIconPath="M9.875,0.625C4.697,0.625,0.5,4.822,0.5,10s4.197,9.375,9.375,9.375S19.25,15.178,19.25,10S15.053,0.625,9.875,0.625"
                svgIconViewBox="0 0 20 20"
                starRatedColor="#F8CF46"
                starEmptyColor="#D0CDC6"
                starSpacing="3px"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Review:</Form.Label>
              <Form.Control as="textarea" rows="5" placeholder="Write your review!" name="reviewText" value={this.state.reviewText} onChange={this.handleInput}/>
            </Form.Group>
            <Button variant="secondary" type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}


export default AddReview;
