import React from "react";
import "./FooterPage.css";

const FooterPage = () => {
  return (
    <div className="footer-container">
      <div className="footer-1">
        <h1>Save time, save money!</h1>
        <h2>Sign up and we'll send the best deals to you</h2>
        <div className="subscribe-input-conatiner">
          <input type="text" placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
