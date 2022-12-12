import axiosClient from "./axiosClient";

const homeApi = {
  getProductsHome: (params) => {
    const url = "products/trending";
    return axiosClient.get(url, { params });
  },

  getCategoryId: (id) => {
    const url = `category/${id}`;
    return axiosClient.get(url);
  },

  searchProduct: (params) => {
    const url = "search";
    return axiosClient.get(url, { params });
  },
};

export default homeApi;
