import React, { useEffect, useRef, useState } from "react";
// import "./FlightSearchBar.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faCalendarDays,
  faGreaterThan,
  faMinus,
  faPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/AuthProvider";
import { getHeaderWithProjectID } from "../../../../utills/services";

const FlightPageSearchBar = ({
  setGetSearchedFlightDetails,
  setTempGetSearchedFlightDetails,
  setTempSortData,
  setJourneyDate,
}) => {
  const navigate = useNavigate();
  const { isLogin } = useAuth();
  const [submitedData, setSubmitedData] = useState(true);
  const [fromValue, setFromValue] = useState();
  const [selectFromValue, setSelectFromValue] = useState();
  const [showFromValue, setShowFromValue] = useState();

  const [ToValue, setToValue] = useState();
  const [selectToValue, setSelectToValue] = useState();
  const [showToValue, setShowToValue] = useState();

  const [flightDate, setFlightDate] = useState([]);

  const [flightClass, setFlightClass] = useState("Economy");

  const [adults, setAdults] = useState(1);
  const [childrens, setChildrens] = useState(0);

  const [arrowInterChangeStyle, setArrowInterChangeStyle] = useState();
  const [isFromFlightSearchOpen, setisFromFlightSearchOpen] = useState(false);
  const [isToFlightSearchOpen, setisToFlightSearchOpen] = useState(false);
  const [isFlightCalanderOpen, setIsFlightCalanderOpen] = useState(false);
  const [isFlightCustomersOpen, setIsFlightCustomersOpen] = useState(false);

  const searchFlightFromInputRef = useRef();
  const searchFlightToInputRef = useRef();
  const boxRef = useRef(null);

  const handleFromFlightSearch = () => {
    setisFromFlightSearchOpen(true);

    setisToFlightSearchOpen(false);
    setIsFlightCalanderOpen(false);
    setIsFlightCustomersOpen(false);
    if (searchFlightFromInputRef.current) {
      searchFlightFromInputRef.current.focus();
    }
  };

  const handleToFlightSearch = () => {
    setisToFlightSearchOpen(true);

    setisFromFlightSearchOpen(false);
    setIsFlightCalanderOpen(false);
    setIsFlightCustomersOpen(false);

    if (searchFlightToInputRef.current) {
      searchFlightToInputRef.current.focus();
    }
  };

  const handleFlightDate = () => {
    setisFromFlightSearchOpen(false);
    setisToFlightSearchOpen(false);

    setIsFlightCalanderOpen(true);
    setIsFlightCustomersOpen(false);
  };

  const handleFlightCustomers = () => {
    setisFromFlightSearchOpen(false);
    setisToFlightSearchOpen(false);

    setIsFlightCalanderOpen(false);
    setIsFlightCustomersOpen(true);
  };

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setisFromFlightSearchOpen(false);
      setisToFlightSearchOpen(false);
      setIsFlightCalanderOpen(false);
      setIsFlightCustomersOpen(false);
    }
  };

  useEffect(() => {
    // Attach click event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const getFlightSearchData = async (sectionName, data) => {
    const URL =
      "https://academics.newtonschool.co/api/v1/bookingportals/airport?search=";
    const config = getHeaderWithProjectID();
    const searchParams = encodeURIComponent(JSON.stringify(data));
    try {
      const response = await axios.get(`${URL}${searchParams}`, config);
      if (sectionName === "from") {
        if (!data.city) {
          setSelectFromValue(response.data.data.airports.slice(0, 5));
        } else {
          setSelectFromValue(response.data.data.airports);
        }
      } else if (sectionName === "to") {
        if (!data.city) {
          setSelectToValue(response.data.data.airports.slice(0, 5));
        } else {
          setSelectToValue(response.data.data.airports);
        }
      }

      // console.log(response.data.data.airports);
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleFromChangeValue = (e) => {
    setFromValue(e.target.value);
    getFlightSearchData("from", { city: e.target.value });
  };

  const handleToChangeValue = (e) => {
    setToValue(e.target.value);
    getFlightSearchData("to", { city: e.target.value });
  };

  const handleFlightChangeDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // console.log(date);
    if (date[0] >= today && date[1] >= today) {
      setFlightDate(date);
    } else {
      const ls = JSON.parse(localStorage.getItem("flightSearchData"));
      alert("please Enter valid date");
      if (ls) {
        if (ls[2]) {
          setFlightDate([new Date(ls[2][0]), new Date(ls[2][1])]);
        }
      } else {
        const date = new Date();
        const currentDate = date.getDate();
        date.setDate(currentDate + 1);
        setFlightDate([new Date(), date]);
      }
    }
  };

  const increase = (selectIncrease) => {
    if (selectIncrease === "adults") {
      setAdults((prev) => {
        return prev + 1;
      });
    } else if (selectIncrease === "childrens") {
      setChildrens((prev) => {
        return prev + 1;
      });
    }
  };

  const decrease = (selectIncrease) => {
    if (selectIncrease === "adults") {
      setAdults((prev) => {
        return prev > 1 ? prev - 1 : prev;
      });
    } else if (selectIncrease === "childrens") {
      setChildrens((prev) => {
        return prev > 0 ? prev - 1 : prev;
      });
    }
  };

  const getFlightDetails = async (data, date) => {
    const URL =
      "https://academics.newtonschool.co/api/v1/bookingportals/flight?search=";
    const config = getHeaderWithProjectID();
    const searchParams = encodeURIComponent(JSON.stringify(data));
    const day = date.toDateString().split(0, 1)[0].split(" ")[0];
    // console.log(searchParams, day);
    try {
      const response = await axios.get(
        `${URL}${searchParams}&day=${day}`,
        config
      );
      setGetSearchedFlightDetails(response.data.data.flights);
      setTempGetSearchedFlightDetails([...response.data.data.flights]);
      setTempSortData([...response.data.data.flights]);
      // console.log(response.data.data.flights);
    } catch (err) {
      console.log("Err", err);
    }
  };
  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem("flightSearchData"));
    if (ls) {
      setShowFromValue(ls[0]);
      setShowToValue(ls[1]);
      if (ls[2]) {
        setFlightDate([new Date(ls[2][0]), new Date(ls[2][1])]);
      }
      setAdults(ls[3].adults);
      setChildrens(ls[3].childrens);
      setFlightClass(ls[3].class);
      const payload = {
        source: ls[0].iata_code,
        destination: ls[1].iata_code,
      };
      setJourneyDate(new Date(ls[2][0]));
      getFlightDetails(payload, new Date(ls[2][0]));
    } else {
      const date = new Date();
      const currentDate = date.getDate();
      date.setDate(currentDate + 1);
      setFlightDate([new Date(), date]);
    }
  }, [submitedData]);

  const handleFlightSearchSubmit = () => {
    if (!showFromValue) {
      setisFromFlightSearchOpen(true);
      setisToFlightSearchOpen(false);
      setIsFlightCalanderOpen(false);
    } else if (!showToValue) {
      setisFromFlightSearchOpen(false);
      setisToFlightSearchOpen(true);
      setIsFlightCalanderOpen(false);
    } else {
      localStorage.setItem(
        "flightSearchData",
        JSON.stringify([
          showFromValue,
          showToValue,
          flightDate,
          { adults: adults, childrens: childrens, class: flightClass },
        ])
      );
      setSubmitedData((prev) => !prev);
    }
    setIsFlightCustomersOpen(false);
  };

  return (
    <div className="flight-search-area" ref={boxRef}>
      <section className="flight-search-area-section-one">
        <select
          value={flightClass}
          onChange={(e) => {
            setFlightClass(e.target.value);
          }}
        >
          <option value={"Economy"}>Economy</option>
          <option value={"Premium"}>Premium</option>
          <option value={"Business"}>Business</option>
          <option value={"First Class"}>First Class</option>
        </select>
        <div
          className="flight-number-of-customer"
          onClick={handleFlightCustomers}
          style={{ border: "1px solid #444444", fontSize: "0.87rem" }}
        >
          {childrens > 0
            ? `${childrens + adults} travellers`
            : adults > 1
            ? `${adults} adults`
            : `${adults} adult`}
          <span>
            <FontAwesomeIcon
              icon={faGreaterThan}
              className="flight-customer-arrow-style"
            />{" "}
          </span>
          {isFlightCustomersOpen && (
            <section
              className="flight-customer-section-container"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flight-adult-container">
                <div className="flight-adult-container-section-one">
                  <p>Adults</p>
                  <span>Age 18+</span>
                </div>
                <div className="flight-adult-container-section-two">
                  <span
                    onClick={() => {
                      decrease("adults");
                    }}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </span>
                  <p>{adults < 10 ? "0" + adults : adults}</p>
                  <span
                    onClick={() => {
                      increase("adults");
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </div>
              </div>
              <div className="flight-adult-container">
                <div className="flight-adult-container-section-one">
                  <p>Children</p>
                  <span>Age 0 - 17</span>
                </div>
                <div className="flight-adult-container-section-two">
                  <span
                    onClick={() => {
                      decrease("childrens");
                    }}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </span>
                  <p>{childrens < 10 ? "0" + childrens : childrens}</p>
                  <span
                    onClick={() => {
                      increase("childrens");
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                </div>
              </div>
            </section>
          )}
        </div>
      </section>
      <section className="flight-search-area-section-two">
        <div className="flight-search-container">
          <div className="flight-search-ariport-from-container">
            <section
              className="flight-search-ariport-from-container-section-one"
              onClick={handleFromFlightSearch}
            >
              <span style={{ color: "#6c808f" }}>
                <FontAwesomeIcon icon={faPlane} />
              </span>
              <p style={{ color: "#6c808f" }}>
                {showFromValue ? (
                  <>
                    <strong>{showFromValue.iata_code} </strong>
                    {showFromValue.name}
                  </>
                ) : (
                  "Where from?"
                )}
              </p>
            </section>
            {isFromFlightSearchOpen && (
              <>
                <section
                  className="flight-search-ariport-from-container-section-two"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="inner-flight-search-ariport-from-container-section-two">
                    <input
                      type="text"
                      ref={searchFlightFromInputRef}
                      value={fromValue}
                      onChange={handleFromChangeValue}
                      placeholder="Airport or city"
                    />
                    <div className="flight-airport-search-result">
                      <ul>
                        {selectFromValue &&
                          selectFromValue.map((airport) => {
                            return (
                              <li
                                key={airport._id}
                                onClick={() => {
                                  setShowFromValue(airport);
                                }}
                              >
                                <span>
                                  <FontAwesomeIcon icon={faPlane} />
                                </span>
                                <p>
                                  <strong>{airport.iata_code} </strong>
                                  {airport.name}
                                  <p>{`${airport.city}, ${airport.country}`}</p>
                                </p>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </section>
                <div className="cap-box"></div>
              </>
            )}
          </div>
          <div
            className="flight-search-ariport-inter-change-container"
            onClick={() => {
              if (
                !arrowInterChangeStyle ||
                arrowInterChangeStyle === "leftToRight"
              ) {
                setArrowInterChangeStyle("rightToLeft");
              } else {
                setArrowInterChangeStyle("leftToRight");
              }
              setShowFromValue(showToValue);
              setShowToValue(showFromValue);
            }}
          >
            <div
              className={`flight-inter-change-rotaed-box ${
                arrowInterChangeStyle === "rightToLeft" ||
                arrowInterChangeStyle === "leftToRight"
                  ? arrowInterChangeStyle === "rightToLeft"
                    ? "flight-inter-change-right-to-left"
                    : "flight-inter-change-left-to-right"
                  : ""
              }`}
            >
              <span>
                <FontAwesomeIcon
                  className="flight-right-arrow"
                  icon={faArrowRight}
                />
              </span>
              <span>
                <FontAwesomeIcon
                  className="flight-left-arrow"
                  icon={faArrowLeft}
                />
              </span>
            </div>
          </div>
          <div className="flight-search-ariport-to-container">
            <section
              className="flight-search-ariport-from-container-section-one"
              onClick={handleToFlightSearch}
            >
              <span style={{ color: "#6c808f" }}>
                <FontAwesomeIcon icon={faPlane} />
              </span>
              <p style={{ color: "#6c808f" }}>
                {showToValue ? (
                  <>
                    <strong>{showToValue.iata_code} </strong>
                    {showToValue.name}
                  </>
                ) : (
                  "Where to?"
                )}
              </p>
            </section>
            {isToFlightSearchOpen && (
              <>
                <section
                  className="flight-search-ariport-from-container-section-two"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="inner-flight-search-ariport-from-container-section-two">
                    <input
                      type="text"
                      value={ToValue}
                      ref={searchFlightToInputRef}
                      onChange={handleToChangeValue}
                      placeholder="Airport or city"
                    />
                    <div className="flight-airport-search-result">
                      <ul>
                        {selectToValue &&
                          selectToValue.map((airport) => {
                            return (
                              <li
                                key={airport._id}
                                onClick={() => {
                                  setShowToValue(airport);
                                }}
                              >
                                <span>
                                  <FontAwesomeIcon icon={faPlane} />
                                </span>
                                <p>
                                  <strong>{airport.iata_code} </strong>
                                  {airport.name}
                                  <p>{`${airport.city}, ${airport.country}`}</p>
                                </p>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </section>
                <div className="cap-box"></div>
              </>
            )}
          </div>
          <div className="flight-search-ariport-date-container">
            <div className="flight-search-ariport-from-container">
              <section
                className="flight-search-ariport-from-container-section-one"
                onClick={handleFlightDate}
              >
                <span style={{ color: "#6c808f" }}>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    style={{ transform: "rotateZ(45deg)" }}
                  />
                </span>
                <p style={{ color: "#6c808f" }}>
                  {flightDate &&
                    `${new Date(flightDate[0]).toDateString()} - ${new Date(
                      flightDate[1]
                    ).toDateString()}`}
                </p>
              </section>
              {isFlightCalanderOpen && (
                <>
                  <section
                    className="flight-search-ariport-from-container-section-two custom-flight-calander-style-container"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="inner-flight-search-ariport-from-container-section-two flight-search-calander-style">
                      <Calendar
                        onChange={handleFlightChangeDate}
                        selectRange="true"
                        value={flightDate && flightDate}
                      />
                    </div>
                  </section>
                  <div className="cap-box calander-cap-box"></div>
                </>
              )}
            </div>
          </div>
          <div className="flight-search-btn-container" style={{ padding: "0" }}>
            <button
              className="flight-search-btn"
              onClick={handleFlightSearchSubmit}
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlightPageSearchBar;
