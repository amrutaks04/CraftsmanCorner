import { configureStore } from "@reduxjs/toolkit";
import wishListSlice from "./wishListSlice";

const store = configureStore({
    reducer:{
        wishlist:wishListSlice
    }
})

export default store;