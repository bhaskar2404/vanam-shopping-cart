//feature -1

import data from "./data.json";
import React, { useEffect, useState } from "react";
import Products from "./componets/Products";
import Filter from "./componets/Filter";
import Cart from "./componets/Cart";
import store from "./store";
import { Provider } from "react-redux";
import ErrorBoundary from "./errors/ErrorBoundary";

function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">Vanam Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <ErrorBoundary>
                <Filter />
              </ErrorBoundary>
              <ErrorBoundary>
                <Products />
              </ErrorBoundary>
            </div>
            <div className="sidebar">
              <ErrorBoundary>
                <Cart />
              </ErrorBoundary>
            </div>
          </div>
        </main>
        <footer>All right reservered</footer>
      </div>
    </Provider>
  );
}

export default App;
