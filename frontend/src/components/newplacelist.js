import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/NewPlacesList.css';
import { NavLink } from 'react-router-dom';
import '../css/button.css';
import Mybot from './Mybot';
  

function NewPlacesList() {
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

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Mybot/>
      <div className="search-box">
        <input type="text" placeholder="Search places" value={searchQuery} onChange={handleSearch} />
      </div>
      <div className="places-list">
        {filteredPlaces.map((place) => (
          <div className="place-box" key={place._id}>
            <h3>{place.name}</h3>
            <img src={place.image} alt={place.name} />
            <p>{place.location}</p>
            <p>{place.description}</p>
             {/* <NavLink to={`/add/${place.name}`}><button className="mybtn">Book</button></NavLink>  */}
              <NavLink to={`/addAdventure`} ><button className="my3">Book</button></NavLink> 
         
             
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default NewPlacesList;
