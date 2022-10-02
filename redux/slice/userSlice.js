import { createSlice } from "@reduxjs/toolkit";
import {
  getUserbyIdAction,
  loginAction,
  registerAction,
} from "../actions/userActions";
const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getUserbyIdAction.pending, (state) => {
        console.log("pending");
        state.isLoading = true;
      })
      .addCase(getUserbyIdAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserbyIdAction.rejected, (state, action) => {
        console.log("failed");
        state.error = action.payload;
        state.isLoading = false;
      }),
});
export const { actions: userAction, reducer: userReducer } = userSlice;
