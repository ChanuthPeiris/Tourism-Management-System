import React, { useState } from 'react';
import axios from "axios";
import '../css/AddAevent.css';
import '../css/alert.css';
import Logo from '../Images/logo.png';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
// import 'react-datepicker/dist/react-datepicker.css';


export default function AddAevent() {
  const [alert, setAlert] = useState(null);
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [date_and_time, setDate] = useState(null);
  const [countOFmembers, setCount] = useState("");

  function sendData(e) {
    e.preventDefault();

    const selectedDateTime = date_and_time;
    const currentDateTime = new Date();
    

    // if (selectedDateTime < currentDateTime) {
    //   setAlert({
    //     type: 'error',
    //     message: 'Please select a future date and time.'
    //   });
    //   return;
    // }

    const newAdventure = {
      userName,
      email,
      telephone,
      place,
      date_and_time: selectedDateTime,
      countOFmembers,
    };

    axios
      .post("http://localhost:8040/adventure/add", newAdventure)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Booking Added",
          text: "Booking added successfully!",
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "Failed to book a place. Please try again!",
        });
      })
      .finally(() => {
        const pdf = new jsPDF();
        pdf.setFontSize(17);

        pdf.addImage(Logo, 'PNG', 18, 10, 30, 20);
        const text = 'Adventure Event Booking Details';
        const textWidth = pdf.getTextWidth(text);
        const startX = (pdf.internal.pageSize.width - textWidth) / 2;
        pdf.text(text, startX, 25);

        const tableColumns = ["Field", "Value"];
        const tableRows = [
          ["Name", userName],
          ["Booking date", new Date().toLocaleDateString()],
          ["Email", email],
          ["Phone Number", telephone],
          ["Place", place],
          ["Date and Time", selectedDateTime.toLocaleString()],
          ["Number of Participants", countOFmembers],
          ["Cost (RS)", countOFmembers * 1050]
        ];

        pdf.autoTable({
          head: [tableColumns],
          startY: 30,
          theme: 'striped',
          styles: {
            cell: {
              borderBottom: '1px solid red',
              lineWidth: 1.5,
            },
          },
        });

        pdf.autoTable({
          body: tableRows,
          startY: 40,
          theme: 'striped',
          styles: {
            cell: {
              borderBottom: '5px solid red',
              lineWidth: 1.5,
            },
          },
        });

        pdf.save('adventure-report.pdf');
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
        <form id="contactZ" onSubmit={sendData}>
          <h3>Booking An Event</h3>
          <br />

          <fieldset>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="Your name"
              type="text"
              tabIndex="1"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="Your Email Address"
              type="email"
              tabIndex="2"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              placeholder="Your Phone Number"
              type="tel"
              pattern="[7-9]{1}[0-9]{9}"
              title="Phone number with 7-9 and remaining 9 digits with 0-9"
              required
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <label htmlFor="place">Place</label>
            <input
              id="place"
              placeholder="Enter the place"
              type="text"
              tabIndex="4"
              required
              onChange={(e) => {
                setPlace(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
          <label htmlFor="Date and Time">Date and time</label>
            <DatePicker
              id="datetime"
              placeholderText="Select the date"
              selected={date_and_time}
              onChange={(date) => setDate(date)}
              minDate={new Date()}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="yyyy-MM-dd HH:mm"
              className="custom-datepicker"
            />
          </fieldset>

          <fieldset>
            <label htmlFor="participants">Count of Participants</label>
            <br />
            <input
              id="participants"
              placeholder="Select"
              type="number"
              tabIndex="6"
              required
              onChange={(e) => {
                setCount(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <button type="submit" id="contact-submit" data-submit="...Sending">
              ADD
            </button>
          </fieldset>

          <fieldset>
            <button type="submit" id="download-btn">
              Download PDF
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
