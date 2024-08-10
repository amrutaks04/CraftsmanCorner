import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
    name:"user",
    initialState:{
        token:null
    },
    reducers:{
        setToken :(state,action)=>{
            state.token = action.payload;
        },
        removeToken:(state) =>{
            state.token = null;
        }
    }
})

export const {setToken,removeToken} = userslice.actions;
export default userslice.reducer;