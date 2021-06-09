import "./checkScreen.css";
import React, { useState } from "react";
import { Jumbotron, Button } from "reactstrap";

import HomebtmImg from "../product_image/hair-set.jpg";

import FormComponent from "../components/formComponent";

function CheckScreen() {
  //form
  const [bookedData, setBookedData] = useState([]);

  const deleteData = async (item) => {
    if (window.confirm("Are you sure to delete this booking ?") === true) {
      try {
        let res = await fetch(`http://localhost:5000/api/delete/${item[2]}`, {
          method: "GET",
        });
        await res.json();
        console.log("deleted");
        const updateItem = bookedData.filter(ele => ele[2] !== item[2])
        setBookedData(updateItem);
      } catch (err) {
        console.log("error: ", err);
        alert("there was an error deleting booking");
      }
    }
  };

  return (
    <div className="check-container">
      <div className="check-top">
        <Jumbotron className="check-jumbo">
          <h1 className="display-1 text-white">Hair Salon</h1>
          <Button href="/booking/" className="check-btn" color="danger">
            Book Now
          </Button>
        </Jumbotron>
      </div>

      <div className="check-bottom">
        <div className="check-bottom-left">
          {bookedData.length === 0 ? (
            <FormComponent bookedDataParent={(arr) => setBookedData(arr)} />
          ) : (
            <div className="check-date-box">
              <h4>Your Booking is</h4>
              {bookedData.map((item, i) => {
                return (
                  <div className="check-date-items" key={i}>
                    <p>
                      {item[0]} &nbsp; {item[1]}
                    </p>
                    <i
                      className="fa fa-trash fa-lg booking-delete"
                      onClick={() => deleteData(item)}
                    ></i>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="check-bottom-right">
          <img src={HomebtmImg} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default CheckScreen;
