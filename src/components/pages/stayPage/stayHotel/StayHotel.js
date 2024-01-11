import React, { useState, useEffect } from "react";
import "./StayHotel.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import HeaderComponent from "../../../navBar/header/HeaderComponent";
import Nav from "../../../navBar/nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import StayHotelsAvailableSection from "./stayHotelsAvailableSection/StayHotelsAvailableSection";
import FooterPage from "../../../landingPage/footerPage/FooterPage";
import StayHotelImageViewMobileView from "./stayHotelImageViewMobileView/StayHotelImageViewMobileView";

const stayHotel = () => {
  const { stayHotelId } = useParams();
  const [hotelData, setHotelData] = useState();
  const [hotelSearchData, setHotelSearchData] = useState([]);
  const [isChange, setIsChange] = useState();
  const [hotelTotalPrice, setHotelTotalPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const getStayHotelData = async () => {
    try {
      setIsLoading(true);
      // setPlaceName(stayPlace);
      const config = {
        headers: {
          projectID: "3f87svm9o05k",
        },
      };
      const response = await axios(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${stayHotelId}`,
        config
      );
      // console.log("Hotel page", response.data.data);
      setHotelData(response.data.data);
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getStayHotelData();
  }, []);

  useEffect(() => {
    setHotelSearchData(JSON.parse(localStorage.getItem("stayPageValue")));
  }, [isChange]);

  useEffect(() => {
    if (hotelSearchData.length > 0 && hotelData) {
      // setHotelTotalPrice(response.data.data.rooms[0].costPerNight);
      // console.log("root", hotelSearchData[2].room);
      const hotelArr = [];
      let t = 0;
      for (let i = 0; i < hotelSearchData[2].room; i++) {
        hotelArr.push(hotelData.rooms[i]);
        t += hotelData.rooms[i].costPerNight;
      }
      // console.log("t", t);
      setHotelTotalPrice(t);
      const hotelVal = JSON.stringify(hotelArr);
      localStorage.setItem("selectedHotels", hotelVal);
    }
  }, [hotelData]);

  const [stayDays, setStayDays] = useState(1);

  useEffect(() => {
    if (hotelSearchData.length > 0) {
      setStayDays(
        Math.ceil(
          (new Date(hotelSearchData[1][1]) - new Date(hotelSearchData[1][0])) /
            (1000 * 3600 * 24)
        )
      );
    }
  }, [hotelSearchData]);

  const setHotelLocalStorage = (room) => {
    const getHotels = JSON.parse(localStorage.getItem("selectedHotels"));
    const hotels = JSON.stringify([...getHotels, room]);
    localStorage.setItem("selectedHotels", hotels);
  };

  const removeHotelLocalStorage = (room) => {
    const getHotels = JSON.parse(localStorage.getItem("selectedHotels"));
    const hotels = JSON.stringify(
      getHotels.filter((hotel) => {
        if (hotel._id !== room._id) {
          return true;
        } else {
          return false;
        }
      })
    );
    localStorage.setItem("selectedHotels", hotels);
  };

  const handleSelectRoomChange = (price, status, room) => {
    // console.log(status);
    if (status === 1) {
      setHotelTotalPrice((prevValue) => prevValue + price);
    } else if (status === 0) {
      setHotelTotalPrice((prevValue) => prevValue - price);
    }
  };
  // console.log(hotelSearchData);
  return (
    <div className="stay-hotel-container">
      <div className="hotel-page-nav">
        <HeaderComponent />
        <Nav page={"stay"} className="hotel-page-nav" />
      </div>
      <div className="stay-hotel-image-mobile-view">
        <h1>{hotelData && hotelData.name}</h1>
        <div className="inner-stay-hotel-image-mobile-view">
          <StayHotelImageViewMobileView
            hotelImages={hotelData && hotelData.images}
          />
        </div>
      </div>
      <div className="stay-hotel-section-one">
        <div className="stay-hotel-available-section">
          <div className="stay-hotel-search-section-title">
            <FontAwesomeIcon icon={faPaperclip} />
            <p>We Price Match</p>
          </div>
          <div className="stay-hotel-search-section-container">
            <StayHotelsAvailableSection hotelSearchData={hotelSearchData} />
          </div>
        </div>
        <div className="stay-hotel-image-section">
          <div className="stay-hotel-navigation-section">
            <ul>
              <li className="stay-hotel-page-nav-active">Overview</li>
              <li>
                <a href="#info">Info & Prices</a>
              </li>
              <li>Facilities</li>
            </ul>
          </div>
          <div className="stay-hotel-image-title-area">
            <h1>{hotelData && hotelData.name}</h1>
            <button className="stay-hotel-resurve-btn">
              <a href="#info">Reserver</a>
            </button>
          </div>
          <div className="stay-hotel-image-container">
            <div className="stay-hotel-image-column-one">
              {/*<img src={hotelData && hotelData.images[0]} alt="hotel-image" />*/}
              <div>
                <img src={hotelData && hotelData.images[0]} alt="hotel-image" />
              </div>
              <div>
                <img src={hotelData && hotelData.images[1]} alt="hotel-image" />
              </div>
              <div>
                <img src={hotelData && hotelData.images[2]} alt="hotel-image" />
              </div>
            </div>
            <div className="stay-hotel-image-column-two">
              <img src={hotelData && hotelData.images[3]} alt="hotel-image" />
            </div>
          </div>
        </div>
      </div>

      <div className="stay-hotel-section-two">
        <div className="stay-hotel-details-title" id="info">
          Availability
        </div>
        <div className="inner-stay-hotel-section-two">
          <div className="stay-hotel-room-details">
            <div className="stay-hotel-rows-header">
              <div>Room Type</div>
              <div>Number of guests</div>
              <div>Price for {stayDays} nights</div>
              <div>Your Choices</div>
              <div>Select Rooms</div>
            </div>
            {hotelData &&
              hotelData.rooms.map((room, i) => {
                return (
                  <div key={room._id} className="stay-hotel-details-rows">
                    <div>
                      <div className="stay-hotel-details-title">
                        {room.roomType} room
                      </div>
                      <div className="stay-hotel-details-body">
                        {hotelData.amenities.map((roomFacility, index) => {
                          return (
                            <div key={index}>
                              <span>
                                <FontAwesomeIcon icon={faCheck} />
                              </span>
                              {roomFacility}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div></div>
                    <div>{room.costPerNight * stayDays}</div>
                    <div>N/A</div>
                    <div>
                      <select
                        className="stay-custom-select"
                        style={{ width: "45px" }}
                        value={
                          hotelSearchData && hotelSearchData[2].room - 1 >= i
                            ? 1
                            : 0
                        }
                        onChange={(e) => {
                          handleSelectRoomChange(
                            room.costPerNight,
                            e.target.value,
                            room
                          );
                          // console.log("select", e.target.value);
                        }}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                      </select>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="stay-hotel-room-prices">
            <div className="stay-hotel-price-rows-header"></div>
            <div className="hotel-total-price-container">
              <button
                onClick={() => {
                  navigate(`/hotel/customerDetails/${stayHotelId}`);
                }}
              >
                I'll reserve
              </button>
              <p>{hotelTotalPrice * stayDays}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="stay-hotel-footer">
        <FooterPage />
      </div>
    </div>
  );
};

export default stayHotel;
