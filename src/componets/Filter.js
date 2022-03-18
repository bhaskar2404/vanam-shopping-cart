import React from "react";

const Filter = ({ count, size, sort, filterProducts, sortProducts }) => {
  return (
    <div className="filter">
      <div className="filter-result">{count} Products</div>
      <div className="fitler-srt">
        Order
        <select value={sort} onChange={sortProducts}>
          <option value="none">Latest</option>
          <option value="low">Lowest</option>
          <option value="high">highest</option>
        </select>
      </div>
      <div className="filter-size">
        {" "}
        Filter
        <select value={size} onChange={filterProducts}>
          <option value="">All</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
