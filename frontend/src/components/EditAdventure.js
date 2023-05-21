import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/AddAevent.css';
import Swal from 'sweetalert2';

export default function EditAdventure() {
  const param = useParams();
  const [email, setEmail] = useState('');
  const [userName, setUser] = useState('');
  const [telephone, setTelephone] = useState('');
  const [place, setPlace] = useState('');
  const [date_and_time, setDate] = useState('');
  const [countOFmembers, setCount] = useState('');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    function loadUser() {
      axios
        .get(`http://localhost:8040/adventure/get/${param.id}`)
        .then((response) => {
          setUser(response.data.adventure.userName);
          setEmail(response.data.adventure.email);
          setTelephone(response.data.adventure.telephone);
          setPlace(response.data.adventure.place);
          setDate(response.data.adventure.date_and_time);
          setCount(response.data.adventure.countOFmembers);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
    loadUser();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const newAdventure = {
      userName,
      email,
      telephone,
      place,
      date_and_time,
      countOFmembers,
    };

    axios
      .put(`http://localhost:8040/adventure/update/${param.id}`, newAdventure)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Data Updated Successfully',
        });
        setTimeout(() => {
          // Redirect or perform any other action after success
        }, 2000); // Set delay for 2 seconds
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Failed to update data',
          text: 'Please try again!',
        });
      });
  }

  return (
    <div>
      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
          <button onClick={() => setAlert(null)}>x</button>
        </div>
      )}
      <div className="containerZ">
        <form id="contactZ" onSubmit={onSubmit}>
          <h3 className="title">Edit Adventure Event</h3>
          <br></br>

          <label>Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUser(e.target.value)}
          />

          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Telephone:</label>
          <input
            type="tel"
            name="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />

          <label>Place:</label>
          <input
            type="text"
            name="place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />

          <label>Date and Time:</label>
          <input
            type="text"
            className="form-control"
            name="date_and_time"
            value={date_and_time}
            onChange={(e) => setDate(e.target.value)}
            />
                  <label>Count of Members:</label>
      <input
        type="number"
        name="countOFmembers"
        value={countOFmembers}
        onChange={(e) => setCount(e.target.value)}
      />

      <button type="submit" className="my3">
        UPDATE
      </button>
    </form>
  </div>
</div>
  )}