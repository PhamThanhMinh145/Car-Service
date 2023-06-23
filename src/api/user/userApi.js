import axiosClient from './axiosClient';

const userApi = {
  register(data) {
    const url = '';
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = '';
    return axiosClient.post(url, data);
  },
};
export default userApi;