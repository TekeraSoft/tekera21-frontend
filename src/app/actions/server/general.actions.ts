"use server";

import axiosInstance from "@/request/axiosServer";
import { IPage } from "@/types/Collection";
import { revalidatePath } from "next/cache";
import { ICompany, ISellerInfo } from "@/types/SellerTypes/SellerInfo";
import { IShippingCompany, IShippingCompanyCreate } from "@/types/SellerTypes/ShippingCompanies";



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
export async function getAllCompany(page: string = "0", size: string = "20") {

  try {
    const { data } = await axiosInstance.get(
      `/super-admin/getAllCompany?page=${page}&size=${size}`
    );
    console.log("data from getAllCompany", data)
    return { success: true, message: data.message, data: data as { content: ICompany[], page: IPage } };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to get products", data: undefined };
  }
}


export async function getShippingCompanies() {

  try {
    const { data } = await axiosInstance.get(
      `/account/getAllShippingCompany`
    );

    return { success: true, message: data.message, data: data as IShippingCompany[] };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to get products", data: undefined };
  }
}
export async function createShippingCompany(shippingCompany: IShippingCompanyCreate) {
  console.log("createShippingCompany", shippingCompany)
  try {
    const { data } = await axiosInstance.post(
      `/super-admin/createShippingCompany`,
      shippingCompany,

    );
    revalidatePath("/");
    return { success: true, message: data.message, data: data.data };
  } catch (error: any) {

    return { success: false, message: error.message || "Failed to createShippingCompany" };
  }
}

export async function registerAsSeller(formData: FormData) {
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

export async function getAllTheme() {
  try {
    const { data } = await axiosInstance.get(
      `/theme/getAllTheme`
    );
    return { success: true, message: null, data: data };
  } catch (error: any) {
    return { success: false, message: error.message || "Temalar getirilemedi." };
  }
}

export async function createNewTheme(formData: FormData) {
  try {
    const { data } = await axiosInstance.post(
      `/super-admin/createTheme`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    );
    revalidatePath("/");
    return { success: true, message: null, data: data };
  } catch (error: any) {
    return { success: false, message: error.message || "Tema eklenemedi." };
  }
}

export async function getAllMediaBySellerId(sellerId: string, page: number = 0, size: number = 50) {
  console.log("sellerId", sellerId)
  try {
    const { data } = await axiosInstance.get(
      `/seller/sellerGallery?companyId=${sellerId}&page=${page}&size=${size}`,
    );

    return { success: true, message: null, data: data };
  } catch (error: any) {
    return { success: false, message: error.message || "Medya dosyaları getirilemedi." };
  }
}
export async function deleteFileByUrl(url: string) {
  console.log("url", url)
  try {
    const { data } = await axiosInstance.delete(
      `/seller/deleteImageFromVariation?path=/${url}`,
    );
    return { success: true, message: null, data: data };
  } catch (error: any) {
    return { success: false, message: error.message || "Medya dosyaları getirilemedi." };
  }
}