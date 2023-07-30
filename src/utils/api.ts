import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL, // Replace with your API base URL
});

export const setAuthToken = (token: string | null | undefined) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
