import {
  FETCH_PRODUCTS,
  ORDER_PRODUCTS_BY_PRICE,
  FETCH_PRODUCTS_BY_SIZE,
} from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("api/products");
  const data = await res.json();
  console.log("Data====" + data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  console.log("called fitler Products");
  dispatch({
    type: FETCH_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};
export const sortProducts1 = (fitlerProducts, sort) => (dispatch) => {
  console.log("called sort Products");
  //const sortedProdcts = fitlerProducts.slice();
  const sortedProdcts = [...fitlerProducts];
  if (sort === "none") {
    sortedProdcts.sort((x, y) => (x._id > y._id ? 1 : -1));
  } else {
    sortedProdcts.sort((x, y) =>
      sort === "low" ? (x.price > y.price ? 1 : -1) : x.price > y.price ? -1 : 1
    );
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProdcts,
    },
  });
};
