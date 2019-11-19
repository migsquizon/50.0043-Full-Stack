import React, {Component} from 'react';
import axios from "axios";
import { throws } from 'assert';
const Axios = axios.create();

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
  }

  getQuery = () => {
    return this.state.query;
  }

  login = (credentials) => {
        // this.setState({
        // user: true
        // });
        localStorage.setItem("user", true);
    }



  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log("HI");
    this.setState({
      user: {},
      token: '',
    })
  }

  register = (userInfo) => {
    return axios.post('http://13.229.185.245:5000/signup', userInfo)
      .then(response => {
        const { user, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({
          user,
          token
        });
        return response;
    })
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
