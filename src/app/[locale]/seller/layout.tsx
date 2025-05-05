import SellerNavbar from "@/components/seller-components/layout/Navbar/SellerNavbar";
import React from "react";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col ">
      <SellerNavbar />
      {children}
    </div>
  );
}
