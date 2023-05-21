import React, { useEffect, useState } from 'react';
import '../css/NewPlacesList.css';
import { NavLink } from 'react-router-dom';
import '../css/button.css';
import '../css/EdtP.css';
import Swal from 'sweetalert2';


function Place({ place, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(place.name);
  const [location, setLocation] = useState(place.location);
  const [image, setImage] = useState(place.image);
  const [description, setDescription] = useState(place.description);

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this place!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(place._id);
        Swal.fire('Deleted!', 'Place has been deleted.', 'success');
      }
    });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const updatedPlace = {
      name,
      location,
      image,
      description,
    };
  
    onUpdate(place._id, updatedPlace);
    setIsEditing(false);
    Swal.fire('Success!', 'Place has been updated successfully!', 'success');
  };
  

  if (isEditing) {
    return (
      <div className="EDTBOX" key={place._id}>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          <label>Image: (Disabled)</label>
          <input type="text" disabled value={image} onChange={(e) => setImage(e.target.value)} />
          <label>Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button className='mybtnD' type="submit">Save</button>
        </form>
      </div>
    );
  }

  return (
    <div className="place-box" key={place._id}>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>{location}</p>
      <p>{description}</p>
      <div className="place-actions">
        <button className='mybtnD' onClick={() => setIsEditing(true)}>Edit</button>
        <button className='mybtnD' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Place;
