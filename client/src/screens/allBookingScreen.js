import "./allBookingScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Jumbotron, Button } from "reactstrap";

import LoadingBox from "../components/LoadingBox";
import ErrorMessage from "../components/ErrorMessage";
import {
  deleteBooking,
  listBookingAdmin,
} from "../redux/actions/bookingActions";
import { BOOKING_DELETE_RESET } from "../redux/constants/bookingConstants";

function AllBookingScreen() {
  const bookingListAdmin = useSelector((state) => state.bookingListAdmin);
  const { loading, bookings, error } = bookingListAdmin;

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

    dispatch(listBookingAdmin());
  }, [dispatch, successDelete]);

  const deleteHandler = (bookingId) => {
    if (window.confirm(`Are you sure to delete booking?`)) {
      dispatch(deleteBooking(bookingId));
    }
  };

  return (
    <div className="allBooking-screen-container">
      <div className="allBooking-top">
        <Jumbotron className="allBooking-jumbo">
          <h1>Hair Salon</h1>
          <Button href="/booking/" className="allBooking-btn" color="danger">
            Book Now
          </Button>
        </Jumbotron>
      </div>

      <div className="allBooking-bottom">
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
                <div className="allBooking-bottom-title">
                  <h3>Bookings</h3>
                </div>
                <table className="allBooking-table">
                  <thead>
                    <tr>
                      <th>NAME</th>
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
                      .map((booking) => (
                        <tr key={booking._id}>
                          <td>
                            <div className="allbooking-name">
                              {booking.firstName} {booking.lastName}
                            </div>
                          </td>
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
              <h3>There's no booking.</h3>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AllBookingScreen;
