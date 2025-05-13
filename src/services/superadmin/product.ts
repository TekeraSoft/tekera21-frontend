import axiosClient from "@/request/axiosClient";

export const getAdminProducts = async () => {
  const response = await axiosClient.get("https://fakestoreapi.com/products", {
    withCredentials: false,
  });
  return response.data;
};

export const searchProducts = async (query: string) => {
  const response = await axiosClient.get(`/products?${query}`);
  return response.data;
};

export const filterProducts = async (
  query: string,
  category: string,
  status: string
) => {
  const response = await axiosClient.post(`/products?${query}`, {
    category: category,
    status: status,
  });
  return response.data;
};

export const addAttribute = async (
  categoryId: string,
  attributeId: string,
  values: string[]
) => {
  const response = await axiosClient.post(`/products/attribute`, {
    categoryId: categoryId,
    attributeId: attributeId,
    values: values,
  });
  return response.data;
};
