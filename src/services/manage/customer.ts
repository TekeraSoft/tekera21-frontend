import axiosClient from "@/request/axiosClient";

export const editCustomer = async (customerId: string, values: string[]) => {
  const response = await axiosClient.patch(`/customer/${customerId}`, {
    values: values,
  });
  return response.data;
};
