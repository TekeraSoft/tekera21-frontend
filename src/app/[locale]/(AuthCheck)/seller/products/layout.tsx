import AdminInnerLayout from "@/components/superadmin/AdminInnerLayout";
import TopBar from "@/components/superadmin/TopBar";
import React from "react";

export default function AdminProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <AdminInnerLayout>{children}</AdminInnerLayout>
    </>
  );
}
