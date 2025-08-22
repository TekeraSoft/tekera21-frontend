import React from "react";
import { SidebarProvider } from "@/context/SideBarContext";
import { SellerSidebar } from "@/components/seller/SellerSidebar";

import { redirect } from "next/navigation";
import { TVerification } from "@/types/SellerTypes/SellerInfo";
import { getSellerByUserId } from "@/app/actions/server/seller.actions";
import NotificationProvider from "@/context/NotificationContext";
import SellerTopBar from "@/components/seller/SellerTopbar";

export default async function SellerLayout({
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
    !sellerInfo?.verificationStatus ||
    dissAllowedStatusses.includes(sellerInfo?.verificationStatus)
  ) {
    return redirect("/register");
  }

  return (
    <NotificationProvider>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex">
          <SidebarProvider>
            <SellerSidebar />

            <main className="w-full">
              <SellerTopBar />
              {children}
            </main>
          </SidebarProvider>
        </div>
      </div>
    </NotificationProvider>
  );
}
