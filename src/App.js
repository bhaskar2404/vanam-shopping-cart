//feature -1

import data from "./data.json";
import React, { useEffect, useState } from "react";
import Products from "./componets/Products";
import Filter from "./componets/Filter";

function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [fitlerData, setFilterData] = useState();

  const filterProducts = (event) => {
    let filterData;
    if (event.target.value === "") {
      setProducts(data.products);
      setSize(event.target.value);
    } else {
      setSize(event.target.value);
      console.log(data.products);
      var x = new Array();
      filterData = data.products.filter((product) => {
        let y = product.availableSizes;
        y.filter((s) => {
          if (s === event.target.value) {
            x.push(product);
          }
        });
      });
      setProducts(x);
    }
  };

  const sortProducts = (event) => {
    console.log(event.target.value);
    setSort((pres) => event.target.value);

    setProducts((previous) =>
      sort === "low"
        ? previous.sort((a, b) => b.price - a.price)
        : sort === "high"
        ? previous.sort((a, b) => a.price - b.price)
        : previous.sort((a, b) => a._id - b._id)
    );
  };

  return (
    <div className="grid-container">
      <header>
        <a href="/">Vanam Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={products.length}
              size={size}
              sort={sort}
              filterProducts={filterProducts}
              sortProducts={sortProducts}
            />
            <Products products={products} />
          </div>
          <div className="sidebar">Card items</div>
        </div>
      </main>
      <footer>All right reservered</footer>
    </div>
  );
}

export default App;
