import axiosInstance from "@/request/axiosServer";
import { IPageableData, IPageableResponse } from "@/types/PageableData";
import { IUser } from "@/types/UserTypes/user";

export async function getAllUsers(page: string = "0", size: string = "20"): Promise<IPageableResponse<IUser>> {

    try {
        const { data } = await axiosInstance.get(
            `/super-admin/getAllUser?page=${page}&size=${size}`
        );
        return { success: true, message: data.message, data: data as IPageableData<IUser> };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get users", data: undefined };
    }
}