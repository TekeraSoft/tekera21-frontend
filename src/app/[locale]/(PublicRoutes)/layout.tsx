"use client";
import { RootState } from "@/store/store";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

export default function PublicRouteProtection({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userInfo: user } = useSelector((state: RootState) => state.User);

  if (!user) return children;
  console.log("user public layout", user);

  const role = user?.role?.includes("superadmin")
    ? "superadmin"
    : user.role.includes("seller")
    ? "seller"
    : null;

  if (user && role) redirect(`/${role}`);

  return children;
}
