"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { userList } from "@/data/users";

export async function loginUser(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const locale = formData.get("locale") as string;
  console.log("username", username);
  const res = userList;
  let role;
  const user = res.find((user) => {
    role = username;
    return user.role.includes(username);
  });
  console.log("user", user);
  if (!user) {
    return { error: "Kullanıcı bulunamadı" };
  }
  console.log("role", role);
  const cookieStore = await cookies();
  cookieStore.set("token", "accessToken", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 30,
  });

  // Giriş başarılıysa yönlendir
  redirect(`/${locale}/${role}`);
}
