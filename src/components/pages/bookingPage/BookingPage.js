import React, { useEffect, useState } from "react";
import "./BookingPage.css";
import HeaderComponent from "../../navBar/header/HeaderComponent";
import axios from "axios";

const BookingPage = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [stayFliterStatys, setStatyFliterStatus] = useState({
    status: false,
    data: [],
  });
  const [flightFliter, setFlightFliter] = useState({ status: false, data: [] });
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
      console.log(
        response.data.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
      );
      setBookingDetails(
        response.data.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
      );

      setStatyFliterStatus((prev) => {
        return {
          status: false,
          data: response.data.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          }),
        };
      });

      setFlightFliter((prev) => {
        return {
          status: false,
          data: response.data.data.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          }),
        };
      });
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
      {/* <div>
        <button
          onClick={() => {
            setStatyFliterStatus((prev) => {
              return {
                status: !prev.status,
                data: prev.data,
              };
            });
            setFlightFliter((prev) => {
              return {
                status: false,
                data: prev.data,
              };
            });
          }}
        >
          Stay
        </button>
        <button
          onClick={() => {
            setFlightFliter((prev) => {
              return {
                status: !prev.status,
                data: prev.data,
              };
            });
            setStatyFliterStatus((prev) => {
              return {
                status: false,
                data: prev.data,
              };
            });
          }}
        >
          Flight
        </button>
      </div> */}
      <div className="booking-show-area-container">
        {bookingDetails?.length > 0 &&
        !stayFliterStatys.status &&
        !flightFliter.status
          ? bookingDetails.map((details, index) => {
              return (
                <div key={index} className="booking-card">
                  <div className="booking-items">
                    <div className="item">
                      Customer Name: {details.user.name}
                    </div>
                    {details.booking_type === "flight" ? (
                      <div className="item">
                        Journey: {details.flight.source} -{" "}
                        {details.flight.destination}
                      </div>
                    ) : (
                      ""
                    )}
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
          : ""}

        {stayFliterStatys?.status &&
          stayFliterStatys?.data
            ?.filter((element) => {
              if (element.booking_type === "hotel") {
                return true;
              }
            })
            .map((details, index) => {
              return (
                <div key={index} className="booking-card">
                  <div className="booking-items">
                    <div className="item">
                      Customer Name: {details.user.name}
                    </div>
                    {details.booking_type === "flight" ? (
                      <div className="item">
                        Journey: {details.flight.source} -{" "}
                        {details.flight.destination}
                      </div>
                    ) : (
                      ""
                    )}
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
            })}
        {flightFliter?.status &&
          flightFliter?.data
            ?.filter((element) => {
              if (element.booking_type === "flight") {
                return true;
              }
            })
            .map((details, index) => {
              return (
                <div key={index} className="booking-card">
                  <div className="booking-items">
                    <div className="item">
                      Customer Name: {details.user.name}
                    </div>
                    {details.booking_type === "flight" ? (
                      <div className="item">
                        Journey: {details.flight.source} -{" "}
                        {details.flight.destination}
                      </div>
                    ) : (
                      ""
                    )}
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
            })}
      </div>
    </div>
  );
};

export default BookingPage;
