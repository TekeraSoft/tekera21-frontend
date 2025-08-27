"use server"
import axiosInstance from "@/request/axiosServer";
import { revalidatePath } from "next/cache";



export async function createCampaign(formData: FormData) {
    try {
        const { data } = await axiosInstance.post(
            `/super-admin/createCampaign`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return { success: true, message: data.message, data: data };
    } catch (error: any) {

        return { success: false, message: error.message || "Failed to create campaign" };
    }
}
export async function deleteCampaign(campaignId: string) {
    try {
        const { data } = await axiosInstance.delete(
            `/super-admin/deleteCampaign?id=${campaignId}`,
        );
        revalidatePath(`/manage/campaign`, "page");
        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to delete campaign" };
    }
}
export async function getAllCampaigns() {
    try {
        const { data } = await axiosInstance.get(
            `/super-admin/getAllCampaigns`,
        );
        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get all campaigns" };
    }
}

