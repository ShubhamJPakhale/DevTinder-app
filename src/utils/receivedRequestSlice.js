import { createSlice } from "@reduxjs/toolkit";

const receivedConnectionReqSlice = createSlice({
    name : "receivedConnectionRequests",
    initialState: null,
    reducers: {
        receivedReqConnections: (state, action) => {
            return action.payload;
        },
        removeReceivedReqConnections: (state,action) => {
        const newArray = state.filter((request) => request._id !== action.payload);
        return newArray;
        },
    },
});

export const { receivedReqConnections, removeReceivedReqConnections } = receivedConnectionReqSlice.actions;

export default receivedConnectionReqSlice.reducer;