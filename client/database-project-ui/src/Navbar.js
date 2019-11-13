import React from 'react';
import './Navbar.css';

function Navbar(props) {
    return(
      <header className="nav-header">
        <nav className="nav-container">
          <div className="row">
            <div className="col-4">
              <div className="name">
                The Library
              </div>
            </div>
            <div className="col-8">
              <div className="nav-menu">
                <ul className="nav-menu-list">
                  <li className="nav-item">
                    <a href="/" className="nav-a">Home</a>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-a">Login</a>
                  </li>
                  <li className="nav-item">
                    <a href="/register" className="nav-a">Register</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
    </header>
    );
}

export default Navbar;