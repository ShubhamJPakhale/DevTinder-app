import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState : null,
  reducers: {
    getAllFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((request) => request._id !== action.payload);
      return newFeed;
    }
  },
});

export const { getAllFeed, removeUserFromFeed } = feedSlice.actions;

export default feedSlice.reducer;