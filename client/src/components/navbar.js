import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./navbar.css";
import { signoutUser } from "../redux/actions/userActions";

function NavbarSection({ click }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signoutUser());
  };

  return (
    <nav className="navbar_container">
      <div className="navbar_left">
        <div className="hamburger_menu" onClick={click}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link to="/" className="navbar_title">
          <h2>Hair Salon</h2>
        </Link>
      </div>

      <div className="navbar_right_section">
        <div className="navbar_links">
          <Link to="/">Home</Link>
          <Link to="/service/">Service</Link>
          <Link to="/booking/">Book Now</Link>
        </div>

        <div id="nav" className="navbar_right_signin">
          <div className="nav-a-last">
            {userInfo && userInfo.isAdmin ? (
              <div className="nav_dropdown">
                <span>Admin</span>
                <i className="fas fa-caret-down nav_icon_down"></i>
                <div className="nav_dropdown_content">
                  <ul>
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/allbooking">Bookings</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Users</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : userInfo ? (
              <div className="nav_dropdown">
                <span>
                  {userInfo.name.length < 10
                    ? userInfo.name
                    : userInfo.name.substr(0, 10) + "..."}
                </span>
                <i className="fas fa-caret-down nav_icon_down"></i>
                <div className="nav_dropdown_content">
                  <ul>
                    <li>
                      <Link to="/profile">User Profile</Link>
                    </li>
                    <li>
                      <Link to="/bookinghistory">Your Booking</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link to="/signin">Sign in</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarSection;
