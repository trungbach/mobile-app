import { createAsyncThunk } from "@reduxjs/toolkit";
import homeApi from "../../components/api/homeApi";

export const searchProduct = createAsyncThunk(
  "search/searchProduct",
  async (payload, { rejectWithValue }) => {
    try {
      const searchResponse = await homeApi.searchProduct(payload);
      return searchResponse;
    } catch (error) {
      return rejectWithValue("Failed");
    }
  }
);
