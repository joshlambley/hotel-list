import React from "react";

const Sort = ({ activeSort, onSortChange }) => {
  return (
    <div className="sort-buttons">
      {/* Sort by Hotel Name button */}
      <button class="sort-buttons-button"
        className={activeSort === "name" ? "active" : ""}
        onClick={() => onSortChange("name")}
      >
        Sort by <strong>alphabetically</strong>
      </button>
      {/* Sort by Price button */}
      <button class="sort-buttons-button"
        className={activeSort === "price" ? "active" : ""}
        onClick={() => onSortChange("price")}
      >
        Sort by price
      </button>

      {/* Sort by Star Rating button */}
      <button class="sort-buttons-button"
        className={activeSort === "stars" ? "active" : ""}
        onClick={() => onSortChange("stars")}
      >
        Sort by star rating
      </button>
    </div>
  );
};

export default Sort;
