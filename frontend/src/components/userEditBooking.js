
import React, { useEffect ,useState} from 'react';
import axios from 'axios';
import '../css/AddAevent.css';
import { useParams } from "react-router-dom";
 
 
export default function Edit() {
  const param = useParams();
  const [email, setEmail] = useState( "" );
  const [userName, setUser] = useState( "" );
  const [telephone, setTelephone] = useState( "" );
  const [place, setPlace] = useState( "" );
  const [date_and_time,setDate]=useState("");
  const [countOFmembers, setCount] = useState( "" );

  useEffect(() => {
    function loadUser(){
      axios.get("http://localhost:8040/adventure/get/643f8bc9c2423f44b4bc0cb5").then ((response)=>{
        setUser(response.data.adventure.userName);
        setEmail(response.data.adventure.email);
        setTelephone(response.data.adventure.telephone);
        setPlace(response.data.adventure.place);
        setDate(response.data.adventure.date_and_time);
        setCount(response.data.adventure.countOFmembers);
      }).catch ((error) =>{
        alert(error.message);
      })

    }
    loadUser();
  }, []);
          
  function onSubmit(e){
    e.preventDefault();
    const newAdventure = {
      userName,
      email,
      telephone,
      place,
      date_and_time,
      countOFmembers
    }
    axios.put("http://localhost:8040/adventure/update/643f8bc9c2423f44b4bc0cb5", newAdventure).then(()=>{
      alert("Details are updated");
      window.location ="/admin";
    }).catch( (error)=> {
      alert(error.message);
    })
  }

    return (
      <div className="containerZ">
       
           
          
          <form id ="contactZ" onSubmit={onSubmit}>
          <h3>Edit Event- user</h3>
          <br></br>
             
              <label>Name:</label>
              <input type="text"   id="userName" name="userName" value={userName}   onChange={(e)=> setUser(e.target.value)}  /> 
  
         
           
              <label>Email:</label>
              <input type="email"   id="email " name="email" value={email}    onChange={(e)=> setEmail(e.target.value)} />
            
             
              <label>Telephone:</label>
              <input type="tel"   name="telephone" value={telephone}    onChange={(e)=> setTelephone(e.target.value)}  />
         
            
              <label>Place:</label>
              <input type="text"   name="place" value={place}    onChange={(e)=> setPlace(e.target.value)} />
         
         
              <label>Date and Time:</label>
              <input type="text" className="form-control"  name="date_and_time"  value={date_and_time}    onChange={(e)=> setDate(e.target.value)}  />
          
            
              <label>Count of Members:</label>
              <input type="number"   name="countOFmembers" value={countOFmembers}    onChange={(e)=> setCount(e.target.value)}  />
        
            <button type="submit" >UPDATE</button>
          </form>
        </div>
      
    );
 
    }