import React, { useState } from "react";
import "./StayHotelImageViewMobileView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";

const StayHotelImageViewMobileView = ({ hotelImages }) => {
  const [selectImage, setSelectImage] = useState(0);
  return (
    <div className="stay-hotel-mobile-view-image-container">
      <span
        className="image-left-arrow"
        onClick={() => {
          setSelectImage((prev) => {
            return prev - 1 > 0 ? prev - 1 : hotelImages.length - 1;
          });
        }}
      >
        <FontAwesomeIcon icon={faLessThan} />
      </span>
      <span className="image-right-arrow">
        <FontAwesomeIcon
          icon={faGreaterThan}
          onClick={() => {
            setSelectImage((prev) => {
              return (prev + 1) % hotelImages.length;
            });
          }}
        />
      </span>
      <img src={hotelImages && hotelImages[selectImage]} alt="hotel-image" />
    </div>
  );
};

export default StayHotelImageViewMobileView;
