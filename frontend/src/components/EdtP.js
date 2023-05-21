import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/NewPlacesList.css'
import { NavLink } from 'react-router-dom';
import Place from './Place';
export default function EdtP() {
    const [alert, setAlert] = useState(null); // add state for alert
    const [places, setPlaces] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      axios.get('http://localhost:8040/place')
        .then((response) => {
          setPlaces(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);
  
    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:8040/place/delete/${id}`)
        .then((response) => {
          setPlaces(places.filter(place => place._id !== id));
        })
        .catch((error) => {
          console.error(error);

          alert("Deleted!")
        });
    };
  
    const handleUpdate = (id, updatedPlace) => {
      axios.put(`http://localhost:8040/place/update/${id}`, updatedPlace)
        .then((response) => {
          setPlaces(places.map(place => {
            if (place._id === id) {
              return response.data;
            }
            return place;
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    const filteredPlaces = places.filter(place =>
      place.name && place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  
  
    return (
      
      <div>
        
        <div className="smallone">
  <nav className="vertical-nav">
    <ul>
      <li>
        <NavLink to="/addplace" activeClassName="active" className="vertical-nav-link">
          Add places
        </NavLink>
      </li>
    </ul>
  </nav>


          
          <div className="content">
            {/* Render the content for the selected route */}
          </div>
        </div>
       
        <div className="search-box">
          <input type="text" placeholder="Search places" value={searchQuery} onChange={handleSearch} />
        </div>
        <div className="places-list">
          {filteredPlaces.map((place) => (
            <Place key={place._id} place={place} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))}
        </div>
      </div>
    );
}
