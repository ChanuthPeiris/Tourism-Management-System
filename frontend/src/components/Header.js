 import React, { Component } from 'react'
 

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Detroves</a>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              
              <a className="nav-link" href="#"></a>
              <a className="nav-link" href="/adminAD">Hotel</a>
              <a className="nav-link" href="/dash">Flights</a>
              <a className="nav-link" href="/userEdit/:id">user Edit</a>
              <a className="nav-link" href="#">Car Rental</a>
              <a className="nav-link" href="/admin">Admin view</a>
              <a className="nav-link" href="/place">Adventure</a>
              <a className="nav-link" href="/edit/id">Payment</a>
              <a className="nav-link" href="/addplace">Blog</a>
              <a className="nav-link" href="/see">Event</a>
              <a className="nav-link" href="/mychat">Spa</a>
            
              
            </div>
          </div>
        </div>
        
      </nav>
      </div>
    )
  }
}
