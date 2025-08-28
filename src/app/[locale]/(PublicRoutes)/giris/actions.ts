"use server"

import { managerRoles, sellerRoles } from "@/constants/roles";
import { redirect } from "@/i18n/navigation";
import axiosInstance from "@/request/axiosServer";
import { ILogin, ISignUpForm, IUserPayload } from "@/types/AuthTypes";
import jwt from "jsonwebtoken";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { z } from "zod"

export type ActionStateType = {
  error: any;
  message?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    gsmNumber?: string[];
    password?: string[];
    gender?: string[];
    birthDate?: string[];
  };
};

// Validation schema
const signUpSchema = z.object({
  firstName: z.string().min(2, "Adınız en az 2 karakter olmalı"),
  lastName: z.string().min(2, "Soyadınız en az 2 karakter olmalı"),
  email: z.string().email("Geçersiz e-posta adresi"),
  gsmNumber: z.string().min(10, "Telefon numarası en az 10 haneli olmalıdır"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  gender: z.enum(["MALE", "FEMALE"]),
  birthDate: z.string().min(1, "Doğum tarihi gereklidir"),
})




export async function registerUser(prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
  const locale = await getLocale()
  console.log("prevstate", prevState)
  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    gsmNumber: formData.get("gsmNumber") as string,
    password: formData.get("password") as string,
    gender: formData.get("gender") as "MALE" | "FEMALE",
    birthDate: formData.get("birthDate") as string,
  }

  // Validate the data
  const validatedFields = signUpSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      error: null,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const signUpData: ISignUpForm = validatedFields.data

  try {

    const { data } = await axiosInstance.post("/auth/register", signUpData);


    return redirect({ href: "/giris", locale: locale })

  } catch (error: any) {
    console.error("Registration error:", error)
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return {
      error: null,
      message: error.message || "Registration failed. Please try again.",
    }
  }
}

export async function loginUser(signInData: { email: string, password: string }): Promise<{ redirectUrl: string | null, message: string }> {

  try {

    const { data } = await axiosInstance.post("/auth/authenticate", signInData);

    const cookieStore = await cookies();
    cookieStore.set("token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 gün
    });

    const payload = jwt.decode(data.accessToken) as IUserPayload;

    if (sellerRoles.some(role => payload.roles.includes(role))) {
      return {
        redirectUrl: "/seller",
        message: "Login successful"
      }
    }
    if (managerRoles.some(role => payload.roles.includes(role))) {
      return {
        redirectUrl: "/manage/dashboard",
        message: "Login successful"
      }
    }
    return {
      redirectUrl: "/",
      message: "Login successful"
    }

  } catch (error: any) {
    console.error("login error:", error);
    if (error instanceof Error && error?.message === "NEXT_REDIRECT") {
      throw error;
    }
    throw error?.message || "Giriş başarısız. Lütfen tekrar deneyin.";
  }

}
