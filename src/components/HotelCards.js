import React, { useState } from "react";

const HotelCard = ({ hotel }) => {
  const [expanded, setExpanded] = useState(false);

  // Convert numeric star rating into stars (e.g., "★★★★★")
  const renderStars = (stars) => "★".repeat(stars) + "☆".repeat(5 - stars);

  // Function to add the correct suffix to a date (e.g., 1st, 2nd)
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; 
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
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
          {hotel.resort.starRating < 5 && <span className="offer-pill">Offer</span>}

          <button className="show-more" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Read less about this hotel" : "Read more about this hotel"}
            <span className={`arrow ${expanded ? "down" : "up"}`}>▼</span>
          </button>
        </div>

        {/* Right: Hotel info */}
        <div className="hotel-info">
          <h3>{hotel.resort.name}</h3>
          <p className="greyed">{hotel.resort.regionName}, {hotel.resort.countryName}</p>
          <p className="stars">{renderStars(hotel.resort.starRating)}</p>

          <p className="ns">
            <strong></strong> {hotel.bookingDetails.party.adults} Adults, {hotel.bookingDetails.party.children} Children
            {hotel.bookingDetails.party.infants > 0 && `, ${hotel.bookingDetails.party.infants} Infants`}
          </p>
          <p className="ns"><strong></strong> {formatDate(hotel.flightDetails.departureDate)} for {hotel.bookingDetails.lengthOfStay} days</p>
          <p className="ns">departing from {hotel.flightDetails.departureAirport}</p>
          <div className="book-button">
            <p>Book now</p>
            <p className="price"><strong>£{formatPrice(hotel.bookingDetails.price.amount)}</strong></p>
          </div>
        </div>
      {expanded && (
        <div className="hotel-details">
          <p>{hotel.resort.overview}</p>
        </div>
      )}
      </div>

     
    </div>
  );
};

export default HotelCard;
