import axiosClient from './axiosClient';

const productApi = {
  getAll(params){
    const url = '/products';
    return axiosClient.get(url, {params: params})
},
  get(id) {
    const url = `//${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    const url = '//';
    return axiosClient.post(url, data);
  },
  update(data) {
    const url = `//${data.id}`;
    return axiosClient.patch(url, data);
  },
  remove(id) {
    const url = `//${id}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
