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
        updateUserStart:(state)=>{
            state.loading=true
        },
        updateUsersuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=false;
        },
        updateUserFail:(state,action)=>{
            state.loading=false
            state.error=action.payload;
        },
        delteAccountStart:(state)=>{
            state.loading=true
        },
        deleteAccountSuccess:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=false;
        },
        deleteAccountFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }
        ,
        signout:(state)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=false;
        }
    }
})

export const {singnInFail,singnInStart,singnInSuccess,updateUserFail
,updateUserStart,updateUsersuccess,deleteAccountFail,deleteAccountSuccess,delteAccountStart,signout}=userSlice.actions;

export default userSlice.reducer;