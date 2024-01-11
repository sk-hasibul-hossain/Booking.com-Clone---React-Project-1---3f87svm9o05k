import React from "react";
import Nav from "./nav/Nav";
import HeaderComponent from "./header/HeaderComponent";
import "./Navbar.css";

const Navbar = ({ page }) => {
  return (
    <>
      <div className="navbar-conatiner">
        <HeaderComponent />
        <Nav page={page} />
        <section className="nav-other-dektop-content">
          <h1>Find your next stay</h1>
          <h2>Search low prices on hotels, homes and much more...</h2>
        </section>
      </div>
      <section className="nav-other-mobile-content">
        <div className="inner-nav-other-mobile-content">
          <h1>Find your next stay</h1>
          <h2>Search low prices on hotels, homes and much more...</h2>
        </div>
      </section>
    </>
  );
};

export default Navbar;
