import axiosClient from "@/request/axiosClient";

export const getAdminProducts = async (
  page: number,
  size: number,
  sortBy: string = ""
) => {
  const response = await axiosClient.get(
    `/super-admin/getAllAdminProduct?page=${page}&size=${size}`
  );
  return response.data;
};

export const getSellerProducts = async (
  page: number,
  size: number,
  sortBy: string = ""
) => {
  const response = await axiosClient.get(
    `/seller/findSellerReturnProducts?page=${page}&size=${size}`
  );
  return response.data;
};

export const changeStatusAction = async (
  productId: string,
  status: boolean
) => {
  const response = await axiosClient.put(
    `/super-admin/changeProductActiveStatus?productId=${productId}&status=${status}`
  );
  return response.data;
};

export const getAdminProductCategories = async (
  page: number = 10,
  size: number = 10,
  sortBy: string = ""
) => {
  const response = await axiosClient.get(
    `/category/get-all-category?page=${page}&size=${size}`
  );
  return response.data;
};

export const getProductsByCategory = async (catSlug: string) => {
  const response = await axiosClient.get(
    `https://dummyjson.com/products/category/${catSlug}`,
    {
      withCredentials: false,
    }
  );
  return response.data;
};

export const searchProducts = async (query: string) => {
  const response = await axiosClient.get(
    `https://dummyjson.com/products/search?q=${query}`,
    {
      withCredentials: false,
    }
  );
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
