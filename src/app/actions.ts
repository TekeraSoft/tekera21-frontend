"use server";

import axiosInstance from "@/request/axiosServer";
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";

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
  } catch (error) {
    console.error("getUser fetch error:", error);
    return null;
  }
}

export async function logOut() {
  const cookieStore = await cookies();
  try {
    cookieStore.delete("user");
    cookieStore.delete("token");
  } catch (error) {
    console.error("logOut error:", error);
  }
}
export async function getCategories() {
  try {
    const data = await axiosInstance.get(`/super-admin/getAllCategory`);

    if (!data) {
      return [];
    }
    return data.data;
  } catch (error) {
    console.log("getCategoriesError:", error);
  }
}
export async function getProducts(page: number = 0, size: number = 20) {
  try {
    const { data } = await axiosInstance.get(
      `/product/get-all-product?page=${page}&size=${size}`
    );
    return { success: true, message: data.message, category: data.data };
  } catch (error) {
    console.error("getProducts error:", error);
    return { success: false, message: error || "Failed to get category" };
  }
}

export async function createCategory(formData: FormData) {
  try {
    const { data } = await axiosInstance.post(
      `/super-admin/create-category`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    revalidatePath("/");
    return { success: true, message: data.message, category: data.data };
  } catch (error) {
    console.log("getproducts:", error);
    return { success: false, message: error || "Failed to create category" };
  }
}
export async function createProduct(formData: FormData) {
  try {
    const dataform = formData.get("data");
    const images = formData.getAll("images");

    console.log("datafırnorm:", dataform);
    console.log("images:", images);
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
  } catch (error) {
    console.log("create Product error:", error);
    return { success: false, message: error || "Failed to create category" };
  }
}

export async function createSubcategory(formData: FormData) {
  try {
    const categoryId = formData.get("categoryId") as string;
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;

    console.log("categoryId:", categoryId);
    console.log("name:", name);
    console.log("image:", image);

    if (!categoryId || !name || name.trim() === "" || !image) {
      return {
        success: false,
        error: "Category ID and subcategory name are required",
      };
    }

    const { data } = await axiosInstance.post(
      `/super-admin/create-sub-category`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    revalidatePath("/");
    return { success: true, message: data.message, category: data };
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return { success: false, message: error || "Failed to create subcategory" };
  }
}

export async function createTargetPicture(formData: FormData) {
  try {
    const targetPicture = formData.get("image");
    const video = formData.getAll("defaultContent");
    const productId = formData.getAll("productId");

    if (!targetPicture || !video || !productId) {
      return {
        success: false,
        message: "Data and images are required",
      };
    }
    const { data } = await axiosInstance.post(
      `/digital-fashion-admin/create-target-pic`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    revalidatePath("/");

    return { success: true, message: data.message, product: data.data };
  } catch (error) {
    console.log("create target picture error:", error);
    return { success: false, message: error || "Failed to create category" };
  }
}
