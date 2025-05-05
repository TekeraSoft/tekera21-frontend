"use client";

import { ReactNode } from "react";
import { users } from "@/data/users";
import { Sidebar } from "../sidebar";

interface MainLayoutProps {
  children: ReactNode;
}


export default function MainLayout({ children }: MainLayoutProps) {

  const user = users["Jane"]; // örnek kullanıcı, gerçek uygulamada bu bilgiyi auth'dan alırsınız
  const userRole = user.role; // kullanıcının rolü, örneğin ["orders", "products", "users"]



  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRoles={userRole} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  ); // default olarak buyer layout
}
