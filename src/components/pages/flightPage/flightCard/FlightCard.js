import React from "react";
import "./FlightCard.css";

const FlightCard = ({
  flightDeatils,
  journeyDate,
  setSelectedFlightId,
  openModal,
}) => {
  return (
    <div className="flight-card-container">
      <div className="flight-card-section-one">
        <div className="flight-departure-time">
          <h1>{flightDeatils.departureTime}</h1>
          <p>
            {flightDeatils.source} {journeyDate.toDateString().split(" ")[2]}{" "}
            {journeyDate.toDateString().split(" ")[1]}
          </p>
        </div>
        <div className="card-horizontal-line-container">
          <label>{flightDeatils.duration}h</label>
          <div className="card-horizontal-line"></div>
          <label>
            {flightDeatils.stops === 0
              ? "Direct"
              : flightDeatils.stops === 1
              ? "One Stop"
              : "Two Stop"}
          </label>
        </div>
        <div className="flight-departure-time">
          <h1>{flightDeatils.arrivalTime}</h1>
          <p>
            {flightDeatils.destination}{" "}
            {journeyDate.toDateString().split(" ")[2]}{" "}
            {journeyDate.toDateString().split(" ")[1]}
          </p>
        </div>
      </div>
      <div className="flight-card-section-two">
        <div className="flight-allowed-bags">
          <div className="flight-bag-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="m 15 14.75 H 9 a 0.75 0.75 0 0 1 0 -1.5 h 6 a 0.75 0.75 0 0 1 0 1.5 z M 15.75 18 C 15.745 17.588 15.412 17.255 15 17.25 H 9 a 0.75 0.75 0 0 0 0 1.5 h 6 c 0.412 -0.005 0.745 -0.338 0.75 -0.75 z m 3 -6.5 v 9 c 0 1.243 -1.007 2.25 -2.25 2.25 h -0.75 v 0.5 a 0.75 0.75 0 0 1 -1.5 0 v -0.5 h -4.5 v 0.5 a 0.75 0.75 0 0 1 -1.5 0 v -0.5 H 7.5 c -1.243 0 -2.25 -1.007 -2.25 -2.25 v -9 c 0 -1.243 1.007 -2.25 2.25 -2.25 h 1.75 v -8 C 9.25 0.56 9.81 0 10.5 0 h 3 c 0.69 0 1.25 0.56 1.25 1.25 v 8 h 1.75 c 1.243 0 2.25 1.007 2.25 2.25 z m -8 -2.25 h 2.5 V 1.5 h -2.5 z m 6.5 2.25 C 17.245 11.088 16.912 10.755 16.5 10.75 h -9 C 7.088 10.755 6.755 11.088 6.75 11.5 v 9 c 0.005 0.412 0.338 0.745 0.75 0.75 h 9 c 0.412 -0.005 0.745 -0.338 0.75 -0.75 z"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="m 15 9.25 H 9 a 0.75 0.75 0 0 1 0 -1.5 h 6 a 0.75 0.75 0 0 1 0 1.5 z M 15.75 13 C 15.745 12.588 15.412 12.255 15 12.25 H 9 a 0.75 0.75 0 0 0 0 1.5 h 6 c 0.412 -0.005 0.745 -0.338 0.75 -0.75 z m 0 4.5 C 15.745 17.088 15.412 16.755 15 16.75 H 9 a 0.75 0.75 0 0 0 0 1.5 h 6 c 0.412 -0.005 0.745 -0.338 0.75 -0.75 z m 4 -12 v 15 c 0 1.243 -1.007 2.25 -2.25 2.25 h -1.75 v 0.5 a 0.75 0.75 0 0 1 -1.5 0 v -0.5 h -4.5 v 0.5 a 0.75 0.75 0 0 1 -1.5 0 v -0.5 H 6.5 c -1.243 0 -2.25 -1.007 -2.25 -2.25 v -15 C 4.25 4.257 5.257 3.25 6.5 3.25 h 1.75 v -2 C 8.25 0.56 8.81 0 9.5 0 h 5 c 0.69 0 1.25 0.56 1.25 1.25 v 2 h 1.75 c 1.243 0 2.25 1.007 2.25 2.25 z m -10 -2.25 h 4.5 V 1.5 h -4.5 z m 8.5 2.25 C 18.245 5.088 17.912 4.755 17.5 4.75 h -11 C 6.088 4.755 5.755 5.088 5.75 5.5 v 15 c 0.005 0.412 0.338 0.745 0.75 0.75 h 11 c 0.412 -0.005 0.745 -0.338 0.75 -0.75 z"></path>
            </svg>
          </div>
          <label>Included: cabin bag, checked bag</label>
        </div>
        <div className="flight-card-price-section">
          <h2>
            <span>INR </span>
            <span>{flightDeatils.ticketPrice}</span>
          </h2>
          <label>Total price for all travellers</label>
        </div>
        <button
          className="flight-card-button"
          onClick={() => {
            setSelectedFlightId(flightDeatils._id);
            openModal();
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
