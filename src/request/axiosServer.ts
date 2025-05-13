import { api_base_url } from "@/constants/apiUrls";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: api_base_url,
  timeout: 5000,
  withCredentials: true,
  xsrfCookieName: "token",
  xsrfHeaderName: "token",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((request) => {
  console.log("axiosserver request");
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("axiosserver response");
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
