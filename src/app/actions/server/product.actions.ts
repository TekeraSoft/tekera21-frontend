"use server";
import axiosInstance from "@/request/axiosServer";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";


export async function getSingleProductById(id: string) {

    try {
        const { data } = await axiosInstance.get(
            `/super-admin/getSellerProducts?id=${id}`
        );

        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to getsingleProductById" };
    }
}

export async function getProducts(page: string = "0", size: string = "20") {

    try {
        const { data } = await axiosInstance.get(
            `/product/getAllProduct?page=${page}&size=${size}`
        );

        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get products" };
    }
}

export async function createProduct(formData: FormData) {
    try {
        const dataform = formData.get("data");
        const images = formData.getAll("images");

        if (!dataform || !images) {
            return {
                success: false,
                message: "Data and images are required",
            };
        }
        const { data } = await axiosInstance.post(
            `/seller/createProduct`,
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

        return { success: false, message: typeof error.message === "string" ? error.message : "Failed to create Product" };
    }
}

export async function updateProduct(formData: FormData) {
    try {
        const { data } = await axiosInstance.put(
            `/seller/updateProduct`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        revalidatePath("/");


        return { success: true, message: data.message, data: data };
    } catch (error: any) {

        return { success: false, message: error.message || "Failed to update Product" };
    }
}

export async function deleteProductById(id: string) {
    try {

        const { data } = await axiosInstance.delete(
            `/super-admin/deleteProduct?productId=${id}`
        );
        revalidatePath("/");
        return { success: true, message: data.message, data: data };
    } catch (error: any) {

        return { success: false, message: error.message || "Failed to get deleteProduct" };
    }
}