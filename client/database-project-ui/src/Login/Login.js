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
  email: yup
    .string()
    .email()
    .required('Please enter your email'),
  password: yup
    .string()
    .required('Please enter your password'),
});

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {email: '',
                  password: ''};
    
    this.handleChange = this.handleChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  // componentDidMount() {
  //   document.body.style.background = "#EEEFF3";
  //   console.log(this.props.location.pathname);
  //  }

   onLogin = (e) => {
     const payload = {
       loginEmail: this.state.email,
       loginPassword: this.state.password
     }
     e.preventDefault();
     this.props.login(payload);
     this.props.history.push("/");  
   }

   //   onLogin(event) {
//     var API_URL_LOGIN = 'http://10.12.7.122:5000/auth/login';
//     var self = this;
//     var particulars = {"email": this.state.email,
//                        "password": this.state.password};
//     axios.post(API_URL_LOGIN, particulars)
//       .then(function(response) {
//         if (response.data.code === 200) {
//           var uploadScreen = [];
//           uploadScreen.push(<WriteReview appContext={self.props.appContext}/>) 
//           self.props.appContext.setState({loginPage:[], uploadScreen:uploadScreen})
//         } else if (response.data.code === 204) {
//             console.log("Username password do not match");
//             alert("username password do not match")
//         } else {
//           console.log("Username does not exist");
//           alert("Username does not exist");
//         }
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
//   }
  
  handleChange(event) {
    this.setState({email: event.target.email,
                   password: event.target.email})
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
                email: '',
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
                    <Form.Group controlId="formGroupEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isValid={touched.email && !errors.email}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="password"
                        value={values.password}
                        onChange={handleChange}
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
