"use client";

import SellerFooter from "@/components/seller-components/layout/footer/SellerFooter";
import SellerHeader from "@/components/seller-components/layout/header/SellerHeader";
// import { AppDispatch } from "@/store/store";
// import { useDispatch } from "react-redux";

interface SellerLayoutProps {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  // const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col">
      <main className="min-h-screen flex flex-col">
        <SellerHeader />
        <div className="flex-1 px-8">{children}</div>
        <SellerFooter />
      </main>
    </div>
  );
}
