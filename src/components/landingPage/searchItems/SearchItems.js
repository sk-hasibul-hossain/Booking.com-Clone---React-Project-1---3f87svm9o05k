import React, { useState, useEffect } from "react";
import "./SearchItems.css";
import axios from "axios";
import { OffersPage } from "../offersPage/OffersPage";
import TrandingDestinationCard from "../trandingDestinationCard/TrandingDestinationCard";
const SearchItems = () => {
  const [isLoading, setIsLoading] = useState(false);

  // const test = async () => {
  //   try {
  //     const searchParams = encodeURIComponent(
  //       JSON.stringify({ type: "flights" })
  //     );
  //     const config = {
  //       headers: {
  //         projectID: "3f87svm9o05k",
  //       },
  //     };
  //     const response = await axios(
  //       `https://academics.newtonschool.co/api/v1/bookingportals/offers?filter=${searchParams}`,
  //       config
  //     );
  //     console.log(response);
  //   } catch (err) {
  //     log("err", err);
  //   }
  // };
  useEffect(() => {
    /*const apiUrl =
      "https://academics.newtonschool.co/api/v1/bookingportals/hotel";
    const searchParams = encodeURIComponent(
      JSON.stringify({ location: "Bangalore" })
    );
    const dayAbbreviation = "Fri";

    const headers = {
      projectID: "3f87svm9o05k", // Replace with your actual project ID
    };

    axios
      .get(`${apiUrl}?search=${searchParams}`, {
        headers: headers,
        params: {
          day: dayAbbreviation,
        },
      })
      .then((response) => {
        // Handle the successful response here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
    test();*/
  }, []);
  return (
    <div className="search-items-container">
      <div className="inner-search-items-container">
        <OffersPage />
        <div className="tranding-destination-container">
          <div className="tranding-destination-title">
            <p>Trending destinations</p>
            <span>Travelers searching for India also booked these</span>
          </div>
          <div className="tranding-destination-body">
            <div className="trandig-div-one">
              <TrandingDestinationCard
                cardPlaceName={"New Delhi"}
                cardImage={
                  "https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="
                }
              />
              <TrandingDestinationCard
                cardPlaceName={"Bangalore"}
                cardImage={
                  "https://cf.bstatic.com/xdata/images/city/600x600/684534.jpg?k=d1fe86c22f2433f4e2dda14ddcbe80feb024b0fb30305e5684a1241fba5d4cff&o="
                }
              />
            </div>
            <div className="trandig-div-two">
              <TrandingDestinationCard
                cardPlaceName={"Mumbai"}
                cardImage={
                  "https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o="
                }
              />
              <TrandingDestinationCard
                cardPlaceName={"Chennai"}
                cardImage={
                  "https://cf.bstatic.com/xdata/images/city/600x600/684730.jpg?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o="
                }
              />
              <TrandingDestinationCard
                cardPlaceName={"Jaipur"}
                cardImage={
                  "https://cf.bstatic.com/xdata/images/city/600x600/684657.jpg?k=66dc5035b43e9bb86b756e381e4fec2558064af4a63a8af17836725a854c03ee&o="
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItems;
