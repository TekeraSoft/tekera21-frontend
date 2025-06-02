"use server";

import axiosInstance from "@/request/axiosServer";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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
    const data = await axiosInstance.get(`/super-admin/get-all-category`);
    console.log("data", data.data);
    if (!data) {
      return [];
    }
    return data.data;
  } catch (error) {
    console.log("getCategoriesError:", error);
  }
}
export async function getProducts() {
  try {
    const data = await axiosInstance.get(`/products`);
  } catch (error) {
    console.error("getCategoriesError:", error);
  }
}
export async function createCategory(formData: FormData) {
  try {
    const data = await axiosInstance.post(
      `/super-admin/create-category`,
      formData
    );
    return { success: true, category: data.data };
  } catch (error) {
    console.error("getCategoriesError:", error);
    return { success: false, error: "Failed to create subcategory" };
  }
}
export async function createProduct(formData: FormData) {
  try {
    const data = await axiosInstance.post(`/product`, formData);
  } catch (error) {
    console.error("getCategoriesError:", error);
    return { success: false, error: "Failed to create subcategory" };
  }
}

export async function createSubcategory(formData: FormData) {
  try {
    const categoryId = formData.get("categoryId") as string;
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;

    if (!categoryId || !name || name.trim() === "") {
      return {
        success: false,
        error: "Category ID and subcategory name are required",
      };
    }

    let imageUrl = "/placeholder.svg?height=32&width=32";

    const newSubcategory = {
      id: `${categoryId}-${name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")}`,
      name: name.trim(),
      count: 0,
      image: imageUrl,
    };

    revalidatePath("/");
    return { success: true, subcategory: newSubcategory };
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return { success: false, error: "Failed to create subcategory" };
  }
}
