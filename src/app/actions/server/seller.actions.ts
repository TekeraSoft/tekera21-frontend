"use server"

import axiosInstance from "@/request/axiosServer";
import { IPage } from "@/types/Collection";
import { ISellerContent, ISellerInfo } from "@/types/SellerTypes/SellerInfo";
import { revalidatePath } from "next/cache";

export async function sellerRegister(formData: FormData) {
    try {
        const dataform = formData.get("data");
        const files = formData.getAll("files");
        const logo = formData.get("logo");

        if (!dataform || !files || !logo) {
            return {
                success: false,
                message: "Data,logo and legal documents are required",
            };
        }
        const { data } = await axiosInstance.post(
            `/account/createSeller`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        revalidatePath("/");

        return { success: true, message: data.message, product: data.data };
    } catch (error: any) {

        return { success: false, message: typeof error.message === "string" ? error.message : "Failed to create category" };
    }
}

export async function getSellerByUserId() {

    try {
        const { data } = await axiosInstance.get(
            `/user/getSellerInformation`
        );

        return { success: true, message: data.message, data: data as ISellerInfo };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get products" };
    }
}

export async function getNewSellers(page: string = "0", size: string = "20") {

    try {
        const { data } = await axiosInstance.get(
            `/seller-support/getNewSellerPageable?${page}&size=${size}`
        );

        return { success: true, message: data.message, data: data as { content: ISellerContent[], page: IPage } };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get getNewSellers", data: undefined };
    }
}
export async function updateSeller(formData: FormData) {
    console.log("updateseller")
    try {
        const dataform = formData.get("data");
        const files = formData.getAll("files");
        const logo = formData.get("logo");

        if (!dataform || !files || !logo) {
            return {
                success: false,
                message: "Data,logo and legal documents are required",
            };
        }
        const { data } = await axiosInstance.put(
            `/verification/updateSeller`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        revalidatePath("/");

        return { success: true, message: data.message, product: data.data };
    } catch (error: any) {

        return { success: false, message: typeof error.message === "string" ? error.message : "Failed to update category" };
    }
}
