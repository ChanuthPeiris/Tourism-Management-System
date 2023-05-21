import React, { useState, useEffect } from 'react';
import { getPlaces, deletePlace, updatePlace } from '../api';
import Place from './Place';

function PlacesList() {
  const [places, setPlaces] = useState([]);
  const [editingPlaceId, setEditingPlaceId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const places = await getPlaces();
      setPlaces(places);
    }
    fetchData();
  }, []);

  const handleDelete = async (placeId) => {
    await deletePlace(placeId);
    const updatedPlaces = places.filter((place) => place._id !== placeId);
    setPlaces(updatedPlaces);
  };

  const handleUpdate = async (placeId, updatedPlace) => {
    await updatePlace(placeId, updatedPlace);
    const updatedPlaces = places.map((place) => {
      if (place._id === placeId) {
        return { ...place, ...updatedPlace };
      }
      return place;
    });
    setPlaces(updatedPlaces);
    setEditingPlaceId(null);
  };

  return (
    <div>
      <div className="search-box">
        <input type="text" placeholder="Search for a place" />
        <button>Search</button>
      </div>
      <div className="places-list">
        {places.map((place) => (
          <Place
            key={place._id}
            place={place}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
            isEditing={place._id === editingPlaceId}
            onEdit={() => setEditingPlaceId(place._id)}
          />
        ))}
      </div>
    </div>
  );
}

export default PlacesList;
