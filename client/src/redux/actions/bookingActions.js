import * as actionTypes from "../constants/bookingConstants";
import axios from "axios";

export const availabilityBooking = (dateSelection) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.BOOKING_AVAILABLE_TIME_REQUEST, payload: dateSelection });
    const { data } = await axios.get(`/api/booking/availability/${dateSelection}`);

    dispatch({
      type: actionTypes.BOOKING_AVAILABLE_TIME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.BOOKING_AVAILABLE_TIME_FAIL,
      payload: error.message,
    });
  }
};

export const saveBooking = (booking) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.BOOKING_SAVE_REQUEST, payload: booking });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await axios.post("/api/booking", booking, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: actionTypes.BOOKING_SAVE_SUCCESS, payload: data.booking });
      
    } catch (error) {
      dispatch({
        type: actionTypes.BOOKING_SAVE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const detailsBooking = (bookingId) => async (dispatch, getState) => {
    dispatch({ type: actionTypes.BOOKING_DETAILS_REQUEST, payload: bookingId });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await axios.get(`/api/booking/confirmed/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: actionTypes.BOOKING_DETAILS_SUCCESS, payload: data });
      
    } catch (error) {
      dispatch({
        type: actionTypes.BOOKING_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const listBookingUser = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.BOOKING_LIST_USER_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/api/booking/user/list`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: actionTypes.BOOKING_LIST_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: actionTypes.BOOKING_LIST_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
export const listBookingAdmin = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.BOOKING_LIST_ADMIN_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/booking", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: actionTypes.BOOKING_LIST_ADMIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.BOOKING_LIST_ADMIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const deleteBooking = (bookingId) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.BOOKING_DELETE_REQUEST, payload: bookingId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(`/api/booking/${bookingId}/delete`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: actionTypes.BOOKING_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: actionTypes.BOOKING_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


  export const nameBooking = (data) => (dispatch) => {
    dispatch({
      type: actionTypes.BOOKING_NAME_SELECTION,
      payload: data,
    });
  };
  

  export const selectServiceBooking = (data) => (dispatch) => {
    dispatch({
      type: actionTypes.BOOKING_SERVICE_SELECTION,
      payload: data,
    });
  };

  export const selectedDateBooking = (data) => (dispatch) => {
    dispatch({
      type: actionTypes.BOOKING_DATE_SELECTION,
      payload: data,
    });
  };

  export const selectedTimeBooking = (data) => (dispatch) => {
    dispatch({
      type: actionTypes.BOOKING_TIME_SELECTION,
      payload: data,
    });
  };