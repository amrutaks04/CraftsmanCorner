import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name:"wishlist",
    initialState:{
        myList:[]
    },
    reducers:{
addProduct :(state,action)=>{
    state.myList.push(action.payload);
}
    }
})

export const {addProduct} = wishListSlice.actions;
export default wishListSlice.reducer;