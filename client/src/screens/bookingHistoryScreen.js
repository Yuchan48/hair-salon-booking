import "./bookingHistoryScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Jumbotron, Button } from "reactstrap";

import HomebtmImg from "../product_image/hair-set.jpg";
import LoadingBox from "../components/LoadingBox";
import ErrorMessage from "../components/ErrorMessage";
import {
  deleteBooking,
  listBookingUser,
} from "../redux/actions/bookingActions";
import { BOOKING_DELETE_RESET } from "../redux/constants/bookingConstants";

function BookingHistoryScreen() {
  const bookingListUser = useSelector((state) => state.bookingListUser);
  const { loading, bookings, error } = bookingListUser;

  const bookingDelete = useSelector((state) => state.bookingDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = bookingDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: BOOKING_DELETE_RESET });
    }

    dispatch(listBookingUser());
  }, [dispatch, successDelete]);

  const deleteHandler = (bookingId) => {
    if (window.confirm(`Are you sure to delete booking?`)) {
      dispatch(deleteBooking(bookingId));
    }
  };

  return (
    <div className="bookinghistory-screen-container">
      <div className="bookinghistory-top">
        <Jumbotron className="bookinghistory-jumbo">
          <h1>Hair Salon</h1>
          <Button
            href="/booking/"
            className="bookinghistory-btn"
            color="danger"
          >
            Book Now
          </Button>
        </Jumbotron>
      </div>

      <div className="bookinghistory-bottom">
        <div className=" bookinghistory-bottom-left">
          {loadingDelete && <LoadingBox />}
          {errorDelete && <ErrorMessage>{errorDelete}</ErrorMessage>}
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : (
            <>
              {bookings.filter(
                (booking) =>
                  new Date().getTime() <
                  new Date(
                    booking.selectedDate + " " + booking.selectedTime
                  ).getTime()
              ).length > 0 ? (
                <>
                  <div className="bookinghistory-bottom-title">
                    <h3>Your Booking</h3>
                  </div>
                  <table className="bookinghistory-table">
                    <thead>
                      <tr>
                        <th> </th>
                        <th>DATE</th>
                        <th>TIME</th>
                        <th>SERVICE</th>
                        <th> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings
                        .filter(
                          (booking) =>
                            new Date().getTime() <
                            new Date(
                              booking.selectedDate + " " + booking.selectedTime
                            ).getTime()
                        )
                        .sort(
                          (a, b) =>
                            new Date(a.selectedDate + " " + a.selectedTime) -
                            new Date(b.selectedDate + " " + b.selectedTime)
                        )
                        .map((booking, i) => (
                          <tr key={booking._id}>
                            <td>{i + 1}</td>
                            <td>{booking.selectedDate}</td>
                            <td>{booking.selectedTime}</td>
                            <td>{booking.service}</td>
                            <td>
                              <div>
                                <button
                                  onClick={() => deleteHandler(booking._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <h3>You don't have any booking.</h3>
              )}
            </>
          )}
        </div>

        <div className="bookinghistory-bottom-right">
          <img src={HomebtmImg} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default BookingHistoryScreen;
