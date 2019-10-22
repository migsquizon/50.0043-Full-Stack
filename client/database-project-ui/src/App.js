import React from 'react';
import logo from './logo.svg';
import BookCard from './BookCard.js';
import './App.css';
import BookCarousel from './BookCarousel';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        <BookCarousel/>
      </header>
    </div>
  );
}

export default App;
