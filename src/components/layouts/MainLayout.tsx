"use client";

import BuyerLayout from "./BuyerLayout";
import SellerLayout from "./SellerLayout";
import SuperAdminLayout from "./SuperAdminLayout";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface MainLayoutProps {
  children: ReactNode;
}

// Dil kodlarını tanımla
const locales = ["en", "tr", "de"]; // varsa diğer diller eklenebilir

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname(); // örn: /tr/seller/dashboard

  // pathname'den dil kodunu çıkar
  const pathWithoutLocale = (() => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    if (locales.includes(segments[1])) {
      return "/" + segments.slice(2).join("/"); // dil kodundan sonraki path
    }
    return pathname;
  })();

  if (pathWithoutLocale.startsWith("/seller")) {
    return <SellerLayout>{children}</SellerLayout>;
  }

  if (pathWithoutLocale.startsWith("/superadmin")) {
    return <SuperAdminLayout>{children}</SuperAdminLayout>;
  }

  return <BuyerLayout>{children}</BuyerLayout>; // default olarak buyer layout
}
