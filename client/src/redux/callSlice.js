import {createSlice} from "@reduxjs/toolkit";

const initialState={
    myWorkers:null

}

const callSlice=createSlice({
    name:"myworkers",
    initialState,
    reducers:{
        setWorkersData:(state,action)=>{
            state.myWorkers=action.payload
        },
    }
})

export const {setWorkersData}=callSlice.actions;
export default callSlice.reducer;