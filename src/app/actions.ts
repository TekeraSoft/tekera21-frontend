"use server";

import axiosInstance from "@/request/axiosServer";
import { IFashionCollection, IFashionCollectionData } from "@/types/Collection";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { IUserPayload } from "@/types/AuthTypes";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { ICategoryResponse } from "@/types/SellerTypes/CategoryTypes";
import { ISellerInfo } from "@/types/SellerTypes/SellerInfo";
import { IShippingCompany, IShippingCompanyCreate } from "@/types/SellerTypes/ShippingCompanies";

export async function getSessionToken() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('token');
  return sessionToken?.value || null;
}

export async function getSingleProductById(id: string) {

  try {
    const { data } = await axiosInstance.get(
      `/super-admin/getCustomerProduct?id=${id}`
    );

    return { success: true, message: data.message, data: data };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to getsingleProductById" };
  }
}

export async function getUser(): Promise<IUserPayload | null> {
  const cookieStore = await cookies();
  try {
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }
    const parsedUser = jwt.decode(token) as IUserPayload;

    if (!parsedUser) {
      return null;
    }
    return parsedUser;
  } catch (error: any) {

    return null;
  }
}

export async function logOut() {
  const cookieStore = await cookies();
  try {
    const locale = await getLocale()
    cookieStore.delete("token");
    return redirect({ href: "/giris", locale: locale })
  } catch (error: any) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("logOut error:", error);
  }
}
export async function getCategories() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
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
export async function getSellerByUserId() {

  try {
    const { data } = await axiosInstance.get(
      `/seller/getSellerByUserId`
    );
    console.log("data from getSellerIdAction", data)
    return { success: true, message: data.message, data: data as ISellerInfo };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to get products" };
  }
}
export async function getShippingCompanies() {

  try {
    const { data } = await axiosInstance.get(
      `/account/getAllShippingCompany`
    );
    console.log("data from getAllShippingCompany", data)
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

    return { success: false, message: typeof error.message === "string" ? error.message : "Failed to create category" };
  }
}

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