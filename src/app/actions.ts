"use server";

import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  try {
    const cookieAccessToken = cookieStore.get("token")?.value;
    if (!cookieAccessToken) {
      return null;
    }

    const res = await fetch("https://dummyjson.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookieAccessToken}`, // Pass JWT via Authorization header
      },
      credentials: "include", // Include cookies (e.g., accessToken) in the request
    });

    if (!res.ok) {
      return null;
    }
    const data = await res.json();

    const { accessToken, refreshToken, ...user } = data;
    return user;
  } catch (error) {
    console.error("getUser fetch error:", error);
    return null;
  }
}
