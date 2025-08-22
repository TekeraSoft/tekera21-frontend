"use server"

import axiosInstance from "@/request/axiosServer";
import { IOrderData } from "@/types/OrderTypes";
import { IResponse } from "@/types/ResponseType";

export async function getOrdersByUserId(page: string = "0", size: string = "20"): Promise<IResponse<IOrderData>> {

    try {
        const { data } = await axiosInstance.get(
            `/user/getOrdersByUserId?page=${page}&size=${size}`
        );
        return { success: true, message: data.message, data: data as IOrderData };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get orders", data: undefined };
    }
}

export async function getAllOrders(page: string = "0", size: string = "20"): Promise<IResponse<IOrderData>> {

    try {
        const { data } = await axiosInstance.get(
            `/super-admin/getAllOrder?page=${page}&size=${size}`
        );
        return { success: true, message: data.message, data: data as IOrderData };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get products", data: undefined };
    }
}