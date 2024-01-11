import React from "react";
import "./TrandingDestinationCard.css";

const TrandingDestinationCard = ({ cardPlaceName, cardImage }) => {
  return (
    <div className="tranding-card-container">
      <div className="tranding-card-shadow"></div>
      <img src={cardImage} />
      <p>{cardPlaceName}</p>
    </div>
  );
};

export default TrandingDestinationCard;
