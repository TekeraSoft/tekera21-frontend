import { getUser } from "@/app/actions/server/auth.actions";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user?.roles.some((role) => ["ADMIN", "SUPER_ADMIN"].includes(role))) {
    return redirect("/unauthorized");
  }

  return <>{children}</>;
}
