import { createAsyncThunk } from "@reduxjs/toolkit";
import { cartApi } from "../../components/api/cartApi";

export const addCartAction = createAsyncThunk(
  "cart/add",
  async (data, { rejectWithValue }) => {
    try {
      const newCart = await cartApi.addCart(data);
      return newCart;
    } catch (error) {
      return rejectWithValue("Failed");
    }
  }
);
export const updateCartAction = createAsyncThunk(
  "cart/update",
  async ({ id, data }, { rejectWithValue }) => {
    console.log(id)
    try {
      const updatedCart = await cartApi.updateCart(id, data);
      return updatedCart;
    } catch (error) {
      console.log(error.message)
      return rejectWithValue("Failed");
    }
  }
);
export const deleteCartAction = createAsyncThunk(
  "cart/delete",
  async ( id, { rejectWithValue }) => {
    try {
      const deletedCart = await cartApi.deleteCart(id);
      return deletedCart;
    } catch (error) {
      console.log("err");
      return rejectWithValue("Failed");
    }
  }
);
export const fetchListCartAction = createAsyncThunk(
  "cart/fetchAllCart",
  async (id, { rejectWithValue }) => {
    try {
      const listCart = await cartApi.fetchListCart(id);
      return listCart;
    } catch (error) {
      return rejectWithValue("Failed");
    }
  }
);
