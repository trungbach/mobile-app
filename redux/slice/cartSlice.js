import { createSlice } from "@reduxjs/toolkit";
import {
  addCartAction,
  deleteCartAction,
  fetchListCartAction,
  updateCartAction,
} from "../actions/cartAction";
const initialState = {
  listCart: [],
  isLoading: false,
  error: null,
  listPayment: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addListPayment: (state, action) => {
      const index = state.listPayment.findIndex(
        (item) => item === action.payload
      );
      if (index < 0) {
        state.listPayment.push(action.payload);
      }
    },
    deletePayment: (state, action) => {
      state.listPayment = state.listPayment.filter(
        (item) => item !== action.payload
      );
    },
    setListPayment:(state,action) => {
      console.log(action.payload)
      state.listPayment = action.payload;
    }
  },
  
  extraReducers: (builder) =>
    builder
      .addCase(addCartAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCartAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCart.unshift(action.payload);
      })
      .addCase(addCartAction.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteCartAction.pending, (state) => {
       
      })
      .addCase(deleteCartAction.fulfilled, (state, action) => {
     
        state.listCart = state.listCart.filter(
          (item) => item._id != action.payload._id
        );
      })
      .addCase(deleteCartAction.rejected, (state, action) => {
      
      })
      .addCase(updateCartAction.pending, (state) => {
       
      })
      .addCase(updateCartAction.fulfilled, (state, action) => {
        console.log("update ok");
        const index = state.listCart.findIndex(
          (item) => item._id == action.payload._id
        );
        state.listCart[index] = { ...state.listCart[index], ...action.payload };
      })
      .addCase(updateCartAction.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchListCartAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchListCartAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.listCart = action.payload;
      })
      .addCase(fetchListCartAction.rejected, (state, action) => {
        state.isLoading = false;
      }),
});
export const { actions: cartAction, reducer: cartReducer } = cartSlice;
