import React from "react";
import { SidebarProvider } from "@/context/SideBarContext";
import { SellerSidebar } from "@/components/seller/SellerSidebar";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
