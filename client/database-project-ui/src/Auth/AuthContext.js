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

//var API_URL = 'http://10.12.185.9:3000/'

export class AuthProvider extends Component {

  constructor() {
    super();
    this.state = { 
      user: (localStorage.getItem("user") || {}),
      token: (localStorage.getItem("token") || ""),
      admin: false,
      user: false,
      sidebar: 'dashboard'
    }
    
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.register = this.register.bind(this);

  }

  // componentDidMount() {
  //   localStorage.removeItem("admin");
  // }

  login = (credentials) => {
    this.setState({
      user: true
    });
  }

  // login = (credentials) => {
  //   return axios.post('http://10.12.185.9:3000/auth/login', credentials)
  //     .then(response => {
  //       const { token, user } = response.data;
  //       localStorage.setItem("token", token);
  //       localStorage.setItem("user", JSON.stringify(user));
  //       this.setState({
  //         user,
  //         token,
  //       });
  //       return response;
  //   })
  // }

  logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.setState({
      user: {},
      token: '',
    })
  }

  register = (userInfo) => {
    return axios.post('http://10.12.185.9:3000/auth/signup', userInfo)
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
          adminLogin: this.adminLogin,
          goToDashboard: this.goToDashboard,
          goToRequests: this.goToRequests,  
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
