//feature -1

import data from "./data.json";
import React, { useEffect, useState } from "react";
import Products from "./componets/Products";
import Filter from "./componets/Filter";
import Cart from "./componets/Cart";

function App() {
  const [products, setProducts] = useState(data.products);
  const [size, setSize] = useState("");
  const [sort, setSort] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const removeCartItem = (item) => {
    const cart = cartItems.filter((cartItem) => cartItem._id !== item._id);
    setCartItems(cart);
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
  };

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
            <Products products={products} addToCart={addToCart} />
          </div>
          <div className="sidebar">
            <Cart cartItems={cartItems} removeCartItem={removeCartItem} />
          </div>
        </div>
      </main>
      <footer>All right reservered</footer>
    </div>
  );
}

export default App;
