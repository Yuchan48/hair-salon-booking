import "./bookingScreen.css";
//import axios from "axios";

//components
import DateComponent from "../components/dateComponent";
import ServiceComponent from "../components/serviceComponent";

import React, { useState, useEffect } from "react";
import { Jumbotron, Button, Container, Row, Col } from "reactstrap";

function BookingScreen() {
  //const [bookingError, setBookingError] = useState(false);
  const [serviceSelection, setServiceSelection] = useState([]);
  
  /*
  const [selection, setSelection] = useState({
    service: "",
    selectedDate: new Date(),
    selectedTime: null,
  });*/
  
  const [ dateSelection, setDateSelection] = useState([]);
  const [ selectedTime, setSelectedTime] = useState([]);
  console.log('selectedTime:', selectedTime)

  /*const [bookingInfo, setBookingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });*/

  

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
        
        <div  className="btm-left-booking">  
            <h3>Book Here</h3>       
            <ServiceComponent
              className="boxs-booking"
              serviceSelectionParent={(arr) => setServiceSelection(arr)}
            />

            <DateComponent
              className="boxs-booking"
              dateSelectionParent={(arr) => setDateSelection(arr)}
              selectedTimeParent={(arr) => setSelectedTime(arr)}             
            />         
        </div>
         
         <div className="btm-right-booking"></div>
      </div>
    </div>
  );
}

export default BookingScreen;
