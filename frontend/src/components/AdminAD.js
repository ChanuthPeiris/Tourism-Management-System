
import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import '../css/tablerow.css';
import '../css/button.css';
import '../css/AddAevent.css';
 
export default class AdminAD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adventure: [],
      searchQuery: '', // add this line
    };
    this.deleteAdventureFromState = this.deleteAdventureFromState.bind(this);
  }
  
  componentDidMount() {
    axios.get('http://localhost:8040/adventure')
      .then(response => {
        this.setState({ adventure: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteAdventureFromState(id) {
    const adventures = this.state.adventure.filter(adventure => adventure._id !== id);
    this.setState({ adventure: adventures });
  }
  handleInputChange = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
  };
  filteredRows = () => {
    return this.state.adventure.filter((row) =>
      Object.values(row)
        .join('')
        .toLowerCase()
        .includes(this.state.searchQuery.toLowerCase())
    );
  };


  
  tabRow() {
    return this.filteredRows().map((object, i) => {
      return <TableRow obj={object} key={i} deleteAdventureFromState={this.deleteAdventureFromState} />;
    });
  }

  render() {
    return (
    
      <div>
    
        <h3 className ="my3">Welcome to Outdoor and adventure Experience Management (Admin view)</h3>
        <h3 className ="my3">Adventure & Event Booking List </h3> 
        
        <div className="admin-search" style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}/>
        </div>
        <table id="customers"> 
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>place</th>
              <th>Date_and_Time</th>
              <th>Count_Of_members</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.tabRow()}
          </tbody>
        </table>
      </div>
    );
  }
}
