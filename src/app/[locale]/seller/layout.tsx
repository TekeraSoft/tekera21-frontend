"use client";

import SellerHeader from "@/components/seller-components/layout/Header/SellerHeader";
import type React from "react";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <main className="min-h-screen flex flex-col">
        <SellerHeader />

        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}
