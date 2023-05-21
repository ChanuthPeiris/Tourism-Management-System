import React, { useState } from 'react';
import axios from 'axios';
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import '../css/AddPlace.css';

function AddPlace() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPlace = { name, location, image, description };

    axios.post('http://localhost:8040/place/add', newPlace)
      .then(() => {
        setAlert({
          type: 'success',
          message: 'Place added successfully',
        });
        setName('');
        setLocation('');
        setImage('');
        setDescription('');
        setTimeout(() => setAlert(null), 1500); // set delay for 3 seconds (3000 milliseconds)
      })
      .catch(() => {
        setAlert({
          type: 'error',
          message: 'Failed to add place. Please try again!',
        });
        setTimeout(() => setAlert(null), 3000); // set delay for 3 seconds (3000 milliseconds)
      })
  }

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await ImagetoBase64(file);
      setImage(base64);
    }
  };

  return (
    <form className="add-place-form" onSubmit={handleSubmit}>
      <h3> Add Places</h3>
      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
          <button onClick={() => setAlert(null)}>x</button>
        </div>
      )}
      <div className="form-group">
        <label className="form-label" htmlFor="name">Name:</label>
        <input className="form-input" type="text" placeholder='Add the place name' id="name" value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="location">Location:</label>
        <input className="form-input" type="text" id="location" placeholder='Add the place location' value={location} onChange={(event) => setLocation(event.target.value)} />
      </div>
      <div className="form-group file-input">
        <label className="form-label" htmlFor="image">Image:</label>
        <input className="form-input" type="file" id="image" onChange={uploadImage} />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">Description:</label>
        <textarea className="form-input" id="description" placeholder='Add the description' value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
      </div>
      {/* <div className="form-group">
  <label className="form-label" htmlFor="description">Description:</label>
  <textarea
    className="form-input"
    id="description"
    placeholder="Add the description"
    value={description}
    onChange={(event) => {
      if (event.target.value.length <= 500) {
        setDescription(event.target.value);
      }
    }}
    maxLength={756}
  ></textarea>
  <p className="character-count">{description.length}/756 characters</p>
</div> */}

      <button className="submit-button" type="submit">Add Place</button>
    </form>
  );
}

export default AddPlace;
