import "./confirmedScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Jumbotron, Button } from "reactstrap";

import HomebtmImg from "../product_image/hair-set.jpg";
import LoadingBox from "../components/LoadingBox";
import ErrorMessage from "../components/ErrorMessage";

import { detailsBooking } from "../redux/actions/bookingActions";

function ConfirmedScreen(props) {
  const bookingId = props.match.params.id;
  const bookingDetails = useSelector((state) => state.bookingDetails);
  const { loading, error, booking } = bookingDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsBooking(bookingId));
  }, [dispatch, bookingId]);

  return (
    <div className="confirmed-screen">
      <div className="confirmed-top">
        <Jumbotron className="confirmed-jumbo">
          <h1>Hair Salon</h1>
          <Button href="/booking/" className="confirmed-btn" color="danger">
            Book Now
          </Button>
        </Jumbotron>
      </div>
      <div className="confirmed-bottom">
        <div className="confirmed-bottom-left">
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : booking ? (
            <>
              <h2>Thank you for booking!</h2>
              <p>Your booking is on</p>
              <h4>
                {booking.selectedDate} at {booking.selectedTime}
              </h4>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="confirmed-bottom-right">
          <img src={HomebtmImg} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default ConfirmedScreen;
