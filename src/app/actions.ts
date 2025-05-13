"use server";

// import axiosInstance from "@/request/axiosServer";
import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = await cookies();
  try {
    // console.log("userFromApi", userFromApi.data);

    // const userFromApi = await axiosInstance.post(
    //   "https://dummyjson.com/auth/login",
    //   {
    //     username: "emilys",
    //     password: "emilyspass",
    //     expiresInMins: 30, // optional, defaults to 60
    //   }
    // );

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
