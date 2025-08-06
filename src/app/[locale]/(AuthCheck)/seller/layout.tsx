import React from "react";
import { SidebarProvider } from "@/context/SideBarContext";
import { SellerSidebar } from "@/components/seller/SellerSidebar";

import { redirect } from "next/navigation";
import { TVerification } from "@/types/SellerTypes/SellerInfo";
import { getSellerByUserId } from "@/app/actions/server/seller.actions";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { success: successSellerInfo, data: sellerInfo } =
    await getSellerByUserId();

  const dissAllowedStatusses: TVerification[] = [
    "REJECTED",
    "CANCELLED",
    "PENDING",
  ];
  if (
    !successSellerInfo ||
    !sellerInfo?.status ||
    dissAllowedStatusses.includes(sellerInfo?.status)
  ) {
    return redirect("/register");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex">
        <SidebarProvider>
          <SellerSidebar />
          <main className="w-full">{children}</main>
        </SidebarProvider>
      </div>
    </div>
  );
}
