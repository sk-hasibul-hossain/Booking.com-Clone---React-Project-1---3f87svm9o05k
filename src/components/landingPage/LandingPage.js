import React, { useEffect } from "react";
import Navbar from "../navBar/Navbar";
import SearchBar from "../searchBar/SearchBar";
import axios from "axios";
import SearchItems from "./searchItems/SearchItems";
import "./LandingPage.css";
import FooterPage from "./footerPage/FooterPage";
// import { Outlet } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <Navbar page={"stay"} />
      <div className="search-area">
        <SearchBar />
      </div>
      {/*<Outlet />*/}
      <main className="stay-home-body">
        <SearchItems />
      </main>
      <footer>
        <FooterPage />
      </footer>
    </>
  );
};

export default LandingPage;
