import React, { useState } from "react";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faGlobe,
  faCar,
  faMagnet,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Nav = ({ page }) => {
  // const [pageName, setPageName] = useState(page);
  // console.log(page);
  return (
    <div className="navbar-container">
      <NavLink
        to="/"
        className={`nav-btn stay-box-size ${page === "stay" ? "active" : ""}`}
      >
        <div className="inner-nav-btn">
          <span>
            <FontAwesomeIcon icon={faBed} />
          </span>
          <p>Stays</p>
        </div>
      </NavLink>
      <NavLink
        to="/flightlandingpage"
        className={`nav-btn flight-box-size ${
          page === "flight" ? "active" : ""
        }`}
      >
        <div className="inner-nav-btn">
          {" "}
          <span>
            <FontAwesomeIcon icon={faPlane} />
          </span>
          Flight
        </div>
      </NavLink>
      <div className="nav-btn flight-plus-hotel-box-width">
        <span>
          <FontAwesomeIcon icon={faGlobe} />
        </span>
        <p>Flight + Hotel</p>
      </div>
      <div className="nav-btn flight-plus-hotel-box-width">
        <span>
          <FontAwesomeIcon icon={faCar} />
        </span>
        <p>Car rentals</p>
      </div>
      <div className="nav-btn flight-plus-hotel-box-width">
        <span>
          <FontAwesomeIcon icon={faMagnet} />
        </span>
        <p>Attractions</p>
      </div>
      <div className="nav-btn flight-plus-hotel-box-width">
        <span>
          <FontAwesomeIcon icon={faTaxi} />
        </span>
        <p>Airport taxis</p>
      </div>
    </div>
  );
};

export default Nav;
