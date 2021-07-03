import "./profileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Jumbotron, Button } from "reactstrap";

import {
  detailsUser,
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
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

    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user, successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (password) {
      if (newpassword.length > 0 && newpassword !== confirmPassword) {
        alert("new password and confirm password does not match");
      } else if (!name.match(nameRegex) && name.length > 0) {
        alert("invalid name field");
      } else if (!email.match(emailRegex) && email.length > 0) {
        alert("invalid email address");
      } else if (
        (user.name === name || name.length === 0) &&
        (user.email === email || email.length === 0) &&
        newpassword.length === 0
      ) {
        alert("No field to update");
      } else {
        dispatch(
          updateUserProfile({
            userId: user._id,
            name,
            email,
            password,
            newpassword,
          })
        );
      }
    } else {
      alert("Please fill out password field");
    }
  };

  const deleteHandler = () => {
    if (user.isAdmin) {
      alert("You can't delete admin user");
    } else if (!password) {
      alert("Please fill out password field");
    } else if (
      window.confirm(
        `Are you sure to delete your account? You will lose all the existing bookings.`
      )
    ) {
      dispatch(deleteUser(user._id));
    }
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

            {loading ? (
              <div className="signin_loading_box">
                <LoadingBox />
              </div>
            ) : error ? (
              <ErrorMessage>{error}</ErrorMessage>
            ) : (
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
                    type="name"
                    id="name"
                    placeholder="your name"
                    value={name}
                    onChange={(e) => setName(capitalize(e.target.value))}
                  />
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  />

                  <label htmlFor="newpassword">New Password</label>
                  <input
                    type="password"
                    id="newpassword"
                    placeholder="password"
                    autoComplete="off"
                    onChange={(e) => setNewpassword(e.target.value)}
                  />
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="confirm password"
                    autoComplete="off"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <hr />
                  <label htmlFor="password">Password *</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="password"
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="profile_form_button">
                  <button type="submit">Update</button>
                </div>
              </>
            )}
          </form>

          {user && (
            <div className="profile_form_delete_button">
              Delete your account? &nbsp;
              <button onClick={() => deleteHandler()}>Click here</button>
            </div>
          )}
        </div>

        <div className="profile_screen_bottom_right">
          <img src={HomebtmImg} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
