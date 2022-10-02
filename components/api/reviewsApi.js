import axiosClient from "./axiosClient";

const reviewsApi = {
  postReview: (data) => {
    const url = `/comments`;
    return axiosClient.post(url, data);
  },
  getReview: (id, page) => {
    const url = `comments?product_id=${id}&page=${page}`;
    return axiosClient.get(url);
  },
  deleteReview: (id) => {
    const url = `comments/${id}`;
    return axiosClient.delete(url);
  },
  editReview: (id, data) => {
    const url = `comments/${id}`;
    return axiosClient.put(url, data);
  },
};

export default reviewsApi;
