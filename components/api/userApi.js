import { getUserbyId } from "../../redux/actions/userActions";
import axiosClient from "./axiosClient";

const userApi = {
  register: (data) => {
    const url = "/auth/register";
    return axiosClient.post(url, data);
  },
  login: (data) => {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
  getUserbyId: (id) => {
    const url = `user/${id}`;
    return axiosClient.get(url);
  },

  updateProfile: (id, data) => {
    const url = `user/${id}`;
    return axiosClient.put(url, data);
  },
};
export default userApi;
