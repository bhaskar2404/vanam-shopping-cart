import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducers/productReducers";

// store = createStore(productReducer, applyMiddleware);
const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productReducer,
  }),
  initialState,

  composeEnhancer(applyMiddleware(thunk))
);

export default store;