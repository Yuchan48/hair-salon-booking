import "./registerScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Jumbotron, Button } from "reactstrap";

import { registerUser } from "../redux/actions/userActions";

//component
import LoadingBox from "../components/LoadingBox";
import ErrorMessage from "../components/ErrorMessage";
import HomebtmImg from "../product_image/hair-set.jpg";

function RegisterScreen(props) {
  const urlParam = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

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

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    password !== confirmPassword
      ? alert("password and confirm password does not match")
      : !name.match(nameRegex)
      ? alert("invalid name field")
      : !email.match(emailRegex)
      ? alert("invalid email address")
      : dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(urlParam);
    }
  }, [props.history, userInfo, urlParam]);

  const capitalize = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="register_screen_container">
      <div className="register_screen_top">
        <Jumbotron className="register_screen_jumbo">
          <h1>Hair Salon</h1>
          <Button
            href="/booking/"
            className="register_screen_btn"
            color="danger"
          >
            Book Now
          </Button>
        </Jumbotron>
      </div>

      <div className="register_screen_bottom">
        <div className="register_screen_bottom_left">
          <form className="register_form_box" onSubmit={submitHandler}>
            <div className="register_box-title">
              <h4>Create Account</h4>
              <i className="fas fa-folder-plus"></i>
            </div>

            {loading && (
              <div className="signin_loading_box">
                <LoadingBox />
              </div>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="register_inputs">
              <label htmlFor="name">Your Name</label>
              <input
                type="name"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={onChange}
                required
              />
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={onChange}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={onChange}
                required
              />
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                autoComplete="off"
                value={confirmPassword}
                onChange={onChange}
                required
              />
            </div>
            <div className="register_form_button">
              <button type="submit">Sign up</button>
            </div>

            <div className="register_login_link">
              <p>Already have an account? &nbsp;</p>
              <Link to={`/login?redirect=${urlParam}`}>Sign in</Link>
            </div>
          </form>
        </div>

        <div className="register_screen_bottom_right">
          <img src={HomebtmImg} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
