import React, {Component} from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { withContext } from '../Auth/AuthContext';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object({
  username: yup
    .string()
    .required('Please enter your username'),
  password: yup
    .string()
    .required('Please enter your password'),
});

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {username: '',
                  password: ''};
    
    this.handleChange = this.handleChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }


   onLogin = (e) => {
     const payload = {
       username: this.state.username,
       password: this.state.password
     }
     e.preventDefault();
     this.props.login(payload);
     this.props.history.push("/");  
   }
  
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  
  render() {
    return (
      <div className="login-container">
        <Row> 
          <Col></Col>
          <Col>
          <div className="login-info-title">
            {/* sutd glassdoor */}
          </div>
            <Formik
              validationSchema={schema}
              onSubmit={console.log}
              initialValues={{
                fullName: '',
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
                <Form noValidate onSubmit={handleSubmit}>
                  <div className="login-box">
                    <div className="login-box-title">
                      <p>Welcome back!</p>         
                    </div>
                    <div className="login-form-body">
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

                    <Form.Group controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="password"
                        value={values.password}
                        onChange={this.handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" onClick={(event) => this.onLogin(event)}>
                      Sign in to your account
                    </Button>
                  </div>     
                </div> 
                </Form>
                )}
              </Formik>
              <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
          </Col>
          <Col></Col>
        </Row>
      </div>   
    );
  }
}

export default withRouter(withContext(Login));
