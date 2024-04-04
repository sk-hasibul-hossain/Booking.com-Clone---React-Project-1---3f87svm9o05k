import React, { useEffect, useState } from "react";
import "./SearchCitiesBox.css";

const SearchCitiesBox = ({
  cities,
  placeName,
  setPlaceName,
  setIsCitySectionShow,
}) => {
  const [filteredCities, setFilterCities] = useState({
    data: [],
    isError: cities?.isError,
  });
  const getFilteredValue = (data) => {
    if (placeName) {
      return data?.filter((ct) => {
        //filter DSA logic sliding window
        if (placeName && placeName.length <= ct.cityState.split(", ")[0].length)
          for (
            let i = 0, k = 0;
            i < ct.cityState.split(", ")[0].length - placeName.length + 1;
            i++
          ) {
            k = 0;
            for (let j = 0; j < placeName.length; j++) {
              if (
                ct.cityState
                  .split(", ")[0]
                  .toLowerCase()
                  .charAt(i + j) === placeName.toLowerCase().charAt(j)
              ) {
                k++;
              } else {
                break;
              }
            }
            if (k === placeName.length) {
              return true;
            }
          }
        return false;
      });
    } else {
      return cities?.data;
    }
  };
  useEffect(() => {
    // if (initialflag) {
    //   setFilterCities({
    //     data: cities?.data,
    //     isError: cities?.isError,
    //   });
    //   setInitialFlag(false);
    // } else {
    //   const filteredData = getFilteredValue(cities?.data);
    //   setFilterCities({
    //     data: filteredData,
    //     isError: filteredCities.isError,
    //   });
    // }
    const filteredData = getFilteredValue(cities?.data);
    setFilterCities({
      data: filteredData,
      isError: filteredCities.isError,
    });
  }, [placeName]);

  return (
    <div className="search-cities-outer-container">
      <div className="search-cities-inner-container">
        <div className="search-city-close-btn-container">
          <div
            className="search-city-close-btn"
            onClick={() => {
              setIsCitySectionShow(false);
            }}
          >
            Close
          </div>
        </div>
        <ul>
          {filteredCities?.data?.slice(0, 5)?.map((city) => {
            return (
              <li
                key={city._id}
                onClick={() => {
                  setPlaceName(city.cityState.split(", ")[0]);
                  setIsCitySectionShow(false);
                }}
              >
                {city.cityState.split(", ")[0]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SearchCitiesBox;
