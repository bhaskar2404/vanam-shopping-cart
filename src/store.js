import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { productReducer } from "./reducers/productReducers";

// store = createStore(productReducer, applyMiddleware);
const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productReducer,
    cart: cartReducer,
  }),
  initialState,

  composeEnhancer(applyMiddleware(thunk))
);

export default store;
