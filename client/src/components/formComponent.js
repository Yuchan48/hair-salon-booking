import "./formComponent.css";

import React, { useState } from "react";

function FormComponent(props) {
  //bookedDataParent
  const [formFirstname, setFormFirstname] = useState([]);
  const [formLastname, setFormLastname] = useState([]);
  const [formEmail, setFormEmail] = useState([]);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const isDataValid = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z ]*)*$/;
    if (formFirstname.length === 0 || formLastname.length === 0 || formEmail.length === 0) {
      alert("required field missing");
      return false;
    } else if (!formFirstname.match(nameRegex)) {
      alert("invalid first name");
      return false;
    } else if (!formLastname.match(nameRegex)) {
      alert("invalid last name");
      return false;
    } else if (!formEmail.match(emailRegex)) {
      alert("invalid email");
      return false;
    }  else if (
      formLastname.match(nameRegex) &&
      formEmail.match(emailRegex) &&
      formEmail.match(emailRegex)
    ) {
      return true;
    }
  };

  const findData = async () => {
    if (isDataValid() === true) {
      try {
        let res = await fetch("http://localhost:5000/api/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formFirstname,
            lastName: formLastname,
            email: formEmail,
          }),
        });
        res = await res.json();
        if (res.length === 0){
          alert("we don't find any booking");
        }
        let tempArr = [];
        res.forEach((ele) => {
          const getAllData = [];
          getAllData.push(ele.selectedTime, ele.selectedDate, ele._id);
          tempArr.push(getAllData);
        });
        props.bookedDataParent(tempArr);

      } catch (error) {
        console.log("error: ", error);
        alert("there was an error sending the data");
      }
    }
  };

  return (
    <>
      <h3 className="check-form-comp-title">Check or Cancel Your Booking</h3>
      <div className="check-form-container">
        <div className="check-form-row">
          <div className="check-forms-sections">
            <label htmlFor="firstName">first name</label>
            <input
              type="text"
              name="firstName"
              placeholder="first name"
              value={formFirstname}
              onChange={(e) => setFormFirstname(capitalize(e.target.value))}
            />
          </div>
          <div className="check-forms-sections">
            <label htmlFor="lastName">last name</label>
            <input
              className="check-form-names"
              type="text"
              name="lastName"
              placeholder="last name"
              value={formLastname}
              onChange={(e) => setFormLastname(capitalize(e.target.value))}
            />
          </div>
        </div>

        <div className="check-forms-sections">
          <label htmlFor="email">email</label>
          <input
            className="check-form-names"
            type="email"
            name="email"
            placeholder="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value.toLowerCase())}
          />
        </div>
      </div>

      <div className="check-form-btn-section">
        <button onClick={() => findData()}>
          Check &nbsp;<i className="fas fa-search"></i>
        </button>
      </div>
    </>
  );
}

export default FormComponent;
