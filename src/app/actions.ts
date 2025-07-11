"use server";

import axiosInstance from "@/request/axiosServer";
import { IFashionCollection, IFashionCollectionData } from "@/types/Collection";
import { revalidatePath } from "next/cache";

import { cookies } from "next/headers";



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

export async function getUser() {
  const cookieStore = await cookies();
  try {
    const user = cookieStore.get("user")?.value;
    if (!user) {
      return null;
    }
    const parsedUser = JSON.parse(user);
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
    cookieStore.delete("user");
    cookieStore.delete("token");
  } catch (error: any) {
    console.error("logOut error:", error);
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
export async function getSuperAdminProducts(
  page: string = "0",
  size: string = "20"
) {
  try {
    const { data } = await axiosInstance.get(
      `/super-admin/getAllAdminProduct?page=${page}&size=${size}`
    );

    return { success: true, message: data.message, data: data };
  } catch (error: any) {

    return { success: false, message: error.message || "Failed to get products" };
  }
}

export async function getFilteredProducts(
  page: string = "0",
  size: string = "20",
  color: string = "",
  clothSize: string = "",
  gender: string = ""
) {
  try {
    const { data } = await axiosInstance.get(
      `/product/filterProduct?page=${page}&size=${size}&color=${color}&clothSize=${clothSize}&gender=${gender}`
    );

    return { success: true, message: data.message, data: data };
  } catch (error: any) {

    return {
      success: false,
      message: error.message || "Failed to get filtered products",
    };
  }
}

export async function getCompanyProducts(
  companyId: string = "f8406fa3-d9d0-4644-b797-7d51cb926bfc"
) {
  try {
    const { data } = await axiosInstance.get(
      `/company/findCompanyReturnProducts/${companyId}`
    );

    return { success: true, message: data.message, data: data };
  } catch (error: any) {

    return { success: false, message: error.message || "Failed to get products" };
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
      `/company/createProduct`,
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
      `/company/updateProduct`,
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
      `/super-admin/getFashionCollection?id=${id}`
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