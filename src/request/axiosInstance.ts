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

export default axiosInstance;
