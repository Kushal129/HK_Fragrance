import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

// First creat a store then configureStore and create a reducer
export const store = configureStore({
    reducer: {
        cart : cartSlice

    },
    devTools:true
})