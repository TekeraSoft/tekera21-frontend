"use server"

import axiosInstance from "@/request/axiosServer";
import { IPage } from "@/types/Collection";
import { IOrderData } from "@/types/OrderTypes";
import { IPaymentReport } from "@/types/PaymentReport";
import { IResponse } from "@/types/ResponseType";
import { INewSellerRegisterData, ISellerInfo, TVerification } from "@/types/SellerTypes/SellerInfo";
import { ISellerDashboardData } from "@/types/SellerTypes/SellerReportTypes";
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
        console.log("error", error)
        return { success: false, message: error.message || "Failed to get seller information", data: undefined };
    }
}

export async function getSellerOrders(): Promise<IResponse<IOrderData>> {

    try {
        const { data } = await axiosInstance.get(
            `/seller/getSellerOrders`
        );

        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get seller orders", data: undefined };
    }
}

export async function getSellerReport(): Promise<IResponse<ISellerDashboardData>> {
    try {
        const { data } = await axiosInstance.get(
            `/seller/getSellerReport`
        );
        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get seller report", data: undefined };
    }
}

export async function getSellerInterruptions(): Promise<IResponse<IPaymentReport[]>> {

    try {
        const { data } = await axiosInstance.get(
            `/seller/getSellerInterruptions`
        );
        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get seller Interruptions", data: undefined };
    }
}

export async function getNewSellers(page: string = "0", size: string = "20") {

    try {
        const { data } = await axiosInstance.get(
            `/seller-support/getNewSellerPageable?${page}&size=${size}`
        );

        return { success: true, message: data.message, data: data as { content: INewSellerRegisterData[], page: IPage } };
    } catch (error: any) {
        console.log("error oluştu", error)
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

        return { success: true, message: data.message, data: data.data };
    } catch (error: any) {

        return { success: false, message: typeof error.message === "string" ? error.message : "Failed to update seller" };
    }
}

export async function changeSellerStatus(sellerId: string, sellerDocumentName: string, status: TVerification) {
    console.log("changeSellerStatus")
    try {
        const { data } = await axiosInstance.put(
            `/seller-support/changeStatusFaultyDocument?sellerId=${sellerId}&sellerDocumentTypeName=${sellerDocumentName}&status=${status}`,
        );

        revalidatePath("/");
        return { success: true, message: data.message, data: data.data };
    } catch (error: any) {

        return { success: false, message: typeof error.message === "string" ? error.message : "Failed to changeSellerStatus" };
    }
}
export async function activateSeller(sellerId: string) {
    console.log("activateSeller")
    try {
        const { data } = await axiosInstance.put(
            `/seller-support/sellerActivation?sellerId=${sellerId}`,
        );

        revalidatePath("/");
        return { success: true, message: data.message, data: data.data };
    } catch (error: any) {

        return { success: false, message: error.message };
    }
}

export async function getAllCampaignsForSeller() {
    try {
        const { data } = await axiosInstance.get(
            `/seller/getAllCampaign`,
        );
        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get all campaigns" };
    }
}
export async function addProductsToCampaign(campaignId: string, productIds: string[]) {
    try {
        const { data } = await axiosInstance.put(
            `/seller/addProductToCampaign`,
            { campaignId, productIds }
        );
        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get all campaigns" };
    }
}
export async function removeProductsFromCampaign(campaignId: string, productIds: string[]) {
    try {
        const { data } = await axiosInstance.put(
            `/seller/takeOutProductInCampaign`,
            { campaignId, productIds }
        );
        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get all campaigns" };
    }
}