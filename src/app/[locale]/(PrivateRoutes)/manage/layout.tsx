import React from "react";
import { SideBarAdmin } from "@/components/manage/SidebarAdmin";
import { SidebarProvider } from "@/context/SideBarContext";
import AdminTopBar from "@/components/manage/AdminTopBar";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex">
        <SidebarProvider>
          <SideBarAdmin />
          <AdminTopBar />
          <main className="w-full">{children}</main>
        </SidebarProvider>
      </div>
    </div>
  );
}
