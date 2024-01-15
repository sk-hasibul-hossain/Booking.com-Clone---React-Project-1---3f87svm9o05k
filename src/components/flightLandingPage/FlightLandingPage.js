import React from "react";
import "./FlightLandingPage.css";
import Navbar from "../navBar/Navbar";
import { FlightSearchIBody } from "./flightSearchItems/FlightSearchIBody";
import FlightSearchBar from "./flightSearchBar/FlightSearchBar";
import FlightFooterPage from "./flightFooterPage/FlightFooterPage";

const flightLandingPage = () => {
  return (
    <div>
      <Navbar page={"flight"} />
      <div className="flight-search-area">
        <FlightSearchBar />
      </div>
      <div className="flight-search-body-landing-page-one-outside-container">
        <FlightSearchIBody />
      </div>
      <footer>
        <FlightFooterPage />
      </footer>
    </div>
  );
};

export default flightLandingPage;
