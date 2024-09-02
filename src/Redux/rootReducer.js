import { combineReducers } from "@reduxjs/toolkit";
import { ordersReducer } from "./Reducers/orderReducer";

export const rootReducer = combineReducers({
    
    orders:ordersReducer
})