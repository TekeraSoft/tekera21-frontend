"use server";

import { cookies } from "next/headers";

export async function getUser(layout: string) {
  console.log("get user", layout);
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