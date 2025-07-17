"use client";
import { useEffect, useState } from "react";
import { getSessionToken, logOut } from "../app/actions";
import axios from "axios";
import { api_base_url } from "@/constants/apiUrls";
import { useRouter } from "@/i18n/navigation";

const axiosClient = axios.create({
  baseURL: api_base_url,
  timeout: 50000,
  withCredentials: true,
  xsrfCookieName: "session-token",
  xsrfHeaderName: "session-token",
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const [isSet, setIsSet] = useState(false);

  const router = useRouter()

  useEffect(() => {
    // Response interceptor

    const responseInterceptor = axiosClient.interceptors.response.use(
      async (response) => {


        return response
      }, // Başarılı cevapları direkt döndür
      async (error) => {
        if (error.response) {
          // 401 Unauthorized durumunda logout yap

          if (error.response.status === 401) {
            await logOut();
            router.replace("/login")
          }

          return Promise.reject(error.response.data);
        }

        return Promise.reject(error);
      }
    );

    // Request interceptor
    const requestInterceptor = axiosClient.interceptors.request.use(
      async (config) => {
        const sessionToken = await getSessionToken();
        console.log("session tojen", sessionToken)
        if (sessionToken) {
          config.headers['Authorization'] = `Bearer ${sessionToken}`;
        }
        if (config.data instanceof FormData) {
          config.headers["Content-Type"] = "multipart/form-data";
        }

        return config;
      }
    );

    setIsSet(true);

    return () => {
      axiosClient.interceptors.response.eject(responseInterceptor);
      axiosClient.interceptors.request.eject(requestInterceptor);
    };
  }, [logOut]); // handleLogout bağımlılığa eklendi

  return isSet ? children : null;
};

export default axiosClient;
export { AxiosInterceptor };
