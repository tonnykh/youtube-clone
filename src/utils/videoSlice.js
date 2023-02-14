import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    searchVideos: [],
  },
  reducers: {
    addSearchVideos: (state, action) => {
      return { ...state.searchVideos, ...action.payload };
    },
  },
});

export const { addSearchVideos } = videoSlice.actions;

export default videoSlice.reducer;
