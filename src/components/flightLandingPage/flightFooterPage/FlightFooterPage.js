import React from "react";
import "./FlightFooterPage.css";

const FlightFooterPage = () => {
  return (
    <div className="flight-footer-page-container">
      <div className="inner-flight-footer-page-container">
        <section>
          <h1>Support</h1>
          <ul>
            <li>Coronavirus (COVID-19) FAQs</li>
            <li>Manage your trips</li>
            <li>Customer Service help</li>
            <li>Safety resource centre</li>
          </ul>
        </section>
        <section>
          <h1>Discover</h1>
          <ul>
            <li>Genius loyalty programme</li>
            <li>Seasonal and holiday deals</li>
            <li>Travel articles</li>
            <li>Booking.com for Business</li>
            <li>Traveller Review Awards</li>
            <li>Car hire</li>
            <li>Flight finder</li>
            <li>Restaurant reservations</li>
            <li>Booking.com for Travel Agents</li>
          </ul>
        </section>
        <section>
          <h1>Terms and settings</h1>
          <ul>
            <li>Privacy & cookies</li>
            <li>Terms and conditions</li>
            <li>MSA Statement</li>
          </ul>
        </section>
        <section>
          <h1>Partners</h1>
          <ul>
            <li>Extranet login</li>
            <li>Partner help</li>
            <li>List your property</li>
            <li>Become an affiliate</li>
          </ul>
        </section>
        <section>
          <h1>About</h1>
          <ul>
            <li>About Booking.com</li>
            <li>How we work</li>
            <li>Sustainability</li>
            <li>Press centre</li>
            <li>Careers</li>
            <li>Investor relations</li>
            <li>Corporate contact</li>
          </ul>
        </section>
      </div>
      <div className="flight-copy-right-container">
        <p>
          Booking.com is part of Booking Holdings Inc., the world leader in
          online travel and related services.
        </p>
        <p>Copyright © 1996–2024 Booking.com™. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FlightFooterPage;
