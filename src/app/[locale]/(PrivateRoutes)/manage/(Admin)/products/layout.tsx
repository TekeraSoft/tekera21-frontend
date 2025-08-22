import AdminInnerLayout from "@/components/manage/AdminInnerLayout";

import React from "react";

export default function AdminProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      
      <AdminInnerLayout>{children}</AdminInnerLayout>
    </>
  );
}
