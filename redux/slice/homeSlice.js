import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoadingHome: false,
  homeData: [],
};

const homeSlice = createSlice({
  name: "fetchHomeData",
  initialState: initialState,
  reducers: {
    fetchHomeData: (state, action) => {
      state.homeData = action.payload;
    },
  },
});
export const { actions: homeAction, reducer: homeReducer } = homeSlice;
