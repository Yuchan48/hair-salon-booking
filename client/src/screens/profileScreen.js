import "./profileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Jumbotron, Button } from "reactstrap";

import {
  updateUserProfile,
  deleteUser,
  signoutUser,
} from "../redux/actions/userActions";
import {
  USER_UPDATE_PROFILE_RESET,
  USER_DELETE_RESET,
} from "../redux/constants/userConstants";

//component
import LoadingBox from "../components/LoadingBox";
import ErrorMessage from "../components/ErrorMessage";
import HomebtmImg from "../product_image/hair-set.jpg";

function ProfileScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [formData, setFormData] = useState({
    userId: userInfo._id,
    name: userInfo.name,
    email: userInfo.email,
    password: "",
    newpassword: "",
    confirmPassword: "",
  });
  const { name, email, password, newpassword, confirmPassword } = formData;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdateProfile;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
      dispatch(signoutUser());
    }

    if (successUpdate) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  }, [dispatch, userInfo._id, successDelete, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (password) {
      newpassword.length > 0 && newpassword !== confirmPassword
        ? alert("new password and confirm password does not match")
        : !name.match(nameRegex)
        ? alert("invalid name field")
        : !email.match(emailRegex)
        ? alert("invalid email address")
        : dispatch(updateUserProfile(formData));
    } else {
      alert("Please fill password field");
    }
  };

  const deleteHandler = () => {
    if (userInfo.isAdmin) {
      alert("You can't delete admin user");
    } else if (!password) {
      alert("Please fill out password field");
    } else if (
      window.confirm(
        `Are you sure to delete your account? You will lose all the existing bookings.`
      )
    ) {
      dispatch(deleteUser(userInfo._id));
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "name"
          ? capitalize(e.target.value)
          : e.target.name === "email"
          ? e.target.value.toLowerCase()
          : e.target.value,
    });
  };

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="profile_screen_container">
      <div className="profile_screen_top">
        <Jumbotron className="profile_screen_jumbo">
          <h1>Hair Salon</h1>
          <Button
            href="/booking/"
            className="profile_screen_btn"
            color="danger"
          >
            Book Now
          </Button>
        </Jumbotron>
      </div>

      <div className="profile_screen_bottom">
        <div className="profile_screen_bottom_left">
          <form className="profile_form_box" onSubmit={submitHandler}>
            <div className="profile_box-title">
              <h4>Your Profile</h4>
              <i className="fas fa-id-badge"></i>
            </div>
            <small>please fill out the field which you want to update</small>

            {
              <>
                {loadingUpdate && (
                  <div className="signin_loading_box">
                    <LoadingBox />
                  </div>
                )}
                {errorUpdate && <ErrorMessage>{errorUpdate}</ErrorMessage>}
                {successUpdate && (
                  <ErrorMessage>Profile Updated Successfully</ErrorMessage>
                )}

                {loadingDelete && (
                  <div className="signin_loading_box">
                    <LoadingBox />
                  </div>
                )}
                {errorDelete && <ErrorMessage>{errorDelete}</ErrorMessage>}

                <div className="profile_inputs">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={name}
                    onChange={onChange}
                  />
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={onChange}
                  />

                  <label htmlFor="newpassword">New Password</label>
                  <input
                    type="password"
                    name="newpassword"
                    placeholder="New Password"
                    autoComplete="off"
                    value={newpassword}
                    onChange={onChange}
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    autoComplete="off"
                    value={confirmPassword}
                    onChange={onChange}
                  />

                  <hr />
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    value={password}
                    onChange={onChange}
                  />
                </div>

                <div className="profile_form_button">
                  <button type="submit">Update</button>
                </div>
              </>
            }
          </form>

          <div className="profile_form_delete_button">
            Delete your account? &nbsp;
            <button onClick={() => deleteHandler()}>Click here</button>
          </div>
        </div>

        <div className="profile_screen_bottom_right">
          <img src={HomebtmImg} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
