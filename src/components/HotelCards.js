import React, { useState } from "react";

const HotelCard = ({ hotel }) => {
  const [expanded, setExpanded] = useState(false);

  // Convert numeric star rating into stars (e.g., "★★★★★")
  const renderStars = (stars) => "★".repeat(stars) + "☆".repeat(5 - stars);

  // Function to add the correct suffix to a date (e.g., 1st, 2nd)
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();

    return `${day}${getOrdinalSuffix(day)} of ${month} ${year}`;
  };

  // Ensure price always has two decimal places
  const formatPrice = (price) => price.toFixed(2);

  return (
    <div className="width">
      <div className="hotel-card">
        {/* Left: Hotel image and Show More button */}
        <div className="hotel-image-container">
          <img
            src={hotel.resort.image.url}
            alt={hotel.resort.image.description}
            className="hotel-image"
          />

          {/* Show "Offer" pill if the hotel has less than 5 stars */}
          {hotel.resort.starRating < 5 && (
            <span className="offer-pill" data-testid="offer-pill">Offer</span>
          )}

          <button className="show-more" onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <>
                <strong>Read less</strong> about this hotel
              </>
            ) : (
              <>
                <strong>Read more</strong> about this hotel
              </>
            )}
            <span className={`arrow ${expanded ? "down" : "up"}`}>▼</span>
          </button>
        </div>

        {/* Right: Hotel info */}
        <div className="hotel-info">
          <h3>{hotel.resort.name}</h3>
          <p class="greyed ns">
            {hotel.resort.regionName}, {hotel.resort.countryName}
          </p>
          <p className="stars ns">{renderStars(hotel.resort.starRating)}</p>

          <p className="ns">
            <strong>{hotel.bookingDetails.party.adults}</strong> Adults,{" "}
            <strong>{hotel.bookingDetails.party.children}</strong> Children
            {hotel.bookingDetails.party.infants > 0 && (
              <>
                , <strong>{hotel.bookingDetails.party.infants}</strong> Infants
              </>
            )}
          </p>
          <p className="ns">
            <strong>{formatDate(hotel.flightDetails.departureDate)}</strong> for{" "}
            <strong>{hotel.bookingDetails.lengthOfStay} days</strong>
          </p>
          <p className="ns">
            departing from{" "}
            <strong>{hotel.flightDetails.departureAirport}</strong>
          </p>
          <div className="book-button">
            <p class="ns blue">Book now</p>
            <p class="ns price">
              <strong>£{formatPrice(hotel.bookingDetails.price.amount)}</strong>
            </p>
          </div>
        </div>
        {expanded && (
          <div className="hotel-details">
            <strong><p class="blue">Overview</p></strong>
            <p>{hotel.resort.overview}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelCard;
