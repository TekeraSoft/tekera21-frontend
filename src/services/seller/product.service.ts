
import axiosInstance from "@/request/axiosServer";
import { IPageableData } from "@/types/PageableData";
import { IProduct } from "@/types/product";

export const getSellerProducts = async (
    page: number = 0,
    size: number = 10,
    sortBy: string = ""
): Promise<IPageableData<IProduct>> => {
    const response = await axiosInstance.get(
        `/seller/getSellerProducts?page=${page}&size=${size}`
    );
    console.log("response", response.data)
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