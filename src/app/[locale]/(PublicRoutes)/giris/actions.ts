"use server"

import { sellerRoles } from "@/constants/roles";
import { redirect } from "@/i18n/navigation";
import axiosInstance from "@/request/axiosServer";
import { ILogin, ISignUpForm, IUserPayload } from "@/types/AuthTypes";
import jwt from "jsonwebtoken";
import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { z } from "zod"

export type ActionStateType = {
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
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  gsmNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  gender: z.enum(["MALE", "FEMALE"]),
  birthDate: z.string().min(1, "Birth date is required"),
})
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),

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
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const signUpData: ISignUpForm = validatedFields.data

  try {
    console.log("form", signUpData)
    const { data } = await axiosInstance.post("/auth/register", signUpData);

    console.log("User registration return:", data)

    return redirect({ href: "/giris", locale: locale })

  } catch (error: any) {
    console.error("Registration error:", error)
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return {
      message: error.message || "Registration failed. Please try again.",
    }
  }
}

export async function loginUser(prevState: ActionStateType, formData: FormData): Promise<ActionStateType> {
  const locale = await getLocale()
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const validatedFields = signInSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const signInData: ILogin = validatedFields.data

  try {

    const { data } = await axiosInstance.post("/auth/authenticate", signInData);

    const cookieStore = await cookies();
    cookieStore.set("session-token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 gün
    });

    const payload = jwt.decode(data.accessToken) as IUserPayload;
    console.log("jwt", payload)
    if (sellerRoles.some(role => payload.roles.includes(role))) {
      return redirect({ href: "/seller", locale: locale })
    }
    if (payload.roles.includes("SUPER_ADMIN")) {
      return redirect({ href: "/superadmin", locale: locale })
    }
    return redirect({ href: "/", locale: locale })

  } catch (error: any) {
    console.error("login error:", error)
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    return {
      message: error.message || "login failed. Please try again.",
    }
  }

}
