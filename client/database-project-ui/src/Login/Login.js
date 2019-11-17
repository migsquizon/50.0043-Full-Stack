import React, {Component} from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
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

  componentDidMount() {
    document.body.style.background = "#EEEFF3";
    console.log(this.props.location.pathname);
   }

   onLogin(event) {
     console.log("HI");
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
            sutd glassdoor
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

export default Login;
// import React, {Component} from 'react';
// import axios from 'axios';
// import { Button } from 'react-bootstrap';
// import { Form } from 'react-bootstrap';
// import { Row } from 'react-bootstrap';
// import { Col } from 'react-bootstrap';
// import WriteReview from '../write-review/write-review';
// import './login.css';

// class Login extends Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {email: '',
//                   password: ''};
    
//     this.onChange = this.onChange.bind(this);
//     this.onLogin = this.onLogin.bind(this);
//   }
  
//   onChange(event) {
//     this.setState({email: event.target.email,
//                    password: event.target.password})
//   }
  
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
  
//   render() {
//     return(
//       <React.Fragment>
//         <Form>
//           <Row>
//             <Col xs={1}></Col>
//             <Col xs={10}>
//               <Form.Group controlId="formBasicEmail">
//                 <Form.Label>Email Address</Form.Label>
//                 <Form.Control type="email" placeholder="Enter your Email" />
//                 <Form.Text className="text-muted">We'll never share your information with anyone else.
//                 </Form.Text>
//               </Form.Group>
//               <Form.Group controlId="formBasicPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" placeholder="Password" />
//               </Form.Group>
//               <Form.Group controlId="formBasicChecbox">
//                 <Form.Check type="checkbox" label="Check me out" />
//               </Form.Group>
//               <Button variant="primary" type="submit" onClick={(event) => this.onLogin(event)}>
//                 Submit
//               </Button>
//             </Col>
//             <Col xs={1}></Col>
//           </Row>
//         </Form>
//       </React.Fragment>
//     )
//   }
// }

// export default Login;