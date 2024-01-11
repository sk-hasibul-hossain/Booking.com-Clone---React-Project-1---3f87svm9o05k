import React from "react";
import "./StayFilterPage.css";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StayFilterPage = ({ isFiverStarChecked, setIsFiverStarChecked }) => {
  return (
    <div className="stay-filter-page-container">
      <div className="inner-stay-filter-page-container">
        <div className="stay-filter-header">
          <h1>Filter by: </h1>
        </div>
        <div className="stay-filter-body">
          <h2>Popular Filters</h2>
          <div
            className="stay-filter-item-1"
            onClick={() => {
              setIsFiverStarChecked((prev) => !prev);
            }}
          >
            <span>
              <FontAwesomeIcon
                icon={faSquareCheck}
                className={
                  isFiverStarChecked
                    ? "stay-star-ckecked"
                    : "stay-star-not-ckecked"
                }
              />
            </span>
            <label>5 star</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayFilterPage;
