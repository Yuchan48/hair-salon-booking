import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    userDeleteReducer,
    userDetailsReducer,
    userEditReducer,
    userListReducer,
    userRegisterReducer,
    userSigninReducer,
    userUpdateProfileReducer,
  } from "./reducers/userReducers";
import { bookingAvailableTimeReducer, bookingDeleteReducer, bookingDetailsReducer, bookingInfoReducer, bookingListAdminReducer, bookingListUserReducer, bookingSaveReducer } from "./reducers/bookingReducers";

const reducer = combineReducers({
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userEdit: userEditReducer,
    bookingAvailability: bookingAvailableTimeReducer,
    bookingSave: bookingSaveReducer,
    bookingInfo: bookingInfoReducer,
    bookingDetails: bookingDetailsReducer,
    bookingListUser: bookingListUserReducer,
    bookingListAdmin: bookingListAdminReducer,
    bookingDelete: bookingDeleteReducer
});

const middleware = [thunk];

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;