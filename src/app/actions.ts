"use server";

import axiosInstance from "@/request/axiosInstance";
import { cookies } from "next/headers";

export async function getUser(layout: string) {
  console.log("get user", layout);
  const cookieStore = await cookies();
  try {
    // const userFromApi = await axiosInstance.post("")
    
    
    // await fetch("https://dummyjson.com/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     username: "emilys",
    //     password: "emilyspass",
    //     expiresInMins: 30, // optional, defaults to 60
    //   }),
    //   credentials: "include", // Include cookies (e.g., accessToken) in the request
    // })
    //   .then((res) => res.json())
    //   .then(console.log);
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
