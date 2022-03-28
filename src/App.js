//feature -1

import React, { useEffect, useState } from "react";
import Products from "./componets/Products";
import Filter from "./componets/Filter";
import Cart from "./componets/Cart";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  const [products, setProducts] = useState();

  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  const createOrder = (order) => {
    alert(JSON.stringify(order));
  };
  const removeCartItem = (item) => {
    const cart = cartItems.filter((cartItem) => cartItem._id !== item._id);
    setCartItems(cart);

    localStorage.setItem("cartItems", JSON.stringify(cart));
  };

  const addToCart = (product) => {
    let cartItems1 = cartItems.slice();
    let alreadyInCart = false;
    cartItems?.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems1.push({ ...product, count: 1 });
    }
    setCartItems(cartItems1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems1));
  };

  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">Vanam Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products addToCart={addToCart} />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={cartItems}
                removeCartItem={removeCartItem}
                createOrder={createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right reservered</footer>
      </div>
    </Provider>
  );
}

export default App;
