import { createAsyncThunk } from "@reduxjs/toolkit";
import { shippingInfoApi } from "../../components/api/shippingInfoApi";

export const getListShippingAction = createAsyncThunk(
  "fetchListShipping",
  async (userId, { rejectWithValue }) => {
    try {
      console.log(userId)
      const listShipping = await shippingInfoApi.getListShippingInfoByUserid(
        userId
      );
      console.log( "cccc")
      console.log( listShipping.length)
      return listShipping;
    } catch (error) {
      console.log(error.message)
      return rejectWithValue("Failed");
    }
  }
);
export const deleteShippingAction = createAsyncThunk(
  "deleteShipping",
  async (id, { rejectWithValue }) => {
    
    try {
      const deletedShipping = await shippingInfoApi.deleteShippingInfo(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed");
    }
  }
);
export const updateShippingAction = createAsyncThunk(
  "updateShipping",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updatedShipping = await shippingInfoApi.updateShippingInfo(
        id,
        data
      );
      return updatedShipping;
    } catch (error) {
      return rejectWithValue("Failed");
    }
  }
);
export const addShippingAction = createAsyncThunk(
  "addShipping",
  async (data, { rejectWithValue }) => {
    try {
      const updatedShipping = await shippingInfoApi.addShippingInfo(
        data
      );
      return updatedShipping;
    } catch (error) {
      console.log(error.message)
      return rejectWithValue("Failed");
    }
  }
);


