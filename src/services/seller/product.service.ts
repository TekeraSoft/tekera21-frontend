
import axiosInstance from "@/request/axiosServer";

export const getSellerProducts = async (
    page: number,
    size: number,
    sortBy: string = ""
) => {
    const response = await axiosInstance.get(
        `/seller/getSellerProducts?page=${page}&size=${size}`
    );
    return response.data;
};

export async function getProductById(id: string) {

    try {
        const { data } = await axiosInstance.get(
            `/seller/getProductBySellerCheck?productId=${id}`
        );

        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to getsingleProductById" };
    }
}