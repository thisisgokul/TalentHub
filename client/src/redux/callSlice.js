import {createSlice} from "@reduxjs/toolkit";

const initialState={
    callData: {
        socketId: '',
        receivingCalls: false,
        callEnded: false,
      },
      callAccepted: false,

}

const callSlice=createSlice({
    name:"calling",
    initialState,
    reducers:{
        setCallData: (state, action) => {
            state.callData = action.payload;
          },
          setCallAccepted: (state, action) => {
            state.callAccepted = action.payload;
          },
    }
})

export const {setCallAccepted,setCallData}=callSlice.actions;
export default callSlice.reducer;