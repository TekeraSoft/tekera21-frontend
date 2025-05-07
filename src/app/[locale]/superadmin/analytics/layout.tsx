import TopBar from "@/components/superadmin/TopBar";
import React from "react";

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      {children}
    </>
  );
}
