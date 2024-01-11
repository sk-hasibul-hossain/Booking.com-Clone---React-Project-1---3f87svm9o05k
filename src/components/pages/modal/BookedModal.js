import React, { useEffect, useState } from "react";
import "./BookedModal.css";
import { useNavigate } from "react-router-dom";

const BookedModal = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timeID = setInterval(() => {
      setCount((prev) => {
        return prev - 1;
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(timeID);
      navigate("/");
    }, 5000);
  }, []);

  return (
    <div className="booked-modal-container">
      <div className="inner-booked-modal-container">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 130.2 130.2"
        >
          <circle
            class="path circle"
            fill="none"
            stroke="#73AF55"
            stroke-width="6"
            stroke-miterlimit="10"
            cx="65.1"
            cy="65.1"
            r="62.1"
          />
          <polyline
            class="path check"
            fill="none"
            stroke="#73AF55"
            stroke-width="6"
            stroke-linecap="round"
            stroke-miterlimit="10"
            points="100.2,40.2 51.5,88.8 29.8,67.5 "
          />
        </svg>
        <p class="success">Booked Successfully!</p>
        <span>{count}</span>
        {/*<svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 130.2 130.2"
        >
          <circle
            class="path circle"
            fill="none"
            stroke="#D06079"
            stroke-width="6"
            stroke-miterlimit="10"
            cx="65.1"
            cy="65.1"
            r="62.1"
          />
          <line
            class="path line"
            fill="none"
            stroke="#D06079"
            stroke-width="6"
            stroke-linecap="round"
            stroke-miterlimit="10"
            x1="34.4"
            y1="37.9"
            x2="95.8"
            y2="92.3"
          />
          <line
            class="path line"
            fill="none"
            stroke="#D06079"
            stroke-width="6"
            stroke-linecap="round"
            stroke-miterlimit="10"
            x1="95.8"
            y1="38"
            x2="34.4"
            y2="92.2"
          />
        </svg>
        <p class="error">Bummer!</p>*/}
        <button
          className="booked-modal-btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Go home page
        </button>
      </div>
    </div>
  );
};

export default BookedModal;
