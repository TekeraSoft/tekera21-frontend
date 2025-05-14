import { SellerReportsSalesAndOperationsNavTabs } from "@/components/seller-components/seller-reports/SellerReportsSalesAndOperationsNavTabs";
import React from "react";

interface SalesAndOperationsLayoutProps {
  children: React.ReactNode;
}

export default function SalesAndOperationsLayout({
  children,
}: SalesAndOperationsLayoutProps) {
  const tabs = [
    { label: "Satış", href: "/seller/reports/sales-and-operations/sales" },
    {
      label: "Operasyon",
      href: "/seller/reports/sales-and-operations/operations",
    },
    { label: "Mağaza", href: "/seller/reports/sales-and-operations/shop" },
  ];

  return (
    <>
      <SellerReportsSalesAndOperationsNavTabs tabs={tabs} />
      {children}
    </>
  );
}
