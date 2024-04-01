import React from "react";
import "./UnderConstractionPage.css";
import HeaderComponent from "../../navBar/header/HeaderComponent";
import Nav from "../../navBar/nav/Nav";
import image from "../../../assets/underconstaction/uderconstraction.png";

const UnderConstractionPage = () => {
  return (
    <div className="user-constaction-page-container">
      <div className="stay-page-nav">
        <HeaderComponent />
        <Nav page={""} className="stay-page-nav" />
      </div>
      <div className="under-constraction-page-body">
        <img src={image} />
        <p className="under-constraction-page-content">This page in process</p>
      </div>
    </div>
  );
};

export default UnderConstractionPage;
