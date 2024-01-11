import React, { useState, useEffect } from "react";
import Nav from "../../navBar/nav/Nav";
import "./stayPage.css";
import HeaderComponent from "../../navBar/header/HeaderComponent";
import StaySearchBar from "./staySearchBar/StaySearchBar";
import axios from "axios";
import StayHotelCard from "./stayHotelCard/StayHotelCard";
import StayFilterPage from "./stayFilterPage/StayFilterPage";

export const StayPage = () => {
  const [stayPageHotels, setStayPageHotels] = useState();
  const [stayPageSearchValue, setStayPageSearchValue] = useState();
  const [placeName, setPlaceName] = useState();
  const [isFiverStarChecked, setIsFiverStarChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getStayData = async (stayPlace, starFilter) => {
    try {
      setIsLoading(true);
      setPlaceName(stayPlace);
      const searchParams = encodeURIComponent(
        JSON.stringify({ location: stayPlace })
      );
      const config = {
        headers: {
          projectID: "3f87svm9o05k",
        },
      };
      let response;
      if (!starFilter) {
        response = await axios(
          `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search=${searchParams}`,
          config
        );
      } else {
        const starParams = encodeURIComponent(JSON.stringify({ rating: 5 }));
        response = await axios(
          `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search=${searchParams}&filter=${starParams}`,
          config
        );
      }
      // console.log(response, response.data.data.hotels);
      setStayPageHotels(response.data.data.hotels);
    } catch (err) {
      console.log("err", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const stayPageValue = JSON.parse(localStorage.getItem("stayPageValue"));
    // console.log(stayPageValue);

    getStayData(stayPageValue[0], isFiverStarChecked);
  }, [stayPageSearchValue, isFiverStarChecked]);
  return (
    <div className="stay-page-container">
      <div className="stay-page-nav">
        <HeaderComponent />
        <Nav page={"stay"} className="stay-page-nav" />
      </div>
      <div className="stay-page-search">
        <StaySearchBar setStayPageSearchValue={setStayPageSearchValue} />
      </div>
      <div className="stay-page-search-result-container">
        <div className="inner-stay-page-search-container">
          <div className="stay-page-filter">
            <StayFilterPage
              isFiverStarChecked={isFiverStarChecked}
              setIsFiverStarChecked={setIsFiverStarChecked}
            />
          </div>
          <div className="stay-page-body">
            <h1>{placeName}</h1>
            {stayPageHotels && stayPageHotels.length > 0
              ? !isLoading
                ? stayPageHotels &&
                  stayPageHotels.map((hotel) => {
                    return (
                      <StayHotelCard
                        key={hotel._id}
                        stayHotelId={hotel._id}
                        stayHotelName={hotel.name}
                        stayHotelPlace={hotel.location}
                        stayHotelRating={hotel.rating}
                        stayHotelRoomType={hotel.rooms[0].roomType}
                        stayHotelRoomBedDetails={hotel.rooms[0].bedDetail}
                        stayCancellationPolicy={
                          hotel.rooms[0].cancellationPolicy
                        }
                        stayHotelPrice={hotel.rooms[0].price}
                        stayHotelTaxesAndFees={
                          hotel.rooms[0].costDetails.taxesAndFees
                        }
                        stayHotelImage={hotel.images[0]}
                      />
                    );
                  })
                : "Loading..."
              : "No hotels found"}
          </div>
        </div>
      </div>
    </div>
  );
};
