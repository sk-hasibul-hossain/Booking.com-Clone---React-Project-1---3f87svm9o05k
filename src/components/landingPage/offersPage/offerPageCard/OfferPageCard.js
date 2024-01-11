import React from "react";
import "./OfferPageCard.css";

const OfferPageCard = ({
  imageSource,
  altImage,
  offerCardTitle,
  offerCardDescription,
  offerCardButtonName,
}) => {
  return (
    <div className="offer-page-card-container">
      <div className="offer-card-body">
        <div className="offer-card-title">
          <p>{offerCardTitle}</p>
          <span>{offerCardDescription}</span>
        </div>
        <button className="offer-flight-btn">{offerCardButtonName}</button>
      </div>
      <div className="offer-card-image">
        <img src={imageSource} alt={altImage} />
      </div>
    </div>
  );
};

export default OfferPageCard;
