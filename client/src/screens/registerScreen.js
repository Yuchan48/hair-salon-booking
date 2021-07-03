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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (password !== confirmPassword) {
      alert("password and confirm password does not match");
    } else if (!name.match(nameRegex)) {
      alert("invalid name field");
    } else if (!email.match(emailRegex)) {
      alert("invalid email address");
    } else {
      dispatch(registerUser(name, email, password));
    }
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
                id="name"
                placeholder="your name"
                value={name}
                onChange={(e) => setName(capitalize(e.target.value))}
                required
              />
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="email address"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="confirm password"
                autoComplete="off"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
