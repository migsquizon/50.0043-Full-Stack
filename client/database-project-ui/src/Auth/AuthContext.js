import React, {Component} from 'react';
import axios from "axios";
import { throws } from 'assert';
const Axios = axios.create();
require('dotenv/config');

//var API_URL = process.env.REACT_APP_API_URL;

Axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

const AuthContext = React.createContext();

export class AuthProvider extends Component {

  constructor() {
    super();
    this.state = { 
      user: (localStorage.getItem("user") || {}),
      token: (localStorage.getItem("token") || ""),
      user: false,
      query: '',
    }
    
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
    this.getQuery = this.getQuery.bind(this);
    this.getUserData = this.getUserData.bind(this);

  }

  // componentDidMount() {
  //   localStorage.removeItem("admin");
  // }

//   login = (credentials) => {
//     return axios.post('http://13.229.185.245:5000/signin', credentials)
//         .then(response => {
//             const {token, user } = response.data;
//             localStorage.setItem("token", token);
//             localStorage.setItem("user", JSON.stringify(user));
//             this.setState({
//                 user,
//                 token,
//             });
//             return response;
//         })
//   }

  sendQuery = (query) => {
      this.setState({
          query: query
      })
      localStorage.setItem("query", query);
      console.log(localStorage.getItem("query"))
  }

  getQuery = () => {
    return localStorage.getItem("query");
  }

  login = (credentials) => {
    console.log(credentials);
    return axios.post(process.env.REACT_APP_API_URL + 'signin', credentials)
      .then(response => {
      console.log(response)
      const { token, first_name, last_name, username } = response.data;
      console.log(token)
      localStorage.setItem("token", token);
      localStorage.setItem("user", true);
      
      console.log(localStorage.getItem("user"));
      localStorage.setItem("first_name", first_name);
      localStorage.setItem("last_name", last_name);
      localStorage.setItem("username", username);
      // this.setState({
      //   user: user
      // })
      return response;
      })
  
    }



  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("username");
    // this.setState({
    //   user: {},
    //   token: '',
    // })
  }

  register = (userInfo) => {
    console.log(userInfo);
    return axios.post(process.env.REACT_APP_API_URL + 'signup', userInfo)
    .then(response => {
      const { token, first_name, last_name, username } = response.data;
      console.log(token)
      console.log(response)
      localStorage.setItem("token", token);
      localStorage.setItem("user", true);

      console.log(localStorage.getItem("user"));
      localStorage.setItem("first_name", first_name);
      localStorage.setItem("last_name", last_name);
      localStorage.setItem("username", username);
          // this.setState({
          //   user: user
          // });
      return response;
    })
  
  }

  getUserData(){
      const user = {
       first_name: localStorage.getItem("first_name"),
       last_name: localStorage.getItem("last_name"),
       username: localStorage.getItem("username_name")
     }

     return user;
  }



  render() {
    return (
      <AuthContext.Provider
        value={{ 
          login: this.login,
          logout: this.logout,
          register: this.register,
          sendQuery: this.sendQuery,
          getQuery: this.getQuery,
          getUserData: this.getUserData,
          goToAddBook: this.goToAddBook,
          goToAddReview: this.goToAddReview,  
          ...this.state}}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const withContext = Component => {
  return props => {
    return (
      <AuthContext.Consumer>
        {
          globalState => {
            return (
              <Component
                {...globalState}
                {...props}
              />
            )
          }
        }
      </AuthContext.Consumer>
    )
  }
}
