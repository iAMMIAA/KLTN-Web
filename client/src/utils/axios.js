import axios from 'axios';

// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

// const axiosInstance = axios.create({ baseURL: HOST_API });
// Tạo một instance mới của axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // URL cơ bản của API
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('idUser'); // Lấy token từ local storage
    if (token) {
      // config.headers['Authorization'] = `Bearer ${token}`; // Thêm token vào header
      config.headers['authorization'] = `${token}`; // Thêm token vào header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------
export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  exchange: {
    list: `${HOST_API}exchanges`,
    new: `${HOST_API}exchanges`,
    comment: (id) => `${HOST_API}exchanges/${id}/comments`,
    like: (id) => `${HOST_API}exchanges/${id}/like`,
  },
  comment: {
    count: `${HOST_API}comments/count`,
  }
};
