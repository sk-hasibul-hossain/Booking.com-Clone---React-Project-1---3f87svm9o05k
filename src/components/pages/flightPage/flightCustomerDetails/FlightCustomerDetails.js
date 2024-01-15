import React, { useEffect, useRef, useState } from "react";
import "./FlightCustomerDetails.css";
import HeaderComponent from "../../../navBar/header/HeaderComponent";
import axios from "axios";
import { getHeaderWithProjectID } from "../../../../utills/services";
import { useLocation, useNavigate } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FlightCustomerDetails = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [flightData, setFlightDate] = useState();
  const [childrens, setChildrens] = useState();
  const [adults, setAdults] = useState();
  const query = new URLSearchParams(search);

  const emailRef = useRef();
  const phoneRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const genderRef = useRef();

  const [emailVal, setEmailVal] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [genderVal, setGenderVal] = useState();

  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  const getFlightData = async (flightId) => {
    const URL =
      "https://academics.newtonschool.co/api/v1/bookingportals/flight/";
    const config = getHeaderWithProjectID();
    try {
      const response = await axios.get(`${URL}${flightId}`, config);
      setFlightDate(response.data.data);
      //   console.log(response.data.data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  useEffect(() => {
    const ls = JSON.parse(localStorage.getItem("flightSearchData"));
    if (ls) {
      setAdults(ls[3].adults);
      setChildrens(ls[3].childrens);
    }
    getFlightData(query.get("Id"));
  }, []);
  const handleSubmitBtn = () => {
    if (!emailVal) {
      emailRef.current.focus();
      setIsValidPhoneNumber(false);
    } else if (!phoneNum) {
      phoneRef.current.focus();
      setIsValidPhoneNumber(false);
    } else if (phoneNum?.length < 10) {
      phoneRef.current.focus();
      setIsValidPhoneNumber(true);
    } else if (!firstName) {
      firstNameRef.current.focus();
      setIsValidPhoneNumber(false);
    } else if (!lastName) {
      lastNameRef.current.focus();
      setIsValidPhoneNumber(false);
    } else if (!genderVal) {
      genderRef.current.focus();
      setIsValidPhoneNumber(false);
    } else {
      navigate(`/flight/payment?Id=${query.get("Id")}&page=flight`);
    }
  };
  return (
    <div className="flight-customer-details-container">
      <div className="hotel-page-nav">
        <HeaderComponent />
      </div>
      <div className="flight-customer-details-container-body">
        <div className="flight-customer-header">
          <h1>Fill in Your details</h1>
          <label>View flight details</label>
        </div>
        <div className="inner-flight-customer-details-container-body">
          <section className="inner-flight-customer-details-container-section-one">
            <div className="flight-customer-contact-details">
              <div className="flight-customer-contact-title">
                <h2>Contact details</h2>
                <label>
                  <span className="star-color">*</span>Required
                </label>
              </div>
              <div className="flight-customer-contact-email">
                <label>
                  Contact email<span className="star-color">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  ref={emailRef}
                  value={emailVal}
                  onChange={(ev) => {
                    setEmailVal(ev.target.value);
                  }}
                />
                <p>We'll send you flight confirmation here</p>
              </div>
              <div className="flight-customer-contact-phone">
                <label>
                  Phone number<span className="star-color">*</span>
                </label>
                <section>
                  <label>+91</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Eneter your phone number"
                    ref={phoneRef}
                    value={phoneNum}
                    onChange={(ev) => {
                      if (ev.target.value?.length <= 10) {
                        setPhoneNum(ev.target.value);
                      }
                    }}
                  />
                </section>
                {isValidPhoneNumber && (
                  <label style={{ color: "red" }}>
                    Please enter valid phone number
                  </label>
                )}
              </div>
            </div>
            <div className="flight-customer-traveller-details">
              <div className="flight-customer-traveller-contact-title">
                <h2>Traveller 1 (Adult)</h2>
                <label>
                  <span className="star-color">*</span>Required
                </label>
              </div>
              <div className="flight-customer-traveller-name">
                <section>
                  <label>
                    First names<span className="star-color">*</span>
                  </label>
                  <input
                    type="text"
                    name="First"
                    placeholder="Enter your first name"
                    ref={firstNameRef}
                    value={firstName}
                    onChange={(ev) => {
                      setFirstName(ev.target.value);
                    }}
                  />
                  <p>
                    Enter exactly what's written on this traveller's travel
                    document
                  </p>
                </section>
                <section>
                  <label>
                    Last names<span className="star-color">*</span>
                  </label>
                  <input
                    type="text"
                    name="Last"
                    placeholder="Enter your last name"
                    ref={lastNameRef}
                    value={lastName}
                    onChange={(ev) => {
                      setLastName(ev.target.value);
                    }}
                  />
                  <p>
                    Enter exactly what's written on this traveller's travel
                    document
                  </p>
                </section>
              </div>
              <div className="flight-customer-traveller-gender">
                <label>
                  Gender specified on your travel document
                  <span className="star-color">*</span>
                </label>
                <select
                  value={genderVal}
                  ref={genderRef}
                  onChange={(ev) => {
                    setGenderVal(ev.target.value);
                  }}
                >
                  <option>Select your gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
                <p>
                  We're currently required by airlines and providers to ask for
                  this information
                </p>
              </div>
            </div>
            <div className="flight-submit-container">
              <button onClick={handleSubmitBtn}>Next</button>
            </div>
          </section>
          <section className="inner-flight-customer-details-container-section-two">
            <div className="flight-ticket-fee-details">
              <section>
                <h2>
                  Ticket (
                  {parseInt(childrens) > 0
                    ? `${parseInt(adults) + parseInt(childrens)}Travellers`
                    : parseInt(adults) > 1
                    ? `${adults} adults`
                    : `${adults} adult`}
                  )
                </h2>
                <h2>
                  INR
                  {flightData?.ticketPrice *
                    (parseInt(adults) + parseInt(childrens))}
                </h2>
              </section>
              <section>
                <h3>Flight farse</h3>
                <h3>INR{flightData?.ticketPrice}</h3>
              </section>
              <section>
                <h3>Tax and charges</h3>
                <h3>INR0</h3>
              </section>
            </div>
            <div className="flight-ticket-total-fee-section">
              <section>
                <h2>Total</h2>
                <label>Inckudes taxes and charges</label>
              </section>
              <h2>
                INR
                {flightData?.ticketPrice *
                  (parseInt(adults) + parseInt(childrens))}
              </h2>
            </div>
            <div className="flight-ticket-price-footer-description">
              <span>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <label>No hidden fees - track your price at every step</label>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FlightCustomerDetails;
