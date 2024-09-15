import { combineReducers } from "@reduxjs/toolkit";
import { productsReducer } from "./Reducers/productsReducer";
import { ordersReducer } from "./Reducers/orderReducer";
export const rootReducer = combineReducers({
  products: productsReducer,
  orders: ordersReducer,
});
