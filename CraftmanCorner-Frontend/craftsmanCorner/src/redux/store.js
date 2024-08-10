import { configureStore } from "@reduxjs/toolkit";
import wishListSlice from "./wishListSlice";
import userSlice from "./userSlice";

const store = configureStore({
    reducer:{
        wishlist:wishListSlice,
        user:userSlice
    }
})

export default store;