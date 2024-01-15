import React, { useEffect, useState } from "react";
import "./FlightPage.css";
import HeaderComponent from "../../navBar/header/HeaderComponent";
import Nav from "../../navBar/nav/Nav";
import FlightPageSearchBar from "./flightPageSearchBar/FlightPageSearchBar";
import FlightCard from "./flightCard/FlightCard";
import FlightTicketModel from "./flightTicketModel/FlightTicketModel";

export const FlightPage = () => {
  const [getSearchedFlightDetails, setGetSearchedFlightDetails] = useState();
  const [tempGetSearchedFlightDetails, setTempGetSearchedFlightDetails] =
    useState();
  const [journeyDate, setJourneyDate] = useState();
  const [selectedStop, setSelectedStop] = useState("any");

  const [selectedSortType, setSelectedSortType] = useState("best");
  const [tempSortData, setTempSortData] = useState();
  const [isTickitModalOpen, setisTickitModalOpen] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState();

  const handleChangeStopValue = (ev) => {
    setSelectedStop(ev.target.value);

    if (ev.target.value === "any") {
      setGetSearchedFlightDetails(tempGetSearchedFlightDetails);
      console.log(ev.target.value);
    } else if (parseInt(ev.target.value) === 0) {
      setGetSearchedFlightDetails((prev) => {
        return tempGetSearchedFlightDetails.filter((element) => {
          return parseInt(element.stops) === 0 ? true : false;
        });
      });
      console.log(ev.target.value);
    } else if (parseInt(ev.target.value) === 1) {
      setGetSearchedFlightDetails((prev) => {
        return tempGetSearchedFlightDetails.filter((element) => {
          // console.log(element);
          // console.log(parseInt(element.stops));
          return parseInt(element.stops) === 1 ? true : false;
        });
      });
      console.log(ev.target.value);
    } else if (parseInt(ev.target.value) === 2) {
      setGetSearchedFlightDetails((prev) => {
        return tempGetSearchedFlightDetails.filter((element) => {
          // console.log(element);
          return parseInt(element.stops) === 2 ? true : false;
        });
      });
      // console.log(ev.target.value);
    }
  };

  const handleSort = (type) => {
    setSelectedSortType(type);
    // console.log(tempSortData, type);
    if (type === "best") {
      setGetSearchedFlightDetails([...tempSortData]);
    } else if (type === "cheap") {
      setGetSearchedFlightDetails((prev) => {
        return prev.sort((a, b) => a.ticketPrice - b.ticketPrice);
      });
    } else if (type === "fastest") {
      setGetSearchedFlightDetails((prev) => {
        return prev.sort((a, b) => b.ticketPrice - a.ticketPrice);
      });
    }
  };

  const openModal = () => {
    setisTickitModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setisTickitModalOpen(false);
    document.body.style.overflow = "auto";
  };
  return (
    <div>
      <div className="stay-page-nav">
        <HeaderComponent />
        <Nav page={"flight"} className="stay-page-nav" />
      </div>
      <div className="flight-page-serach-bar-outside">
        <FlightPageSearchBar
          setGetSearchedFlightDetails={setGetSearchedFlightDetails}
          setTempGetSearchedFlightDetails={setTempGetSearchedFlightDetails}
          setTempSortData={setTempSortData}
          setJourneyDate={setJourneyDate}
        />
      </div>
      <div className="flight-page-search-value-section">
        <div className="inner-flight-page-search-value-section">
          <section className="flight-page-search-value-section-one">
            <h1>Filters</h1>
            <section className="flight-filter-stop-section">
              <label className="flight-filter-stop-title">
                <h2>Stops</h2>
              </label>
              <div className="flight-filter-stop-radio-box">
                <input
                  type="radio"
                  name="stop"
                  value="any"
                  checked={selectedStop === "any"}
                  onChange={handleChangeStopValue}
                />
                <label>Any</label>
              </div>
              <div className="flight-filter-stop-radio-box">
                <input
                  type="radio"
                  name="stop"
                  value="0"
                  checked={parseInt(selectedStop) === 0}
                  onChange={handleChangeStopValue}
                />
                <label>Direct only</label>
              </div>
              <div className="flight-filter-stop-radio-box">
                <input
                  type="radio"
                  name="stop"
                  value="1"
                  checked={parseInt(selectedStop) === 1}
                  onChange={handleChangeStopValue}
                />
                <label>One stop</label>
              </div>
              <div className="flight-filter-stop-radio-box">
                <input
                  type="radio"
                  name="stop"
                  value="2"
                  checked={parseInt(selectedStop) === 2}
                  onChange={handleChangeStopValue}
                />
                <label>Two stops</label>
              </div>
            </section>
          </section>
          <section className="flight-page-search-value-section-two">
            <section className="filter-page-search-value-section-two-header">
              <div
                className={`filter-page-search-value-section-box ${
                  selectedSortType === "best" ? "flight-active-sort" : ""
                }`}
                onClick={() => {
                  handleSort("best");
                }}
              >
                Best
              </div>
              <div
                className={`filter-page-search-value-section-box ${
                  selectedSortType === "cheap" ? "flight-active-sort" : ""
                }`}
                onClick={() => {
                  handleSort("cheap");
                }}
              >
                Chepest
              </div>
              <div
                className={`filter-page-search-value-section-box ${
                  selectedSortType === "fastest" ? "flight-active-sort" : ""
                }`}
                onClick={() => {
                  handleSort("fastest");
                }}
              >
                Fastest
              </div>
            </section>
            <section className="filter-page-search-value-section-two-body">
              {getSearchedFlightDetails &&
                getSearchedFlightDetails.map((flightDeatils) => {
                  return (
                    <FlightCard
                      key={flightDeatils._id}
                      flightDeatils={flightDeatils}
                      journeyDate={journeyDate}
                      setSelectedFlightId={setSelectedFlightId}
                      openModal={openModal}
                    />
                  );
                })}
            </section>
          </section>
        </div>
      </div>
      {isTickitModalOpen && (
        <div className="flight-ticket-modal-section">
          <FlightTicketModel
            closeModal={closeModal}
            selectedFlightId={selectedFlightId}
          />
        </div>
      )}
    </div>
  );
};
