import React, { useState, useEffect } from "react";
import "./PaymentPage.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";
import { getHeaderWithProjectID } from "../../../utills/services";
import BookedModal from "../modal/BookedModal";

const PaymentPage = () => {
  const [cardHolderName, setCardHolderName] = useState();
  const [cardNmber, setCardNumber] = useState();
  const [expiryDate, setExpireyDate] = useState();
  const [cvvNumber, setCvvNumber] = useState();
  const { search } = useLocation();
  const [stayDetails, setStayDetails] = useState();
  const [userToken, setUserToken] = useState();
  const [submitted, setSubmitted] = useState(false);
  const query = new URLSearchParams(search);

  const bookedHotel = async (userDetails) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          projectID: "3f87svm9o05k",
        },
      };
      const appType = {
        appType: "bookingportals",
      };
      const response = await axios.post(
        "https://academics.newtonschool.co/api/v1/bookingportals/booking",
        { ...userDetails, ...appType },
        config
      );
      // console.log("response", response);
    } catch (err) {
      console.log("error", err);
    }
  };

  const handlePaymetSubmit = (e) => {
    e.preventDefault();
    if (cardHolderName && cardNmber && expiryDate && cvvNumber) {
      const payLoad = {
        bookingType: query.get("page"),
        bookingDetails: {
          hotelId: query.get("Id"),
          startDate: new Date(stayDetails[1][0]),
          endDate: new Date(stayDetails[1][1]),
        },
      };
      // console.log(payLoad, userToken);
      bookedHotel(payLoad);
      setSubmitted(true);
    }
  };

  const getLocalStrorageData = (keyName) => {
    return localStorage.getItem(keyName);
  };

  const getSessionStrorage = () => {
    return sessionStorage.getItem("userToken");
  };

  useEffect(() => {
    const localStorageData = getLocalStrorageData("stayPageValue");
    setStayDetails(JSON.parse(localStorageData));
    const sessionStorage = getSessionStrorage();
    setUserToken(sessionStorage);
  }, []);
  return (
    <div className="paymentPage-container">
      <div className="inner-paymentPage-container">
        <div className="inner-paymentPage-container-wraper">
          <h1>Your payment</h1>
          <p>Simple safe and secure.</p>

          <h2>how would you like to Pay?</h2>
          <div className="payment-cards">
            <img
              src="https://www.paisabazaar.com/wp-content/uploads/2017/10/amex-platinum-reserve.jpg"
              alt="card-1"
            />
            <img
              src="https://www.mastercard.us/content/dam/public/mastercardcom/na/us/en/homepage/Home/mc-logo-52.svg"
              alt="card-2"
            />
            <img
              src="https://www.shutterstock.com/image-vector/nuremberg-germany-july-23-2023-260nw-2339225185.jpg"
              alt="card-3"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Maestro_2016.svg/1200px-Maestro_2016.svg.png"
              alt="card-4"
            />
          </div>
          <form onSubmit={handlePaymetSubmit}>
            <div className="payemt-card-holder-input-wraper">
              <label>Cardholder's Name</label>
              <input
                type="text"
                placeholder="Full name..."
                required
                value={cardHolderName}
                onChange={(e) => {
                  setCardHolderName(e.target.value);
                }}
              />
            </div>
            <div className="payemt-card-holder-input-wraper">
              <label>Card Number</label>
              <div className="inner-payemt-card-holder-input-wraper payment-detail-input-field-remove-arrow">
                <span>
                  <FontAwesomeIcon icon={faCreditCard} />
                </span>
                <input
                  type="number"
                  required
                  value={cardNmber}
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="payment-card-date-validation-input-wraper">
              <div className="payemt-card-holder-input-wraper">
                <label>Expiry Date</label>
                <input
                  type="date"
                  placeholder="Full name..."
                  required
                  value={expiryDate}
                  onChange={(e) => {
                    setExpireyDate(e.target.value);
                  }}
                />
              </div>
              <div className="payemt-card-holder-input-wraper">
                <label>CVV</label>
                <div className="inner-payemt-card-holder-input-wraper payment-detail-input-field-remove-arrow">
                  <span>
                    <FontAwesomeIcon icon={faCreditCard} />
                  </span>
                  <input
                    type="number"
                    required
                    value={cvvNumber}
                    onChange={(e) => {
                      setCvvNumber(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <button className="payment-submit-btn">Pay Now</button>
          </form>
        </div>
        <p>
          By clicking "pay now" you agree with the{" "}
          <span>terms and conditions and privacy policies</span> of Booking.com.
          Gotogate International AB, Air India with <span>fare rules</span>
        </p>
      </div>
      {submitted && <BookedModal />}
    </div>
  );
};

export default PaymentPage;
