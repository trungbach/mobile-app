import { createAsyncThunk } from "@reduxjs/toolkit";
import { shippingInfoApi } from "../../components/api/shippingInfoApi";

export const getListShippingAction = createAsyncThunk(
  "fetchListShipping",
  async (userId, { rejectWithValue }) => {
    try {
      const listShipping = await shippingInfoApi.getListShippingInfoByUserid(userId);
      return listShipping;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue("Failed");
    }
  }
);
export const deleteShippingAction = createAsyncThunk(
  "deleteShipping",
  async (id, { rejectWithValue }) => {
    try {
      await shippingInfoApi.deleteShippingInfo(id);
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
      const updatedShipping = await shippingInfoApi.updateShippingInfo(id, data);
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
      const updatedShipping = await shippingInfoApi.addShippingInfo(data);
      return updatedShipping;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue("Failed");
    }
  }
);
