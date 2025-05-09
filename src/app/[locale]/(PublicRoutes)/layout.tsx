import { getUser } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function PublicRouteProtection({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (!user) return children;

  const role = user?.role?.includes("superadmin")
    ? "superadmin"
    : user.role.includes("seller")
    ? "seller"
    : null;

  if (role) redirect(`/${role}`);

  return children;
}
