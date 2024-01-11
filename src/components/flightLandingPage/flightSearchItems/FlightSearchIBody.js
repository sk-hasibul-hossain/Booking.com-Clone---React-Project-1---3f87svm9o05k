import React from "react";
import "./FlightSearchIBody.css";

export const FlightSearchIBody = () => {
  return (
    <div className="flight-landing-page-body-container">
      <section>
        <div className="inner-flight-landing-page-body-container">
          <section className="flight-body-section-one">
            <img
              src={
                "https://t-cf.bstatic.com/design-assets/assets/v3.99.1/illustrations-traveller/MagnifyingGlassUsp.png"
              }
              alt="img"
            />
            <div className="flight-body-section-one-description">
              <h1>Search a huge selection</h1>
              <div>
                <p>Easily compare flights, airlines and</p>
                <p>prices - all in one place</p>
              </div>
            </div>
          </section>
          <section className="flight-body-section-one">
            <img
              src={
                "https://t-cf.bstatic.com/design-assets/assets/v3.99.1/illustrations-traveller/MoneyUsp.png"
              }
              alt="img"
            />
            <div className="flight-body-section-one-description">
              <h1>Pay no hidden fees</h1>
              <div>
                <p>Get a clear price breakdown, every step</p>
                <p>of the way</p>
              </div>
            </div>
          </section>
          <section className="flight-body-section-one">
            <img
              src={
                "https://t-cf.bstatic.com/design-assets/assets/v3.99.1/illustrations-traveller/TicketsUsp.png"
              }
              alt="img"
            />
            <div className="flight-body-section-one-description">
              <h1>Get more flexibility</h1>
              <div>
                <p>Change your travel dates with the</p>
                <p>Flexible ticket option*</p>
              </div>
            </div>
          </section>
        </div>
      </section>
      <section>
        <div className="flight-frequently-ask-questions">
          <h1>Frequently asked questions</h1>
          <div className="flight-frequently-ask-questions-description">
            <div className="flight-frequently-ask-questions-description-section-one">
              <div className="flight-frequently-ask-questions-cards">
                <h2>How do I find the cheapest flights on Booking.com?</h2>
                <p>
                  You can sort flights by price to see them from cheapest to
                  most expensive. To find the cheapest flights, you also need to
                  consider factors such as when you are booking and when you
                  want to travel.
                </p>
              </div>
              <div className="flight-frequently-ask-questions-cards">
                <h2>How do I find the cheapest flights on Booking.com?</h2>
                <p>
                  You can sort flights by price to see them from cheapest to
                  most expensive. To find the cheapest flights, you also need to
                  consider factors such as when you are booking and when you
                  want to travel.
                </p>
              </div>
              <div className="flight-frequently-ask-questions-cards">
                <h2>How far in advance can I book a flight?</h2>
                <p>
                  You can book a flight up to one year before your departure
                  date.
                </p>
              </div>
            </div>
          </div>
          <div className="flight-frequently-ask-questions-description">
            <div className="flight-frequently-ask-questions-description-section-one">
              <div className="flight-frequently-ask-questions-cards">
                <h2>Do flights get cheaper closer to departure?</h2>
                <p>
                  Generally, flight prices are more likely to increase the
                  closer you get to your flight date.
                </p>
              </div>
              <div className="flight-frequently-ask-questions-cards">
                <h2>What is a flexible ticket?</h2>
                <p>
                  A flexible ticket allows you to change your flight with the
                  same airline company by only paying the fare and tax
                  difference. It can only be used for one confirmed change. You
                  are able to add the flexible ticket when booking your flight.
                </p>
              </div>
              <div className="flight-frequently-ask-questions-cards">
                <h2>Does Booking.com charge credit card fees?</h2>
                <p>
                  No, we don't charge any credit card fees. You can always see
                  exactly what you’re paying for in the price breakdown when you
                  review your booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
