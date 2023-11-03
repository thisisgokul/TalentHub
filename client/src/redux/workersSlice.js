import {createSlice} from "@reduxjs/toolkit";

const initialState={
    myWorkers:null

}

const workersSlice=createSlice({
    name:"myworkers",
    initialState,
    reducers:{
        setWorkersData:(state,action)=>{
            state.myWorkers=action.payload
        },
    }
})

export const {setWorkersData}=workersSlice.actions;
export default workersSlice.reducer;