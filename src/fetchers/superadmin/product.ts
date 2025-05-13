import axiosClient from "@/request/axiosClient";

export const getAdminProducts = async () => {
  const response = await axiosClient.get("https://fakestoreapi.com/products", {
    withCredentials: false,
  });
  return response.data;
};
