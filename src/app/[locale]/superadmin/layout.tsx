import { Sidebar } from "@/components/superadmin/sidebar";
import { users } from "@/data/users";
import React from "react";

export default function SuperAdminLayout ({ children }: { children: React.ReactNode }) {
  const user = users["John"]; // örnek kullanıcı, gerçek uygulamada bu bilgiyi auth'dan alırsınız
  const userRole = user.role;
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userRoles={userRole} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
