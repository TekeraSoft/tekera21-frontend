import { api_base_url } from "@/constants/apiUrls";
import axios from "axios";

const axiosServer = axios.create({
  baseURL: api_base_url,
  timeout: 5000,
  withCredentials: true,
  xsrfCookieName: "token",
  xsrfHeaderName: "token",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosServer.interceptors.request.use((request) => {
  return request;
});

axiosServer.interceptors.response.use(
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

export default axiosServer;
