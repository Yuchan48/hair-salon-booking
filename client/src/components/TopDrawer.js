import "./TopDrawer.css";
import { Link } from "react-router-dom";
import React from "react";

function TopDrawer({ show, click }) {
  const topDrawerClass = ["topdrawer_container"];

  if (show) {
    topDrawerClass.push("show");
  }

  return (
    <div className={topDrawerClass.join(" ")}>
      <ul className="top_drawer_links" onClick={click}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/service">Service</Link>
        </li>
        <li>
          <Link to="/booking">Book Now</Link>
        </li>
      </ul>
    </div>
  );
}

export default TopDrawer;
