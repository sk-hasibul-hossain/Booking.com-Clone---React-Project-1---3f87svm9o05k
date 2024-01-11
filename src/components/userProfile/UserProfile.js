import React, { useState } from "react";
import "./UserProfile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const UserProfile = () => {
  const [profileToggleBtn, setProfileToggleBtn] = useState(false);
  const userValue = JSON.parse(sessionStorage.getItem("userName"));
  const { setIsLogin } = useAuth();
  const navigate = useNavigate();
  const handleLogoutBtn = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userToken");
    localStorage.removeItem("stayPageValue");
    setIsLogin(false);
    navigate("/signin");
  };
  return (
    <div className="user-profile-container">
      <div
        className="inner-user-profile-container"
        onClick={() => {
          setProfileToggleBtn((prev) => !prev);
        }}
      >
        <FontAwesomeIcon icon={faUser} />
        &nbsp;Hi,
        <span>
          &nbsp;
          {userValue &&
            userValue
              .split(" ")
              .map((word) => word[0].toUpperCase())
              .join(" ")}
        </span>
      </div>
      {profileToggleBtn && (
        <div className="user-profile-modal-conatiner">
          <div className="inner-user-profile-modal-conatiner">
            <div className="profile-logout-btn" onClick={handleLogoutBtn}>
              <span>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
