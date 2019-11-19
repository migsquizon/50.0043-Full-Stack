
import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import './App.css';


//Compoenents
import BookCard from './Book/BookCard.js';
import BookCarousel from './Book/BookCarousel';
import BookInfo from './Book/BookInfo';
import Navbar from './Navbar/Navbar.js';
import Login from './Login/Login.js'
import Register from './Register/Register.js'
import AddReview from './containers/AddReview'
import AddBook from './containers/AddBook'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        {/* <Router>
          <Switch>
            <Route exact path='/' component={BookInfo}/>  
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
          </Switch>
        </Router> */}
        <AddBook/>
      </AuthProvider>
    </div>
  );
}

export default App;
