import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAlphaDown, faSterlingSign, faStar } from "@fortawesome/free-solid-svg-icons";

const Sort = ({ activeSort, onSortChange }) => {
  return (
    <div className="sort-buttons">
      {/* Sort by Hotel Name button */}
      <button
        className={`sort-buttons-button ${activeSort === "name" ? "active" : ""}`}
        onClick={() => onSortChange("name")}
      >
        <span>Sort by <strong>alphabetically</strong></span>
        <FontAwesomeIcon icon={faSortAlphaDown} />
      </button>

      {/* Sort by Price button */}
      <button
        className={`sort-buttons-button ${activeSort === "price" ? "active" : ""}`}
        onClick={() => onSortChange("price")}
      >
        <span>Sort by <strong>price</strong></span>
        <FontAwesomeIcon icon={faSterlingSign} />
      </button>

      {/* Sort by Star Rating button */}
      <button
        className={`sort-buttons-button ${activeSort === "stars" ? "active" : ""}`}
        onClick={() => onSortChange("stars")}
      >
        <span>Sort by <strong>star rating</strong></span>
        <FontAwesomeIcon icon={faStar} />
      </button>
    </div>
  );
};

export default Sort;
