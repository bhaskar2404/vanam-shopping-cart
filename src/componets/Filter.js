import React, { useEffect } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts1 } from "../action/productActions";
const Filter = ({
  count,
  size,
  sort,

  sortProducts,
  ...props
}) => {
  // useEffect(() => {
  //   props.filterProducts();
  // });

  console.log("Props printing", props);
  return !props.filteredProducts ? (
    <div>Loading...</div>
  ) : (
    <div className="filter">
      <div className="filter-result">
        {props.filteredProducts.length} Products
      </div>
      <div className="fitler-srt">
        Order
        <select
          value={props.sort}
          onChange={(e) =>
            props.sortProducts1(props.filteredProducts, e.target.value)
          }
        >
          <option value="none">Latest</option>
          <option value="low">Lowest</option>
          <option value="high">highest</option>
        </select>
      </div>
      <div className="filter-size">
        {" "}
        Filter
        <select
          value={props.size}
          onChange={(e) => props.filterProducts(props.products, e.target.value)}
        >
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

export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  { filterProducts, sortProducts1 }
)(Filter);
