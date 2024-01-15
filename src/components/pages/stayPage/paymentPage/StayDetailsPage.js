import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StayDetailsPage.css";
import HeaderComponent from "../../../navBar/header/HeaderComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faExclamation,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

const PaymentPage = () => {
  const { stayHotelId } = useParams();
  const navigate = useNavigate();
  const [bookedHotelDetails, setBookedHotelDetails] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);

  // const [firstName, setFirsetName] = useState();
  // const [lastName, setLastName] = useState();
  // const [emailId, setEmailId] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [isPhoneNoValid, setIsPhoneNoValid] = useState(true);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailIdRef = useRef();
  const phoneNoRef = useRef();

  const getBookedHotelDetails = () => {
    const getDetailsFromLocalStorage = JSON.parse(
      localStorage.getItem("stayPageValue")
    );
    if (getDetailsFromLocalStorage) {
      setBookedHotelDetails([...getDetailsFromLocalStorage]);
      // console.log("hotel local Storage", getDetailsFromLocalStorage);
    }
  };

  const getRoomDetails = () => {
    const getDetailsFromLocalStorage = JSON.parse(
      localStorage.getItem("selectedHotels")
    );
    if (getDetailsFromLocalStorage) {
      setRoomDetails([...getDetailsFromLocalStorage]);
      // console.log("room local Storage", getDetailsFromLocalStorage);
    }
  };

  useEffect(() => {
    getBookedHotelDetails();
    getRoomDetails();
  }, []);

  function getDateConversion(time) {
    const convertTime = new Date(time);
    return convertTime.toDateString();
  }

  function getDateRange(dateOne, dateTwo) {
    const cDateOne = new Date(dateOne);
    const cDateTwo = new Date(dateTwo);

    const dateDiff = Math.floor((cDateTwo - cDateOne) / (1000 * 3600 * 24));
    return dateDiff;
  }

  function getRoomTotalPrice() {
    if (roomDetails.length > 0 && bookedHotelDetails && bookedHotelDetails[1]) {
      let totalRoomPrice = roomDetails.reduce((acc, curr) => {
        return acc + curr.costPerNight;
      }, 0);
      // let totalRoomTax = 0;
      // for (let i = 0; i < roomDetails.length; i++) {
      //   totalRoomPrice += roomDetails[i].costPerNight;
      //   totalRoomTax += roomDetails[i].costDetails.taxesAndFees;
      // }
      const stayTime = getDateRange(
        bookedHotelDetails[1][0],
        bookedHotelDetails[1][1]
      );
      // console.log(totalRoomPrice, stayTime);
      return totalRoomPrice * stayTime;
      // setRoomTotalPrice(roomTotalPrice * stayTime);
      // setRoomTotalTax(roomTotalTax);
    }
  }

  function getRoomTotalTax() {
    if (roomDetails.length > 0 && bookedHotelDetails && bookedHotelDetails[1]) {
      const totalRoomTax = roomDetails.reduce((acc, curr) => {
        return acc + curr.costDetails.taxesAndFees;
      }, 0);
      return totalRoomTax;
    }
  }

  const handleRestictCharacters = (e) => {
    if (e.target.value?.length <= 10) {
      setPhoneNo(e.target.value);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsPhoneNoValid(true);
    if (!firstNameRef.current.value) {
      firstNameRef.current.style.border = "1px solid red";
      lastNameRef.current.style.border = "1px solid #333";
      emailIdRef.current.style.border = "1px solid #333";
      phoneNoRef.current.style.border = "1px solid #333";
      firstNameRef.current.focus();
    } else if (!lastNameRef.current.value) {
      lastNameRef.current.focus();
      lastNameRef.current.style.border = "1px solid red";
      firstNameRef.current.style.border = "1px solid #333";
      emailIdRef.current.style.border = "1px solid #333";
      phoneNoRef.current.style.border = "1px solid #333";
    } else if (!emailIdRef.current.value) {
      emailIdRef.current.focus();
      emailIdRef.current.style.border = "1px solid red";
      lastNameRef.current.style.border = "1px solid #333";
      firstNameRef.current.style.border = "1px solid #333";
      phoneNoRef.current.style.border = "1px solid #333";
    } else if (
      !phoneNoRef.current.value ||
      phoneNoRef.current.value?.length < 10
    ) {
      phoneNoRef.current.focus();
      phoneNoRef.current.style.border = "1px solid red";
      firstNameRef.current.style.border = "1px solid #333";
      lastNameRef.current.style.border = "1px solid #333";
      emailIdRef.current.style.border = "1px solid #333";
      if (phoneNoRef.current.value?.length < 10) {
        setIsPhoneNoValid(false);
      }
    } else {
      navigate(`/hotel/payment?Id=${stayHotelId}&page=hotel`);
    }
  };
  return (
    <div className="stay-details-page-container">
      <div className="stay-details-nav-container">
        <HeaderComponent />
      </div>
      <div className="inner-stay-details-page-container">
        <div className="stay-booking-details-section-one">
          <div className="inner-stay-booking-details-section-one">
            <div className="stay-booking-details-header">
              <h1>Your booking details</h1>
            </div>
            <div className="stay-booking-details-body-section-one">
              <div className="stay-booking-details-check-in">
                <h2>Check-in</h2>
                <div className="stay-booking-details-check-in-wrap">
                  <h3>
                    {bookedHotelDetails &&
                      bookedHotelDetails[1] &&
                      getDateConversion(new Date(bookedHotelDetails[1][0]))}
                  </h3>
                  <p>From 12:00 PM</p>
                </div>
              </div>
              <div className="stay-booking-details-check-out">
                <h2>Check-out</h2>
                <div className="stay-booking-details-check-out-wrap">
                  <h3>
                    {bookedHotelDetails &&
                      bookedHotelDetails[1] &&
                      getDateConversion(new Date(bookedHotelDetails[1][1]))}
                  </h3>
                  <p>Until 11:00 AM</p>
                </div>
              </div>
            </div>
            <div className="stay-booking-details-body-section-two">
              <span>
                <FontAwesomeIcon
                  className="stay-booking-details-body-section-icon-one"
                  icon={faCircleExclamation}
                />
              </span>
              <p>
                Just{" "}
                <strong>
                  {bookedHotelDetails &&
                    bookedHotelDetails[1] &&
                    Math.abs(
                      getDateRange(bookedHotelDetails[1][0], new Date())
                    )}
                </strong>{" "}
                days away!
              </p>
            </div>
            <div className="stay-booking-details-body-section-three">
              <p>Total length of stay:</p>
              <h1>
                {bookedHotelDetails &&
                  bookedHotelDetails[1] &&
                  getDateRange(
                    bookedHotelDetails[1][0],
                    bookedHotelDetails[1][1]
                  )}{" "}
                nights
              </h1>
            </div>
            <div className="stay-booking-details-body-section-four">
              <h1>You selected</h1>
              <h2>
                {bookedHotelDetails &&
                  bookedHotelDetails[2] &&
                  bookedHotelDetails[2].room}{" "}
                room for{" "}
                {bookedHotelDetails &&
                  bookedHotelDetails[2] &&
                  bookedHotelDetails[2].adults}{" "}
                adults
              </h2>
            </div>
          </div>
          <div className="inner-stay-booking-details-section-two">
            <div className="hotel-booked-price-summery-section-one">
              <h1>Your price Ssummary</h1>
              <div className="hotel-booked-total-price">
                <div className="hotel-booked-total-price-section-one">
                  <p>Original price</p>
                  <div className="inner-hotel-booked-total-price">
                    <sapn>
                      <FontAwesomeIcon icon={faIndianRupeeSign} />
                    </sapn>
                    <p>{getRoomTotalPrice()}</p>
                  </div>
                </div>
                <div className="hotel-booked-total-price-section-one">
                  <p>Bonus savings</p>
                  <div className="inner-hotel-booked-total-price">
                    <sapn>
                      <FontAwesomeIcon icon={faIndianRupeeSign} />
                    </sapn>
                    <p>- 0</p>
                  </div>
                </div>
                <p>No discount</p>
              </div>
            </div>
            <div className="hotel-booked-price-summery-section-two">
              <div className="hotel-booked-price-summery-section-two-section-one">
                <p>Price</p>
              </div>
              <div className="hotel-booked-price-summery-section-two-section-two">
                <div className="hotel-booked-price-summery-section-two-section-two-wrap">
                  <sapn>
                    <FontAwesomeIcon icon={faIndianRupeeSign} />
                  </sapn>
                  <p>{getRoomTotalPrice()}</p>
                </div>
                <div className="hotel-booked-price-summery-section-two-section-two-wrap-one">
                  <span>+</span>
                  <span>
                    <FontAwesomeIcon icon={faIndianRupeeSign} />
                  </span>
                  {getRoomTotalTax()}
                  <p>taxes and fees</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="stay-customer-booking-details-section-two">
          <div className="inner-stay-customer-booking-details-section-two">
            <h1>Enter your details</h1>
            <div className="stay-customer-booking-details-section-two-info">
              <span>
                <FontAwesomeIcon icon={faExclamation} />
              </span>
              <p>
                Almost done! just in the{" "}
                <span className="required-filled-color">*</span> required info
              </p>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="stay-user-input-section-division">
                <div className="stay-input-user-details-wraper">
                  <label>
                    First name <span className="required-filled-color">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name.."
                    ref={firstNameRef}
                  />
                </div>
                <div className="stay-input-user-details-wraper">
                  <label>
                    Last name <span className="required-filled-color">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name.."
                    ref={lastNameRef}
                  />
                </div>
              </div>
              <div className="stay-input-user-details-wraper stay-input-custom-width">
                <label>
                  Email Address <span className="required-filled-color">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your last email.."
                  ref={emailIdRef}
                />
              </div>
              <div className="stay-input-user-details-wraper stay-input-custom-width">
                <label>
                  Country/Region{" "}
                  <span className="required-filled-color">*</span>
                </label>
                <select>
                  <option value="India">India</option>
                </select>
              </div>
              <div className="stay-input-user-details-wraper stay-detail-input-field-remove-arrow">
                <label>
                  Phone No. <span className="required-filled-color">*</span>
                </label>
                <section>
                  <strong>+91</strong>
                  <input
                    type="number"
                    id="mNumber"
                    name="mNumber"
                    value={phoneNo}
                    placeholder="Enter your phone number.."
                    ref={phoneNoRef}
                    onChange={(e) => {
                      handleRestictCharacters(e);
                    }}
                  />
                </section>
                {!isPhoneNoValid && (
                  <span style={{ color: "red", fontSize: "0.9rem" }}>
                    Phone number is not valid
                  </span>
                )}
              </div>
              <button className="stay-user-details-submit-btn">Next</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
