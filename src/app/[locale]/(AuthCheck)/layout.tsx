import { getUser } from "@/app/actions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthCheckLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const headersList = await headers();

  const pathname = headersList.get("x-pathname") || "";

  const user = await getUser();
  if (!user && !pathname.includes("/login")) {
    return redirect("/login");
  }

  return children;
}
