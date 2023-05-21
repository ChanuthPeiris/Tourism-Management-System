import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "@fortawesome/fontawesome-free/css/all.css";
import Swal from 'sweetalert2';

export default class TableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteAdventure = this.deleteAdventure.bind(this);
  }

  deleteAdventure() {
    const { obj, deleteAdventureFromState, setAlert } = this.props;
  
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this adventure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:8040/adventure/delete/' + obj._id)
          .then(() => {
            deleteAdventureFromState(obj._id);
            setAlert({
              type: 'success',
              message: 'Adventure deleted successfully',
            });
            setTimeout(() => setAlert(null), 3000);
          })
          .catch(err => {
            console.log(err);
            setAlert({
              type: 'error',
              message: 'Failed to delete adventure. Please try again!',
            });
            setTimeout(() => setAlert(null), 3000);
          });
      } else {
        setAlert({
          type: 'info',
          message: 'Delete action was cancelled',
        });
        setTimeout(() => setAlert(null), 3000);
      }
    });
  }
  
  
  

  render() {
    return (
     
      <tr>
        <td>{this.props.obj.userName}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.telephone}</td>
        <td>{this.props.obj.place}</td>
        <td>{this.props.obj.date_and_time}</td>
        <td>{this.props.obj.countOFmembers}</td>
        <td>
          <Link to={"/update/" + this.props.obj._id} className='mybtn'>  Edit  <i class="fa-solid fa-pen-to-square"></i> </Link>
        </td>
        <td>
          <button className='mybtnD' onClick={this.deleteAdventure}>Delete<i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
     
    );
  }
}
