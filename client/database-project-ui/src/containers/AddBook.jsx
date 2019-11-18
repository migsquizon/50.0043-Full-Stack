import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './AddBook.css';
import axios from 'axios';



class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      asin:"",
      title:"",
      imUrl:"",
      categories:"",
      description:"",
      added_by:"John"
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});

  };

  handleSubmit = async event => {
    event.preventDefault();

    if (this.state.imUrl==""){this.setState({imUrl:'https://longreadsblog.files.wordpress.com/2019/07/beach-book.jpg?w=1200'})}
      

    const book = {
      title:this.state.title,
      asin:this.state.asin,
      imUrl:this.state.imUrl,
      categories:this.state.categories,
      description:this.state.description,
      added_by:this.state.added_by
    };

    axios.post(`http://13.229.185.245:5000/add/book`,  book )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render(){
    return (
      <div>
        {/* <NavBar/> */}
        <div className="col-6 offset-3">
        <h1 className='title'> Add New Book </h1>
        <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Book Title</Form.Label>
              <Form.Control type="text" placeholder="Title" name="title" value={this.state.title} onChange={this.handleInput} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Enter ASIN Number:</Form.Label>
              <Form.Control type="text" placeholder="ASIN Number" name="asin" value={this.state.asin} onChange={this.handleInput}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Enter Image URL</Form.Label>
              <Form.Control type="text" placeholder="Image URL" name="imUrl" value={this.state.imUrl} onChange={this.handleInput}>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Select Genre:</Form.Label>
              <Form.Control as="select" name="categories" value={this.state.categories} onChange={this.handleInput}>
                <option value="" selected disabled>Please select</option>
                <option>Horror</option>
                <option>Sci-fi</option>
                <option>Fiction</option>
                <option>Non-Fiction</option>
                <option>Mystery</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Enter Book Description</Form.Label>
              <Form.Control as="textarea" rows="5" placeholder="Description" name="description" value={this.state.description} onChange={this.handleInput}/>
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


export default AddBook;
