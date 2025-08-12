import React from "react";
import { SideBar } from "@/components/manage/sidebar";
import { SidebarProvider } from "@/context/SideBarContext";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex">
        <SidebarProvider>
          <SideBar />
          <main className="w-full">{children}</main>
        </SidebarProvider>
      </div>
    </div>
  );
}
