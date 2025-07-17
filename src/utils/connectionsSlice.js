import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    userConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: () => {
      return null;
    },
  },
});

export const { userConnections, removeConnections } = connectionsSlice.actions;

export default connectionsSlice.reducer;
