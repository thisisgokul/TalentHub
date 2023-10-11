import {createSlice} from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    error:false
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        singnInStart:(state)=>{
            state.loading=true
        },
        singnInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=false;
        },
        singnInFail:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        signout:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=false;
        }
    }
})

export const {singnInFail,singnInStart,singnInSuccess,signout}=userSlice.actions;

export default userSlice.reducer;