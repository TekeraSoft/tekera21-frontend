import React from "react";
import BuyerNavbar from "./navbars/buyer/BuyerNavbar";

interface BuyerLayoutProps {
  children: React.ReactNode;
}

export default function BuyerLayout({ children }: BuyerLayoutProps) {
  return (
    <div>
      <BuyerNavbar />

      {children}
    </div>
  );
}
