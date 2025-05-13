"use client";
import { useEffect, useState } from "react";
import { logOut } from "../app/actions";
import axiosInstance from "./axiosInstance";

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    // Response interceptor

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response, // Başarılı cevapları direkt döndür
      async (error) => {
        if (error.response) {
          // 401 Unauthorized durumunda logout yap

          if (error.response.status === 401) {
            await logOut();
          }

          return Promise.reject(error.response.data);
        }

        return Promise.reject(error);
      }
    );

    // Request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        if (config.data instanceof FormData) {
          config.headers["Content-Type"] = "multipart/form-data";
        }
        return config;
      }
    );

    setIsSet(true);

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, []); // handleLogout bağımlılığa eklendi

  return isSet ? children : null;
};

export default axiosInstance;
export { AxiosInterceptor };
