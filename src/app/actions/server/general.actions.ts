"use server";

import axiosInstance from "@/request/axiosServer";
import { IPage } from "@/types/Collection";
import { revalidatePath } from "next/cache";
import { ISellerUser } from "@/types/SellerTypes/SellerInfo";
import { IShippingCompany, IShippingCompanyCreate } from "@/types/SellerTypes/ShippingCompanies";
import { getUser } from "./auth.actions";


export async function getAllCompany(page: string = "0", size: string = "20") {

  try {
    const { data } = await axiosInstance.get(
      `/super-admin/getAllCompany?page=${page}&size=${size}`
    );

    return { success: true, message: data.message, data: data as { content: ISellerUser[], page: IPage } };
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
    return { success: false, message: error.message || "Failed to get getAllShippingCompany", data: undefined };
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

export async function getAllMediaBySellerId(page: number = 0, size: number = 50) {
  const user = await getUser();
  try {
    const { data } = await axiosInstance.get(
      `/seller/sellerGallery?companyId=${user?.sellerId}&page=${page}&size=${size}`,
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