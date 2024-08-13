import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
    name:"user",
    initialState:{
        token:localStorage.getItem('token')||null
    },
    reducers:{
        setToken :(state,action)=>{
            state.token = action.payload;
            localStorage.setItem('token',action.payload)
        },
        removeToken:(state) =>{
            state.token = null;
            localStorage.removeItem('token');
        }
    }
})

export const {setToken,removeToken} = userslice.actions;
export default userslice.reducer;