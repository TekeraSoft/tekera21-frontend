"use client";

import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Info } from "lucide-react";

export default function SellerOrderHeader() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Tüm Siparişler",
      path: "/seller/orders",
      count: 23,
      badge: true,
      badgeText: "Tüm siparişlerinizi inceleyin.",
    },
    { name: "Yeni Siparişleriniz", path: "/new-order", badge: true },
    {
      name: "İşleme Alınanlar",
      path: "/seller/order/in-process",
      badge: true,
      badgeText: "İşleme alınan siparişlerinizi inceleyin.",
    },
    {
      name: "Teslim Edilenler",
      path: "/seller/orders/delivered",
      count: 23,
      badge: true,
      badgeText: "Teslim edilen siparişlerinizi inceleyin.",
    },
    {
      name: "İptal Edilenler",
      path: "/seller/orders/cancels",
      count: 23,
      badge: true,
      badgeText: "İptal edilen siparişlerinizi inceleyin.",
    },
  ];

  return (
    <header className="border-b">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
        <div className="flex overflow-x-auto hide-scrollbar">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={cn(
                "whitespace-nowrap px-4 py-2 border-r last:border-r-0  ur transition-colors",
                pathname === item.path
                  ? "font-medium border-b-2 border-b-primary"
                  : ""
              )}
            >
              <div className="flex items-center gap-2">
                <Link href={item.path} className="hover:underline">
                  {item.name}
                </Link>

                {item.count && (
                  <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">
                    {item.count} Paket
                  </span>
                )}
                {item.badge && (
                  <Popover>
                    <PopoverTrigger>
                      <Info />
                    </PopoverTrigger>
                    <PopoverContent>{item.badgeText}</PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
