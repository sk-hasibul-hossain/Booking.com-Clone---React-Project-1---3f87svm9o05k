import React from "react";
import "./StayHotelCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faGreaterThan,
  faIndianRupeeSign,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const StayHotelCard = ({
  stayHotelId,
  stayHotelName,
  stayHotelPlace,
  stayHotelRating,
  stayHotelRoomType,
  stayHotelRoomBedDetails,
  stayCancellationPolicy,
  stayHotelPrice,
  stayHotelTaxesAndFees,
  stayHotelImage,
}) => {
  const navigate = useNavigate();
  const getStars = (n) => {
    const starArr = [];
    let hasFraction = (n * 10) % 10 === 5;
    for (let i = 0; i < Math.ceil(n); i++) {
      if (i < Math.floor(n)) {
        starArr.push(
          <span>
            <FontAwesomeIcon className="card-star-color-one" icon={faStar} />
          </span>
        );
      } else if (hasFraction) {
        hasFraction = false;
        starArr.push(
          <div className="hotel-review-half-star">
            <FontAwesomeIcon className="item1" icon={faStar} />
            <FontAwesomeIcon icon={faStarHalf} />
          </div>
        );
      }
      //   else {
      //     starArr.push(
      //       <span className="card-star-color-two">
      //         <FontAwesomeIcon icon={faStar} />
      //       </span>
      //     );
      //   }
    }
    // if (n === 3.5) {
    //   console.log("if condition->", starArr);
    // }
    return starArr;
  };
  return (
    <div className="stay-hotel-card-container">
      <div className="inner-stay-hotel-card-container">
        <div className="stay-card-image">
          <img src={stayHotelImage} alt="stay-hotel-img" />
        </div>
        <div className="stay-card-body">
          <div className="stay-card-title-card">
            <div className="inner-stay-card-title">
              <h1>{stayHotelName}</h1>
              <div className="stay-card-hotel-review">
                {stayHotelRating} {getStars(stayHotelRating)}
              </div>
            </div>
            <p>{stayHotelPlace}</p>
          </div>
          <div className="stay-card-description">
            <div className="stay-card-description-details">
              <h1>{stayHotelRoomType}</h1>
              <p>{stayHotelRoomBedDetails}</p>
              <div className="stay-card-policy-description">
                <FontAwesomeIcon icon={faCheck} />
                <p>{stayCancellationPolicy}</p>
              </div>
            </div>
            <div className="stay-card-price-details">
              <div className="stay-card-price-section-container">
                <div className="stay-card-price-section">
                  <FontAwesomeIcon icon={faIndianRupeeSign} />
                  <h1>{stayHotelPrice}</h1>
                </div>
                <div className="stay-card-tax-on-hotel-price">
                  <span>+</span>
                  <p>{stayHotelTaxesAndFees}</p>
                </div>
              </div>
              <div
                className="stay-card-btn"
                onClick={() => {
                  navigate(`/hotel/${stayHotelId}`);
                }}
              >
                <p>See availability</p>
                <span>
                  <FontAwesomeIcon icon={faGreaterThan} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayHotelCard;
