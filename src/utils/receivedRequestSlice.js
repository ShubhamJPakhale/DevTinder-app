import { createSlice } from "@reduxjs/toolkit";

const receivedConnectionReqSlice = createSlice({
    name : "receivedConnectionRequests",
    initialState: null,
    reducers: {
        receivedReqConnections: (state, action) => {
            return action.payload;
        },
        removeReceivedReqConnections: () => {
            return null;
        },
    },
});

export const { receivedReqConnections, removeReceivedReqConnections } = receivedConnectionReqSlice.actions;

export default receivedConnectionReqSlice.reducer;