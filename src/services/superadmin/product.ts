import axiosClient from "@/request/axiosClient";

export const getAdminProducts = async (
  limit: number,
  skip: number,
  sortBy: string = ""
) => {
  const response = await axiosClient.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
    {
      withCredentials: false,
    }
  );
  return response.data;
};
export const getAdminProductCategories = async (
  limit: number = 10,
  skip: number = 10,
  sortBy: string = ""
) => {
  const response = await axiosClient.get(
    `https://dummyjson.com/products/categories`,
    {
      withCredentials: false,
    }
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
// export const getAdminProducts = async () => {
//   const response = await axiosClient.get(
//     "https://dummyjson.com/http/404/Products Could Not Be Received",
//     {
//       withCredentials: false,
//     }
//   );
//   return response.data;
// };

// export const searchProducts = async (query: string) => {
//   const response = await axiosClient.get(`/products?${query}`);
//   return response.data;
// };

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
