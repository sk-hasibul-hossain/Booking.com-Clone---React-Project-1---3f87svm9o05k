import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
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

const SearchBar = () => {
  const navigate = useNavigate();
  //text input place
  const placeNameRef = useRef();
  const [placeName, setPlaceName] = useState("");

  //calander
  const [stayDate, setStayDate] = useState();
  const [isCalanderOpen, setIsCalanderOpen] = useState(false); //calander-modal
  const currentDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(currentDate.getDate() + 1);
  const handleStayDate = (date) => {
    setStayDate(date);
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

  // useEffect(() => {
  //   const localStorageValue = JSON.parse(localStorage.getItem("stayPageValue"));
  //   if (localStorageValue && localStorageValue.length < 3) {
  //     setPlaceName(localStorageValue[0]);
  //     setStayDate([
  //       new Date(localStorageValue[1][0]),
  //       new Date(localStorageValue[1][1]),
  //     ]);

  //     setOptions(localStorageValue[2]);
  //   }
  // }, []);
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
            onChange={(e) => {
              setPlaceName(e.target.value);
              // console.log(e.target.value);
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
            {stayDate
              ? `${handleDate(stayDate[0])} - ${handleDate(stayDate[1])}`
              : `${handleDate(currentDate)} - ${handleDate(nextDay)}`}
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
                      value={stayDate ? stayDate : new Date()}
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
