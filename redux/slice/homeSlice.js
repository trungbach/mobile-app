import { createSlice } from "@reduxjs/toolkit";
import { searchProduct } from "../actions/searchAction";
const initialState = {
  isLoadingHome: false,
  homeData: [],
  searchLoading: false,
  searchResult: [],
};

const homeSlice = createSlice({
  name: "fetchHomeData",
  initialState: initialState,
  reducers: {
    fetchHomeData: (state, action) => {
      state.homeData = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(searchProduct.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResult = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.searchLoading = false;
      }),
});
export const { actions: homeAction, reducer: homeReducer } = homeSlice;
