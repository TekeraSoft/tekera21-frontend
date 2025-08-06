"use server"

import axiosInstance from "@/request/axiosServer";
import { revalidatePath } from "next/cache";

export async function createTargetPicture(formData: FormData) {
    try {
        // const targetPicture = formData.get("image");
        const video = formData.getAll("defaultContent");
        const productId = formData.getAll("productId");

        if (!video || !productId) {
            return {
                success: false,
                message: "Data and images are required",
            };
        }
        const { data } = await axiosInstance.post(
            `/digital-fashion-admin/createTargetPic`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        revalidatePath("/");

        return {
            success: true,
            message: data?.message || "Success",
            data: data.data || "success",
        };
    } catch (error: any) {
        const errorMsg = error?.message || String(error);

        return {
            success: false,
            message: errorMsg || "Failed to create target picture",
        };
    }
}
export async function deleteTargetPicture(targetPictureId: string) {
    try {
        if (!targetPictureId) {
            return {
                success: false,
                message: "targetPictureId is required",
            };
        }
        const { data } = await axiosInstance.delete(
            `/digital-fashion-admin/deleteTargetPic?id=${targetPictureId}`
        );
        revalidatePath("/");

        return {
            success: true,
            message: data?.message || "Success",
            data: data.data || "success",
        };
    } catch (error: any) {
        const errorMsg = error?.message || String(error);

        return {
            success: false,
            message: errorMsg || "Failed to delete target picture",
        };
    }
}



export async function getTargetPictureByProductById(prodId: string) {
    try {
        const { data } = await axiosInstance.get(
            `/digital-fashion/getTargetImageByProductId?productId=${prodId}`
        );
        return { success: true, message: data.message, data: data };
    } catch (error: any) {

        return { success: false, message: error.message || "Failed to get target" };
    }
}