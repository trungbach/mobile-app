import axiosClient from "./axiosClient";

export const productApi = {
  getProductById : (id) => {
    const url = `products/${id}`;
    return axiosClient.get(url);
  }
}