import "./bookingScreen.css";
import HomebtmImg from "../product_image/hair-set.jpg";
import { useDispatch, useSelector } from "react-redux";

//components
import DateComponent from "../components/dateComponent";
import ServiceComponent from "../components/serviceComponent";

import React, { useState, useEffect } from "react";
import { Jumbotron, Button } from "reactstrap";
import { nameBooking, saveBooking } from "../redux/actions/bookingActions";
import { BOOKING_SAVE_RESET } from "../redux/constants/bookingConstants";
import LoadingBox from "../components/LoadingBox";
import ErrorMessage from "../components/ErrorMessage";

function BookingScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const bookingInfo = useSelector((state) => state.bookingInfo);
  const { selectedDate, selectedTime, service, name } = bookingInfo;

  const dispatch = useDispatch();
  const bookingSave = useSelector((state) => state.bookingSave);
  const { error, success, booking, loading } = bookingSave;

  //form
  const [formFirstname, setFormFirstname] = useState(
    name ? name.formFirstname : ""
  );
  const [formLastname, setFormLastname] = useState(
    name ? name.formLastname : ""
  );

  useEffect(() => {
    if (success) {
      props.history.push(`/confirmed/${booking._id}`);
      dispatch({ type: BOOKING_SAVE_RESET });
    }
  }, [success, dispatch, booking, props.history]);

  const isDataValid = () => {
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z ]*)*$/;
    if (!formFirstname.match(nameRegex) && formFirstname.length > 0) {
      alert("Invalid first name");
      return false;
    } else if (!formLastname.match(nameRegex) && formLastname.length > 0) {
      alert("Invalid last name");
      return false;
    } else if (
      !service ||
      !selectedDate ||
      !selectedTime ||
      formFirstname.length === 0 ||
      formLastname.length === 0
    ) {
      alert("Required field missing");
      return false;
    } else {
      return true;
    }
  };

  //let history = useHistory();

  const submitHandler = () => {
    if (!userInfo) {
      props.history.push("/signin?redirect=booking");
      dispatch(nameBooking({ formFirstname, formLastname }));
      //dispatch(lastNameBooking(formLastname));
    } else if (isDataValid() === true) {
      dispatch(
        saveBooking({
          firstName: formFirstname,
          lastName: formLastname,
          selectedDate: selectedDate,
          selectedTime: selectedTime,
          service: service[0],
        })
      );
    }
  };

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="booking-container">
      <div className="top-booking">
        <Jumbotron className="jumbo-booking">
          <h1>Hair Salon</h1>
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
              <div className="booking-forms-sections">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formFirstname}
                  onChange={(e) => setFormFirstname(capitalize(e.target.value))}
                />
              </div>
              <div className="booking-forms-sections">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formLastname}
                  onChange={(e) => setFormLastname(capitalize(e.target.value))}
                />
              </div>
            </div>
          </div>

          <ServiceComponent className="boxs-booking" />

          <DateComponent className="boxs-booking" />

          <div className="booking-form-btn-section">
            <div className="booking-btn-section-width">
              <button onClick={submitHandler}>Book Now</button>
            </div>
          </div>
          {loading && (
            <div className="booking_save_loading">
              <LoadingBox />
            </div>
          )}
          {error && (
            <div className="booking_save_error">
              <ErrorMessage>{error}</ErrorMessage>
            </div>
          )}

          {success && (
            <div className="booking_save_error">
              <ErrorMessage>success</ErrorMessage>
            </div>
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
