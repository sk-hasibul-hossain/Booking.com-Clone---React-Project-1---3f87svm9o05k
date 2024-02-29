import React, { useEffect, useState } from "react";
import "./BookingPage.css";
import HeaderComponent from "../../navBar/header/HeaderComponent";
import axios from "axios";

const BookingPage = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const getBookingValue = async () => {
    try {
      const token = sessionStorage.getItem("userToken");
      const projectID = "3f87svm9o05k";
      const headers = {
        Authorization: `Bearer ${token}`,
        projectID: projectID,
      };
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/bookingportals/booking/",
        { headers }
      );
      console.log(response.data.data);
      setBookingDetails(response.data.data);
    } catch (err) {
      console.log("Err", err);
    }
  };
  useEffect(() => {
    getBookingValue();
  }, []);
  return (
    <div className="booking-container-outer">
      <div className="hotel-page-nav">
        <HeaderComponent />
      </div>
      <div className="booking-show-area-container">
        {bookingDetails?.length > 0 ? (
          bookingDetails.map((details, index) => {
            return (
              <div key={index} className="booking-card">
                <div className="booking-items">
                  <div className="item">Customer Name: {details.user.name}</div>
                  <div className="item">
                    {details.booking_type === "hotel"
                      ? `Hotel Name: ${details.hotel.name}`
                      : "Booked type: Flight"}
                  </div>
                  <div className="item">
                    {"checked in: "}
                    {new Date(details.created_at).toISOString().split("T")[0]}
                  </div>
                  <div className="item">
                    checked out{" "}
                    {new Date(details.end_date).toISOString().split("T")[0]}
                  </div>
                  <div className="item">
                    Status:{" "}
                    <span className="status-confirem">{details.status}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-booked">No booked result</div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
