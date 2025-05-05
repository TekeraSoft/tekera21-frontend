import React from "react";
import SellerNavbar from "./navbars/seller/SellerNavbar";

interface BuyerLayoutProps {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: BuyerLayoutProps) {
  return (
    <div>
      <SellerNavbar />

      {children}
    </div>
  );
}
