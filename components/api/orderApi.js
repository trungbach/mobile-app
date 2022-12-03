import axiosClient from "./axiosClient";

const orderApi = {
  getOrderByUserId: (params) => {
    const url = "orders";
    return axiosClient.get(url, { params });
  },

  getOrderDetail: (params) => {
    const url = `orders/${params}`;
    return axiosClient.get(url);
  },
  addOrder: (data) => {
    const url = "/orders/create";
    return axiosClient.post(url, data);
  },

  checkOrderStatus: (data) => {
    const url = "/orders/check-order-status";
    return axiosClient.post(url, data);
  },
};

export default orderApi;
