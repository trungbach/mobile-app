import { createSlice } from "@reduxjs/toolkit";
import {
  getUserbyIdAction,
  loginAction,
  registerAction,
} from "../actions/userActions";
const initialState = {
  isLoadingHome: false,
  homeData: [],
};

const homeSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    fetchHomeData: (state, action) => {
      state.homeData = action.payload;
    },
  },
});
export const { actions: homeAction, reducer: homeReducer } = homeSlice;
