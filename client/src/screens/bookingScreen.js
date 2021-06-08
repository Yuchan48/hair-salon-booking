import "./bookingScreen.css";
import HomebtmImg from "../product_image/hair-set.jpg";
import { useHistory } from "react-router-dom";

//import axios from "axios";

//components
import DateComponent from "../components/dateComponent";
import ServiceComponent from "../components/serviceComponent";

import React, { useState } from "react";
import { Jumbotron, Button } from "reactstrap";

function BookingScreen() {
  //serviceComponent
  const [serviceSelection, setServiceSelection] = useState([]);

  //dateComponent
  const [dateSelection, setDateSelection] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);

  //form
  const [formFirstname, setFormFirstname] = useState([]);
  const [formLastname, setFormLastname] = useState([]);
  const [formEmail, setFormEmail] = useState([]);

  const isDataValid = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z ]*)*$/;
    if (!formFirstname.match(nameRegex)) {
      alert("invalid first name");
      return false;
    } else if (!formLastname.match(nameRegex)) {
      alert("invalid last name");
      return false;
    } else if (!formEmail.match(emailRegex)) {
      alert("invalid email");
      return false;
    } else if (
      formLastname.match(nameRegex) &&
      formEmail.match(emailRegex) &&
      formEmail.match(emailRegex)
    ) {
      return true;
    }
  };

  let history = useHistory();

  const saveBooking = async () => {
    if (isDataValid() === true) {
      try {
        let res = await fetch("http://localhost:5000/api/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formFirstname,
            lastName: formLastname,
            email: formEmail,
            selectedTime: selectedTime,
            selectedDate: dateSelection,
            service: serviceSelection,
          }),
        });
        await res.json();
        console.log("booking saved");
        history.push(`/confirmed/${dateSelection}/${selectedTime}`);
      } catch (err) {
        console.log("error: ", err);
        alert("there was an error processing your booking");
      }
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="booking-container">
      <div className="top-booking">
        <Jumbotron className="jumbo-booking">
          <h1 className="display-1 text-white">Hair Salon</h1>
          <Button href="/booking/" className="booking-btn" color="danger">
            Book Now
          </Button>
        </Jumbotron>
      </div>

      <div className="bottom-booking">
        <div className="btm-left-booking">
          <h3>Book an appointment</h3>
          <div className="booking-form-place">
            <div className="booking-form-container">
              <div className="booking-form-row">
                <div className="booking-forms-sections">
                  <label htmlFor="firstName">first name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="first name"
                    value={formFirstname}
                    onChange={(e) => setFormFirstname(capitalize(e.target.value))}
                  />
                </div>
                <div className="booking-forms-sections">
                  <label htmlFor="lastName">last name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="last name"
                    value={formLastname}
                    onChange={(e) => setFormLastname(capitalize(e.target.value))}
                  />
                </div>
              </div>

              <div className="booking-forms-sections">
                <label htmlFor="email">email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value.toLowerCase())}
                />
              </div>
            </div>
          </div>

          <ServiceComponent
            className="boxs-booking"
            serviceSelectionParent={(arr) => setServiceSelection(arr)}
          />

          <DateComponent
            className="boxs-booking"
            dateSelectionParent={(arr) => setDateSelection(arr)}
            selectedTimeParent={(arr) => setSelectedTime(arr)}
          />

          {serviceSelection.length > 0 &&
          dateSelection.length > 0 &&
          selectedTime.length > 0 &&
          formFirstname.length > 0 &&
          formLastname.length > 0 &&
          formEmail.length > 0 ? (
            <div className="booking-form-btn-section">
              <div className="booking-btn-section-width">
                <button onClick={() => saveBooking()}>Book Now</button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="btm-right-booking">
          <img src={HomebtmImg} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default BookingScreen;
