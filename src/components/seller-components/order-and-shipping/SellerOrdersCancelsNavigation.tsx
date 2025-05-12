"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import React from "react";

interface SellerOrdersCancelsNavigationTabsProps {
  label: string;
  href: string;
}

const tabs: SellerOrdersCancelsNavigationTabsProps[] = [
  {
    label: "Tüm İptaller",
    href: "/seller/orders/cancels",
  },
  {
    label: "Müşterinin İptal Ettiği",
    href: "/seller/orders/cancels/customer",
  },
  {
    label: "Benim İptal Ettiğim",
    href: "/seller/orders/cancels/me",
  },
  {
    label: "Trendyol'un İptal Ettiği",
    href: "/seller/orders/cancels/tekera21-cancels",
  },
];

function SellerOrdersCancelsNavigation() {
  const pathname = usePathname();

  return (
    <div className="mb-4 flex border-b overflow-auto">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            "border-b-2 px-4 py-2 font-medium whitespace-nowrap",
            pathname === tab.href
              ? "border-primary text-primary"
              : "border-transparent text-gray-600 hover:text-gray-800"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

export default SellerOrdersCancelsNavigation;
