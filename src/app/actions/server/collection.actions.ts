"use server"
import axiosInstance from "@/request/axiosServer";
import { IFashionCollection, IFashionCollectionData } from "@/types/Collection";
import { revalidatePath } from "next/cache";


export async function createCollection(formData: FormData) {
    const collectionName = formData.get("collectionName") as string;
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;
    const products = formData.get("products") as string;

    if (!collectionName || !image || !description || !products) {
        return { success: false, message: "Tüm alanlar zorunludur." }
    }
    try {
        const { data } = await axiosInstance.post(
            `/super-admin/createFashionCollection`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        revalidatePath("/");
        return { success: true, message: data.message, data: data };
    } catch (error: any) {

        return { success: false, message: error.message || "Failed to createFashionCollection" };
    }
}
export async function updateCollection(formData: FormData) {
    const collectionName = formData.get("collectionName") as string;
    const id = formData.get("id") as string;

    const description = formData.get("description") as string;
    const products = formData.getAll("products") as string[];



    if (!collectionName || !description || !products.length || !id) {
        return { success: false, message: "Tüm alanlar zorunludur." }
    }
    try {
        const { data } = await axiosInstance.put(
            `/super-admin/updateFashionCollection`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        revalidatePath("/");
        return { success: true, message: data.message, data: data };
    } catch (error: any) {

        return { success: false, message: error.message || "Failed to Update Collection" };
    }
}

export async function getAllCollection(page: string = "0", size: string = "8"): Promise<{
    success: true;
    message: null;
    data: IFashionCollectionData;
} | {
    success: false;
    message: any;
}> {
    try {
        const { data } = await axiosInstance.get(`/super-admin/getAllFashionCollection?page=${page}&size=${size}`)
        return { success: true, message: null, data: data as IFashionCollectionData };

    } catch (error: any) {
        return { success: false, message: error.message || "Failed to get all collection" };
    }
}
export async function getCollectionById(id: string): Promise<{
    success: true;
    message: null;
    data: IFashionCollection;
} | {
    success: false;
    message: any;
}> {
    try {

        const { data } = await axiosInstance.get(
            `/fashion-collection/getFashionCollection?id=${id}`
        );

        return { success: true, message: data.message, data: data };
    } catch (error: any) {

        return { success: false, message: error.message || "Failed to getFashoinCollection" };
    }
}

export async function deleteCollectionById(id: string) {
    try {

        const { data } = await axiosInstance.delete(
            `/super-admin/deleteFashionCollection?id=${id}`
        );
        revalidatePath("/");
        return { success: true, message: data.message, data: data };
    } catch (error: any) {

        return { success: false, message: error.message || "Failed to delete deleteFashionCollection" };
    }
}