"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { IUserPayload } from "@/types/AuthTypes";


export async function getSessionToken() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('token');
    return sessionToken?.value || null;
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