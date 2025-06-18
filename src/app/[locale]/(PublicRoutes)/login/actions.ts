"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { userList } from "@/data/users";

export async function loginUser(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const locale = formData.get("locale") as string;
  const pass = "tekera21AdminPassword";

  if (password !== pass) {
    return { error: "Şifre yanlış" };
  }

  const res = userList;

  let role;

  const user = res.find((user) => {
    return user.name === username;
  });

  if (!user) {
    return { error: "Kullanıcı bulunamadı" };
  }
  if (user.role.includes("superadmin")) {
    role = "superadmin";
  } else if (user.role.includes("seller")) {
    role = "seller";
  } else {
    role = "register";
  }

  const cookieStore = await cookies();

  cookieStore.set("token", "accessTokenvaluserfdsfd", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  // Giriş başarılıysa yönlendir
  redirect(`/${locale}/${role}`);
}
