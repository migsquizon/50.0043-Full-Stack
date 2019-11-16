
import React from 'react';
import logo from './logo.svg';
import BookCard from './BookCard.js';
import './App.css';
import BookCarousel from './BookCarousel';
import BookInfo from './BookInfo';
import Navbar from './Navbar.js';
import LoginPage from './LoginPage.js'

function App() {
  return (
    <div className="App">
      <Navbar />
      <BookInfo/>
      
    </div>
  );
}

export default App;
