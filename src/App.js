//feature -1

import data from "./data.json";
import React, { useState } from "react";
import Products from "./componets/Products";

function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");

  return (
    <div className="grid-container">
      <header>
        <a href="/">Vanam Shopping Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
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
