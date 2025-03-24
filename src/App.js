
import React, { useEffect, useState } from "react";
import HotelCards from "./components/HotelCards";
import Sort from "./components/Sort";
const DATA_URL = "https://static.onthebeach.co.uk/fe-code-test/data.json";

const HotelList = () => {
  // State to store the list of hotels
  const [hotels, setHotels] = useState([]);
  // State to track the active sorting method
  const [sortBy, setSortBy] = useState("price");

  // Fetch data when the component mounts
  useEffect(() => {
    fetch(DATA_URL)
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => setHotels(sortHotels(data, "price"))) // Sort by price initially
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to sort hotels based on criteria
  const sortHotels = (hotels, criteria) => {
    return [...hotels].sort((a, b) => {
      if (criteria === "price") return a.bookingDetails.price.amount - b.bookingDetails.price.amount;
      if (criteria === "stars") return b.resort.starRating - a.resort.starRating;
      if (criteria === "name") return a.resort.name.localeCompare(b.resort.name);
      return 0;
    });
  };

  // Handle sort button clicks
  const handleSortChange = (criteria) => {
    setSortBy(criteria);
    setHotels(sortHotels(hotels, criteria));
  };

  return (
    <div className="container">
      {/* Sorting buttons */}
      <div class="sort-filters">
      <Sort activeSort={sortBy} onSortChange={handleSortChange} />
      </div>

      {/* Display hotel list */}
      <div className="hotel-list">
        {hotels.map((hotel) => (
          <HotelCards key={hotel.resort.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelList;