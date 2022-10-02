import axios from "axios";
import queryString from "query-string";
import { Config } from "../../config/Config";
import * as SecureStore from "expo-secure-store";

const axiosClient = axios.create({
  baseURL: Config.BaseUrl,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
axiosClient.interceptors.request.use(async (config) => {
  const customHeaders = {};

  const token = await SecureStore.getItemAsync("token");
  



  if (token) {
    customHeaders.Authorization = token;
  }

  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});

export default axiosClient;
