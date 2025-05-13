import axiosInstance from "./axiosInstance";

axiosInstance.interceptors.request.use((request) => {
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error) {
      throw new Error(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
