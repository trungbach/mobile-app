import axiosClient from "./axiosClient";

export const cartApi = {
  fetchListCart: (userId) => {
    const url = `/cart?user_id=${userId}`;
    return axiosClient.get(url);
  },
  deleteCart: (id) => {
    const url = `/cart/${id}`;
    return axiosClient.delete(url);P
  },
  updateCart: (id, data) => {
    const url = `/cart/${id}`;
    return axiosClient.put(url, data);
  },
  addCart: (data) => {
    const url = "/cart";
    return axiosClient.post(url, data);
  },
};
