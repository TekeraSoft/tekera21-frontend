import { api_base_url } from "@/constants/apiUrls";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: api_base_url,
  timeout: 50000000,
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
      console.log("axios error", error);
      console.log("error in axios response interceptor", error?.response?.data);
      const errorData = error?.response?.data as any;

      let errorMessage = "An error occurred while processing your request.";

      if (errorData) {
        if (typeof errorData === "string") {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      }

      throw new Error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
