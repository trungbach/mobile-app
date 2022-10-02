import { createSlice } from "@reduxjs/toolkit";
import {
  addShippingAction,
  deleteShippingAction,
  getListShippingAction,
  updateShippingAction,
} from "../actions/shippingInfoAction";
const initialState = {
  listShipping: [],
  isLoading: false,
  error: null,
};
const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {},

  extraReducers: (builder) =>
    builder
      .addCase(getListShippingAction.pending, (state) => {
        console.log("pendding");
        state.isLoading = true;
      })
      .addCase(getListShippingAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listShipping = action.payload;
      })
      .addCase(getListShippingAction.rejected, (state, action) => {
        state.isLoading = false;
        console.log("rejected");
      })

      .addCase(deleteShippingAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteShippingAction.fulfilled, (state, action) => {
        
        state.isLoading = false;
        state.listShipping = state.listShipping.filter(
          (item) => item._id != action.payload
        );
      })
      .addCase(deleteShippingAction.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateShippingAction.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateShippingAction.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("update ok");
        const index = state.listShipping.findIndex(
          (item) => item._id == action.payload._id
        );
        state.listShipping[index] = {
          ...state.listShipping[index],
          ...action.payload,
        };
      })
      .addCase(updateShippingAction.rejected, (state, action) => {
        state.isLoading = false;
      })

      .addCase(addShippingAction.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(addShippingAction.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("add ok");
        state.listShipping.unshift(action.payload);
      })
      .addCase(addShippingAction.rejected, (state, action) => {
        state.isLoading = false;
      }),
});
export const { actions: shippingAction, reducer: shippingReducer } =
  shippingSlice;
