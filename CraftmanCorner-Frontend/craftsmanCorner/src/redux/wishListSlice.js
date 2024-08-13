import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
    name:"wishlist",
    initialState:{
        myList:[]
    },
    reducers:{
        setList:(state,action)=>{
state.myList=action.payload
        },
addProduct :(state,action)=>{
    state.myList.push(action.payload);
}
    }
})

export const {addProduct,setList} = wishListSlice.actions;
export default wishListSlice.reducer;