
import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';


//Compoenents
import BookCard from './Book/BookCard.js';
import BookCarousel from './Book/BookCarousel';
import BookInfo from './Book/BookInfo';
import Navbar from './Navbar/Navbar.js';
import LoginPage from './Login/LoginPage.js'

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route exact path='/' component={BookInfo}/>  
        <Route path='/login' component={LoginPage}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
