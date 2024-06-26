import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faMinus,
  faPlus,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import SearchCitiesBox from "./searchCitiesBox/SearchCitiesBox";

const SearchBar = () => {
  //prdefined value store
  const [cities, setCities] = useState({ data: [], isError: true });
  const [isCitySectionShow, setIsCitySectionShow] = useState(false);

  const navigate = useNavigate();
  //text input place
  const placeNameRef = useRef();
  const [placeName, setPlaceName] = useState("");

  const handleChangePlaceName = (e) => {
    setPlaceName(e.target.value);
    // console.log(e.target.value);
  };

  //calander
  const [stayDate, setStayDate] = useState();
  const [isCalanderOpen, setIsCalanderOpen] = useState(false); //calander-modal
  const [isValidDate, setIsValidDate] = useState(true);
  const handleStayDate = (date) => {
    // console.log(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // console.log(today.getDate());
    if (date[0] >= today && date[1] >= today) {
      setIsValidDate(true);
      setStayDate(date);
    } else {
      alert("please Enter valid date");
      setIsValidDate(false);
      const localStorageValue = JSON.parse(
        localStorage.getItem("stayPageValue")
      );

      if (localStorageValue) {
        if (localStorageValue[1]) {
          // console.log(new Date(localStorageValue[1][0]));
          setStayDate([
            new Date(localStorageValue[1][0]),
            new Date(localStorageValue[1][1]),
          ]);
        }
      } else {
        const date = new Date();
        const currentDate = date.getDate();
        date.setDate(currentDate + 1);
        setStayDate([new Date(), new Date(date)]);
      }
    }
  };
  const handleDate = (date) => {
    return date.toDateString().split(" ").slice(0, 3).join(" ");
  };

  const handleOpenCloseCalanderBtn = () => {
    setIsCalanderOpen((prev) => !prev);
  };

  //options
  const [isOptionOpen, setIsOptionOpen] = useState(false); //options modal
  const [options, setOptions] = useState({ adults: 2, childrens: 0, room: 1 });

  const handleOptionOpenClose = () => {
    setIsOptionOpen((prev) => !prev);
  };

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
    handleOptionOpenClose();
  };

  const handleSubmit = () => {
    if (!placeName) {
      placeNameRef.current.focus();
    } else {
      localStorage.setItem(
        "stayPageValue",
        JSON.stringify([placeName, stayDate, options])
      );
      navigate("/stayPage");
    }
  };

  const getAllCitiesAPI = async () => {
    try {
      const headers = {
        projectID: "3f87svm9o05k",
      };
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/bookingportals/city",
        { headers }
      );
      setCities({
        data: response.data.data.cities,
        isError: false,
      });
    } catch (err) {
      setCities({
        data: [],
        isError: true,
      });
    }
  };

  useEffect(() => {
    const localStorageValue = JSON.parse(localStorage.getItem("stayPageValue"));

    if (localStorageValue) {
      setPlaceName(localStorageValue[0]);
      if (localStorageValue[1]) {
        // console.log(new Date(localStorageValue[1][0]));
        setStayDate([
          new Date(localStorageValue[1][0]),
          new Date(localStorageValue[1][1]),
        ]);
      }

      setOptions(localStorageValue[2]);
    } else {
      const date = new Date();
      const currentDate = date.getDate();
      date.setDate(currentDate + 1);
      setStayDate([new Date(), new Date(date)]);
    }
    getAllCitiesAPI();
  }, []);
  return (
    <section className="search-area">
      <div className="search-container">
        <div className="place-search-area">
          <span>
            <FontAwesomeIcon icon={faBed} />
          </span>
          <input
            type="text"
            value={placeName}
            placeholder="where are you going?"
            ref={placeNameRef}
            onChange={handleChangePlaceName}
            onFocus={() => {
              // console.log("focus fire");
              setIsCitySectionShow(true);
            }}
            onBlur={() => {
              // console.log("focus out");
              // setIsCitySectionShow(false);
            }}
          />
          {placeName && (
            <span
              onClick={() => {
                setPlaceName("");
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </span>
          )}
          {/* {isCitySectionShow && (
            <SearchCitiesBox
              cities={cities}
              placeName={placeName}
              setPlaceName={setPlaceName}
              setIsCitySectionShow={setIsCitySectionShow}
            />
          )} */}
        </div>
        <div
          className="calender-search-area"
          onClick={() => {
            setIsOptionOpen(false);
            handleOpenCloseCalanderBtn();
          }}
        >
          <span>
            <FontAwesomeIcon icon={faCalendarDays} />
          </span>
          {/*<div>Fri, Dec 1 - Sun, Dec 3</div>*/}
          <div className="stay-search-calander">
            {stayDate &&
              `${handleDate(new Date(stayDate[0]))} - ${handleDate(
                new Date(stayDate[1])
              )}`}
          </div>
          <div className="stay-calander-container">
            <div className="stay-calander-list">
              {isCalanderOpen && (
                <>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="clanader-header">
                      <p>Calander</p>
                      <span onClick={handleOpenCloseCalanderBtn}>
                        <FontAwesomeIcon icon={faXmark} />
                      </span>
                    </div>
                    <Calendar
                      className="custom-calander-style"
                      onChange={handleStayDate}
                      value={stayDate}
                      selectRange="true"
                    />
                  </div>
                  {/*<div>
                    <Calendar onChange={handleStayDate} value={stayDate} />
                  </div>*/}
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className="number-of-people-search-area"
          onClick={() => {
            setIsCalanderOpen(false);
            handleOptionOpenClose();
          }}
        >
          <span>
            <FontAwesomeIcon icon={faUser} />
          </span>
          <p>{`${options.adults} adults . ${options.childrens} childrens . ${options.room} room`}</p>
          {isOptionOpen && (
            <div
              className="stay-option-container"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span onClick={handleOptionOpenClose}>
                <FontAwesomeIcon icon={faXmark} />
              </span>
              <div className="inner-stay-option-container">
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
            </div>
          )}
        </div>
        <div className="search-state-wise-container" onClick={handleSubmit}>
          Search
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
