"use server";
import axiosInstance from "@/request/axiosServer";
import { ICategoryResponse } from "@/types/SellerTypes/CategoryTypes";
import { revalidatePath } from "next/cache";

export async function createSubcategory(formData: FormData) {
    try {
        const categoryId = formData.get("categoryId") as string;
        const name = formData.get("name") as string;
        const image = formData.get("image") as File;


        if (!categoryId || !name || name.trim() === "" || !image) {
            return {
                success: false,
                error: "Category ID and subcategory name are required",
            };
        }

        const { data } = await axiosInstance.post(
            `/super-admin/createSubCategory`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        revalidatePath("/");
        return { success: true, message: data.message, category: data };
    } catch (error: any) {

        return { success: false, message: error.message || "Failed to create subcategory" };
    }
}


export async function createCategory(formData: FormData) {
    try {
        const { data } = await axiosInstance.post(
            `/super-admin/createCategory`,
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

        return { success: false, message: error.message || "Failed to create category" };
    }
}

export async function getCategories() {
    try {
        const { data } = await axiosInstance.get(`/super-admin/getAllCategory`);

        return { success: true, message: data.message, data: data };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get categories" };
    }
}

export async function getCategoriesForSeller(page: string = "0", size: string = "20") {
    try {
        const { data } = await axiosInstance.get(
            `/category/get-all-category?page=${page}&size=${size}`
        );

        return { success: true, message: data.message, data: data as ICategoryResponse };
    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get categories" };
    }

}
