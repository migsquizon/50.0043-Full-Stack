import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './AddBook.css';
import axios from 'axios';



class AddBook extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:"",
      author:"",
      publisher:"",
      genre:"",
      synopsis:""
    };
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});

  };

  handleSubmit = async event => {
    event.preventDefault();

    const book = {
      title:this.state.title,
      author:this.state.author,
      publisher:this.state.publisher,
      genre:this.state.genre,
      description:this.state.description
    };

    axios.post(`url.com`, { book })
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
              <Form.Label>Enter Book Title/ASIN Number:</Form.Label>
              <Form.Control type="text" placeholder="Book Title" name="title" value={this.state.title} onChange={this.handleInput} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Author's Name:</Form.Label>
              <Form.Control type="text" placeholder="Author Name" name="author" value={this.state.author} onChange={this.handleInput}/>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect2">
              <Form.Label>Enter Book Publisher:</Form.Label>
              <Form.Control type="text" placeholder="Publisher" name="publisher" value={this.state.publisher} onChange={this.handleInput}>
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
              <Form.Label>Enter Book Description</Form.Label>
              <Form.Control as="textarea" rows="5" placeholder="Book Description" name="description" value={this.state.description} onChange={this.handleInput}/>
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
