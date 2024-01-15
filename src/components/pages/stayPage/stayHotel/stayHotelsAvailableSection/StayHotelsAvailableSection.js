import React, { useEffect, useState } from "react";
import "./StayHotelsAvailableSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";

const StayHotelsAvailableSection = ({ hotelSearchData }) => {
  const [cityName, setCityName] = useState();
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [options, setOptions] = useState({ adults: 2, childrens: 0, room: 1 });
  const [isOptionOpen, setIsOptionOpen] = useState(false); //option modal
  const [ischeckInOpen, setIscheckInOpen] = useState(false);
  const [ischeckOutOpen, setIscheckOutOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCityName(hotelSearchData[0]);
    if (hotelSearchData && hotelSearchData[1]) {
      setCheckInDate(hotelSearchData[1][0]);
      setCheckOutDate(hotelSearchData[1][1]);
      setOptions(hotelSearchData[2]);
    }
  }, [hotelSearchData]);

  const handleIncreseValue = (type) => {
    if (type === "adults") {
      setOptions((prev) => {
        return { ...prev, adults: prev.adults + 1 };
      });
    } else if (type === "childrens") {
      setOptions((prev) => {
        return { ...prev, childrens: prev.childrens + 1 };
      });
    } else if (type === "room") {
      setOptions((prev) => {
        return { ...prev, room: prev.room + 1 };
      });
    }
  };

  const handleDecreseValue = (type) => {
    if (type === "adults") {
      if (options.adults > 1) {
        setOptions((prev) => {
          return { ...prev, adults: prev.adults - 1 };
        });
      }
    } else if (type === "childrens") {
      if (options.childrens > 0) {
        setOptions((prev) => {
          return { ...prev, childrens: prev.childrens - 1 };
        });
      }
    } else if (type === "room") {
      if (options.room > 1) {
        setOptions((prev) => {
          return { ...prev, room: prev.room - 1 };
        });
      }
    }
  };
  const handleOptionSubmit = () => {
    setIsOptionOpen((prev) => !prev);
    setIscheckInOpen(false);
    setIscheckOutOpen(false);
  };
  return (
    <div className="stay-hotel-available-section-custom-container">
      <h1>Search</h1>
      <div className="stay-hotel-available-destination-input-box-container">
        <label>Destination/property name:</label>
        <div className="stay-hotel-available-destination-input-box">
          <span>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input
            type="text"
            value={cityName}
            placeholder="Where are you going?"
          />
        </div>
      </div>
      <div className="stay-hotel-check-in-date-input-box-container">
        <label>Check-in date</label>
        <div
          className="stay-hotel-check-in-date-input-box"
          onClick={() => {
            setIscheckInOpen((prev) => !prev);
            setIscheckOutOpen(false);
            setIsOptionOpen(false);
          }}
        >
          <span>
            <FontAwesomeIcon icon={faCalendarDays} />
          </span>
          <p> {new Date(checkInDate).toDateString()}</p>
          <span>
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </div>
        <div className="stay-hotel-room-calaner-custom-style">
          {ischeckInOpen && (
            <Calendar
              className="stay-hotel-room-check-in-calaner-custom"
              value={checkInDate}
              onChange={(date) => {
                setCheckInDate(date);
              }}
            />
          )}
        </div>
      </div>
      <div className="stay-hotel-check-out-date-input-box-container">
        <label>Check-out date</label>
        <div
          className="stay-hotel-check-out-date-input-box"
          onClick={() => {
            setIscheckOutOpen((prev) => !prev);
            setIscheckInOpen(false);
            setIsOptionOpen(false);
          }}
        >
          <span>
            <FontAwesomeIcon icon={faCalendarDays} />
          </span>
          <p>{new Date(checkOutDate).toDateString()}</p>
          <span>
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </div>
        <div className="stay-hotel-room-calaner-custom-style">
          {ischeckOutOpen && (
            <Calendar
              className="stay-hotel-room-check-in-calaner-custom"
              value={checkInDate}
              onChange={(date) => {
                setCheckOutDate(date);
              }}
            />
          )}
        </div>
      </div>
      <div className="stay-hotel-check-in-date-input-box-container">
        <label>
          {Math.abs(
            Math.floor(
              (new Date(checkInDate) - new Date(checkOutDate)) /
                (1000 * 3600 * 24)
            )
          )}
          -night stay
        </label>
        <div
          className="stay-hotel-check-in-date-input-box"
          onClick={handleOptionSubmit}
        >
          <p>
            {options.adults} adults . {options.childrens} children .{" "}
            {options.room} room
          </p>
          <span>
            <FontAwesomeIcon icon={faAngleDown} />
          </span>

          {isOptionOpen && (
            <div
              className="inner-stay-option-container stay-room-page-custom-search-container"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="options">
                <label>Adult</label>
                <div className="inner-option">
                  <span
                    className="btn-color"
                    onClick={() => {
                      handleIncreseValue("adults");
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  <span>{options.adults}</span>
                  <span
                    className="btn-color"
                    onClick={() => {
                      handleDecreseValue("adults");
                    }}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </span>
                </div>
              </div>
              <div className="options">
                <label>Childrens</label>
                <div className="inner-option">
                  <span
                    className="btn-color"
                    onClick={() => {
                      handleIncreseValue("childrens");
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  <span>{options.childrens}</span>
                  <span
                    className="btn-color"
                    onClick={() => {
                      handleDecreseValue("childrens");
                    }}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </span>
                </div>
              </div>
              <div className="options">
                <label>Rooms</label>
                <div className="inner-option">
                  <span
                    className="btn-color"
                    onClick={() => {
                      handleIncreseValue("room");
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  <span>{options.room}</span>
                  <span
                    className="btn-color"
                    onClick={() => {
                      handleDecreseValue("room");
                    }}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </span>
                </div>
              </div>
              <button
                className="option-submit-btn"
                onClick={handleOptionSubmit}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        className="hotel-available-search-btn"
        onClick={() => {
          localStorage.setItem(
            "stayPageValue",
            JSON.stringify([cityName, [checkInDate, checkOutDate], options])
          );
          navigate("/stayPage");
        }}
      >
        Search
      </button>
    </div>
  );
};

export default StayHotelsAvailableSection;
