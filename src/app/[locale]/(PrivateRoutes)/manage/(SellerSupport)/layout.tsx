import { getUser } from "@/app/actions/server/auth.actions";
import { redirect } from "next/navigation";

export default async function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  const isHaveRights = user?.roles.some((role) =>
    ["SELLER_SUPPORT", "ADMIN", "SUPER_ADMIN"].includes(role)
  );

  if (!isHaveRights) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
