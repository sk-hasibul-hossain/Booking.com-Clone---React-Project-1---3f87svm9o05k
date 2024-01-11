import React from "react";
import "./OffersPage.css";
import OfferPageCard from "./offerPageCard/OfferPageCard";

export const OffersPage = () => {
  return (
    <div className="offers-page-container">
      <div className="offers-page-header">
        <h1>Offers</h1>
        <h2>Promotions, deals, and special offers for you</h2>
      </div>
      <div className="offer-page">
        <OfferPageCard
          imageSource={
            "https://q-xx.bstatic.com/xdata/images/xphoto/500x500/184698944.png?k=6bb1bf3c13db4a7ba3c22a2d1f1051f793c525a78104703b4dec3eb12101f545&o="
          }
          offerCardTitle={"Fly away to your dream vacation"}
          offerCardDescription={
            "Get inspired – compare and book flights with flexibility"
          }
          offerCardButtonName={"Search for flights"}
          altImage={"offer-flight-photo"}
        />
        <OfferPageCard
          imageSource={
            "https://r-xx.bstatic.com/xdata/images/xphoto/500x500/220031205.jpeg?k=bf9841e8ba89dfdf92e02d45e45dc89fcca2d981b7c74ad57d3ecf6ba64ba1c2&o="
          }
          offerCardTitle={"Take your longest vacation yet"}
          offerCardDescription={
            "Browse properties offering long-term stays, many at reduced monthly rates."
          }
          offerCardButtonName={"Find a stay"}
          altImage={"offer-stay-image"}
        />
      </div>
    </div>
  );
};
