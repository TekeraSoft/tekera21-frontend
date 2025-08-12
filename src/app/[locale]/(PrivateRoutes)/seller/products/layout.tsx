import AdminInnerLayout from "@/components/manage/AdminInnerLayout";
import TopBar from "@/components/manage/TopBar";
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
