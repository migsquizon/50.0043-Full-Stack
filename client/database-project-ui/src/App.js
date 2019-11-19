
import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import  ProtectedRoute  from './Auth/ProtectedRoute';
import './App.css';


//Compoenents
import BookCard from './Book/BookCard.js';
import BookCarousel from './Book/BookCarousel';
import BookInfo from './Book/BookInfo';
import Navbar from './Navbar/Navbar.js';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import AddReview from './containers/AddReview';
import AddBook from './containers/AddBook';
import Home from './Home/Home.js';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home}/>  
            <Route path='/book-info' component={BookInfo}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <ProtectedRoute path='/add-book' component={AddBook}/>
            <ProtectedRoute path='/add-review' component={AddReview}/>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
