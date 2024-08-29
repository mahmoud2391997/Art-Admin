import { combineReducers } from "@reduxjs/toolkit";
import { productsReducer } from "./Reducers/productsReducer";

export const rootReducer = combineReducers({
    products: productsReducer
})