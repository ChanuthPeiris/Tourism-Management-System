import React, { Component } from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddAevent from './components/AddAevent'
import 'bootstrap/dist/css/bootstrap.min.css';
import EditAdventure from './components/EditAdventure';
import Edit from './components/userEditBooking';
import AddPlace from './components/AddPlace';
import NewPlacesList from './components/newplacelist';
import Mybot from './components/Mybot';
import EdtP from './components/EdtP';
import UpdateP from './components/UpdateP';
import AdminAD from './components/AdminAD';
import Navbar from './components/Navbar';
import MainAdmin from './components/MainAdmin';
import Home from './components/Pages/Home';
 

export default class App extends Component {
  render() {
    return (
     
      <Router>
         <Navbar/>
     
      <Routes>

        <Route path='' exact Component={Home}/>
        <Route path="/Main" element={<MainAdmin/> } />
        <Route path="/addAdventure" element={<AddAevent/>} />
        <Route path="/BookingAdventure" element={<AdminAD/>} />
        <Route path="/update/:id" element={<EditAdventure/>} />
        <Route path="/mybot" element={<Mybot/>} />
        <Route path="/userEdit/:id" element={<Edit/>} />
        <Route path="/addplace" element={<AddPlace/>} />
        <Route path="/see" element={<NewPlacesList/>} />
        <Route path="/dashboard" element={<EdtP/>} />
        <Route path="/edit/:id" component={UpdateP} />
      

      </Routes>
      </Router>


       
      
    )
  }
}
