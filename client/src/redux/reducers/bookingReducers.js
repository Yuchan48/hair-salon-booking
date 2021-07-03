import * as actionTypes from "../constants/bookingConstants";


export const bookingAvailableTimeReducer = (state = {times: []}, action) => {
    switch (action.type) {
      case actionTypes.BOOKING_AVAILABLE_TIME_REQUEST:
        return { loading: true };
      case actionTypes.BOOKING_AVAILABLE_TIME_SUCCESS:
        return { loading: false, success: true, times: action.payload };
      case actionTypes.BOOKING_AVAILABLE_TIME_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const bookingSaveReducer = (state = {}, action) => {
    switch (action.type) {
      case actionTypes.BOOKING_SAVE_REQUEST:
        return { loading: true };
      case actionTypes.BOOKING_SAVE_SUCCESS:
        return { loading: false, success: true, booking: action.payload };
      case actionTypes.BOOKING_SAVE_FAIL:
        return { loading: false, error: action.payload };
      case actionTypes.BOOKING_SAVE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const bookingInfoReducer = (state = {}, action) => {
    switch (action.type){
        case actionTypes.BOOKING_NAME_SELECTION:
            return {...state, name: action.payload};
        case actionTypes.BOOKING_SERVICE_SELECTION:
            return {...state, service:action.payload};
        case actionTypes.BOOKING_DATE_SELECTION:
              return {...state, selectedDate: action.payload };
        case actionTypes.BOOKING_TIME_SELECTION:
            return {...state, selectedTime: action.payload };
        case actionTypes.BOOKING_TIME_REMOVE:
            return {...state, selectedTime: ""}
        case actionTypes.BOOKING_INFO_REMOVE:
            return {...state, error: "", dateTime: []};
        default:
            return state;
    } 
  }

  
export const bookingDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case actionTypes.BOOKING_DETAILS_REQUEST:
        return { loading: true };
      case actionTypes.BOOKING_DETAILS_SUCCESS:
        return { loading: false, booking: action.payload };
      case actionTypes.BOOKING_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  
export const bookingListUserReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case actionTypes.BOOKING_LIST_USER_REQUEST:
      return { loading: true };
    case actionTypes.BOOKING_LIST_USER_SUCCESS:
      return { loading: false, bookings: action.payload };
    case actionTypes.BOOKING_LIST_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

 
export const bookingListAdminReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case actionTypes.BOOKING_LIST_ADMIN_REQUEST:
      return { loading: true };
    case actionTypes.BOOKING_LIST_ADMIN_SUCCESS:
      return { loading: false, bookings: action.payload };
    case actionTypes.BOOKING_LIST_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const bookingDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.BOOKING_DELETE_REQUEST:
      return { loading: true };
    case actionTypes.BOOKING_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.BOOKING_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.BOOKING_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

