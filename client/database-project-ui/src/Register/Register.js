import React, {Component} from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Login from '../Login/Login';
import './Register.css';
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { withContext } from '../Auth/AuthContext';
import * as yup from 'yup';
import checkSvg from './checked.svg'
require('dotenv/config');

var CAPTCHA_SITE_KEY = process.env.REACT_APP_GOOGLE_CAPTCHA_SITE_KEY | "6LdubLIUAAAAAAoBktfc0ZhDebacKayNIdqa0e3L";

const schema = yup.object({
  firstName: yup
    .string()
    .required(),
  lastName: yup
    .string()
    .required(),
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Please confirm your password')

});

class Register extends Component {
  
  constructor(props) {
    super(props);
    this.state = {firstName: '',
                  lastName: '',
                  username: '',
                  password: '',
                  confirmPassword: ''};
    
    this.handleChange = this.handleChange.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  // componentDidMount() {
  //   document.body.style.background = "#F9FAFC";
  //   console.log(this.props.location.pathname);
  //  }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
 
  }

  onRegister = (e) => {
    const payload = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
    }
    e.preventDefault();
    this.props.register(payload);
    this.props.history.push("/");
  }
  
  render() {
    return (
      <div className="signup-container">
        <Row> 
          <Col xs={2} />
          <Col xs={4}>
            <div className="signup-info-box">
              <div className="signup-info-title">
                {/* sutd glassdoor */}
              </div>
              <div className="signup-info-body">
                <div className="signup-info-text-container">
                  <Row>
                    <Col xs={1}>
                      <img src={checkSvg} width={15} />
                    </Col>
                    <Col xs={7}>
                      <div className="signup-info-body-title">Quick and free sign-up</div>
                      <div className="signup-info-body-content">Enter your username to create an account.</div>
                    </Col> 
                    <Col xs={3}/> 
                  </Row>              
                </div>
                <div className="signup-info-text-container">
                  <Row>
                    <Col xs={1}>
                      <img src={checkSvg} width={15} />
                    </Col>
                    <Col xs={7}>
                      <div className="signup-info-body-title">Browse Books</div>
                      <div className="signup-info-body-content">Get access to reviews written by others</div>
                    </Col> 
                    <Col xs={3}/> 
                  </Row>
                </div>
                <div className="signup-info-text-container">
                  <Row>
                    <Col xs={1}>
                      <img src={checkSvg} width={15} />
                    </Col>
                    <Col xs={7}>
                      <div className="signup-info-body-title">Write a Review</div>
                      <div className="signup-info-body-content">Had an interesting book to share? Create an account to leave a review.</div>
                    </Col>
                    <Col xs={3}/> 
                  </Row>
                </div>
              </div>
            </div>
          </ Col>
          <Col xs={6}>
            <Formik
              validationSchema={schema}
              onSubmit={console.log}
              initialValues={{
                firstName: '',
                lastName: '',
                username: '',
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form noValidate onSubmit={console.log}>
                  <div className="signup-box">
                    <div className="create-account-title">
                      <span>Create your account now</span> 
                    </div>
                    <div className="create-account-form-body">
                      <Form.Group controlId="formGroupUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                          type="username" 
                          name="username"
                          value={this.state.username}
                          onChange={this.handleChange}
                          isValid={touched.username && !errors.username}
                          isInvalid={!!errors.username}
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formGroupFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                          type="firstName" 
                          name="firstName"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                          isValid={touched.firstName && !errors.firstName}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formGroupFirstName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                          type="lastName" 
                          name="lastName"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                          isValid={touched.lastName && !errors.lastName}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group controlId="formGroupConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="confirmPassword"
                          value={this.state.confirmPassword}
                          onChange={this.handleChange}
                          isInvalid={!!errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group> 

                      <ReCAPTCHA
                        sitekey={CAPTCHA_SITE_KEY}
                      />
                      
                      <div className="signup-button">
                        <Button variant="primary" type="submit" onClick={(event) => this.onRegister(event)}>
                          <div className="signup-button-content">Create your account now</div>
                        </Button> 
                      </div>                 
                    </div>    
                  </div> 
                </Form>
              )}
            </Formik>
            <p>Already have an account? <Link to='/login'>Sign in</Link></p>
          </Col>
        </Row>
      </div>   
    );
  }
}

export default withContext(Register);