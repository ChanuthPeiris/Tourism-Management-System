
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/AdminPanel.css' 
import EdtP from './EdtP';

export default class AdminPanel extends Component {
  render() {
    return (
      <div className="admin-panel">
        <nav className="vertical-nav">
          <ul>
            <li>
              <NavLink to="/dashboard" activeClassName="active">
                Adventure place manager
              </NavLink>
            </li>
            <li>
              <NavLink to="/BookingAdventure" activeClassName="active">
                Adventure Booking management
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" activeClassName="active">
                Flight management
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" activeClassName="active">
                Financial management
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" activeClassName="active">
                Transport management
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" activeClassName="active">
                Hotel management
              </NavLink>
            </li>
            <li>
              <NavLink to="/orders" activeClassName="active">
                Spa and Therapy Management
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="content">
          <h2>Welcome to the Admin Control System</h2>
          {/* Render the content for the selected route */}
        </div>
      </div>
    );
  }
}  