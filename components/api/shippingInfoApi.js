import axiosClient from "./../api/axiosClient";

export const shippingInfoApi = {
  getListShippingInfoByUserid: (id) => {
    const url = `/shipping-infomation?user_id=${id}`;
    return axiosClient.get(url);
  },
  deleteShippingInfo: (id) => {
    const url = `/shipping-infomation/${id}`;
    return axiosClient.delete(url);
  },
  updateShippingInfo: (id, data) => {
    const url = `/shipping-infomation/${id}`;
    return axiosClient.put(url, data);
  },
  addShippingInfo : (data) => {
    const url = `/shipping-infomation`;
    return axiosClient.post(url,data);
  }
};
