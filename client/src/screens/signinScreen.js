import "./signinScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Jumbotron, Button } from "reactstrap";

import { signinUser } from "../redux/actions/userActions";

//component
import LoadingBox from "../components/LoadingBox";
import ErrorMessage from "../components/ErrorMessage";
import HomebtmImg from "../product_image/hair-set.jpg";

function SigninScreen(props) {
  const urlParam = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "email"
          ? e.target.value.toLowerCase()
          : e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signinUser(formData));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(urlParam);
    }
  }, [props.history, userInfo, urlParam]);

  return (
    <div className="signin_screen_container">
      <div className="signin_screen_top">
        <Jumbotron className="signin_screen_jumbo">
          <h1>Hair Salon</h1>
          <Button href="/booking/" className="signin_screen_btn" color="danger">
            Book Now
          </Button>
        </Jumbotron>
      </div>

      <div className="signin_screen_bottom">
        <div className="signin_screen_bottom_left">
          <form className="signin_form_box" onSubmit={submitHandler}>
            <div className="signin_box-title">
              <h4>Sign in</h4>
              <i className="fas fa-sign-in-alt"></i>
            </div>

            {loading && (
              <div className="signin_loading_box">
                <LoadingBox />
              </div>
            )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="signin_inputs">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Email Address"
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
            </div>
            <div className="signin_form_button">
              <button type="submit">Sign in</button>
            </div>

            <div className="signin_register_link">
              <p>Don't have an account? &nbsp;</p>
              <Link to={`/register?redirect=${urlParam}`}>Sign up</Link>
            </div>
          </form>
        </div>

        <div className="signin_screen_bottom_right">
          <img src={HomebtmImg} alt="img" />
        </div>
      </div>
    </div>
  );
}

export default SigninScreen;
