import { createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../components/api/userApi";
import * as SecureStore from "expo-secure-store";
import { userAction } from "../slice/userSlice";
export const registerAction = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const user = await userApi.register(data);
      const { email, password } = user;
      return user;
    } catch (error) {
      const { status } = error.response;
      if (status === 409) {
        return rejectWithValue("Account already exists");
      } else {
        return rejectWithValue("Failed");
      }
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "user",
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const user = await userApi.updateProfile(id, data);
      dispatch(userAction.setUser(user));
      return user;
    } catch (error) {
      const { status } = error.response;
      if (status === 400) {
        return rejectWithValue("User Profile is not updated");
      } else {
        return rejectWithValue("Failed");
      }
    }
  }
);

export const loginAction = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await userApi.login(data);
      const { token, user } = response;

      await SecureStore.setItemAsync("token", token);

      return user;
    } catch (error) {
      console.log(error.message);
      const { status } = error.response;
      if (status === 400) {
        return rejectWithValue("Wrong username or password");
      } else {
        return rejectWithValue("Failed");
      }
    }
  }
);

export const getUserbyIdAction = createAsyncThunk(
  "userById",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const user = await userApi.getUserbyId(id);
      return user;
    } catch (error) {
      console.log(error.message);
      const { status } = error.response;
      if (status === 400) {
        return rejectWithValue("Failed");
      } else {
        return rejectWithValue("Server error");
      }
    }
  }
);
