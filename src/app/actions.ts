"use server";

import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  try {
    const user = cookieStore.get("user")?.value;
    if (!user) {
      console.log("user yok");
      return null;
    }
    const parsedUser = JSON.parse(user);
    if (!parsedUser) {
      console.log("user yok");
      return null;
    }
    return parsedUser;
  } catch (error) {
    console.error("getUser fetch error:", error);
    return null;
  }
}
