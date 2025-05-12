"use client";

import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

export default function SellerOrderHeader() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Tüm Siparişler",
      path: "/orders/shipping",
      count: 23,
      badge: true,
      badgeText: "",
    },
    { name: "Yeni Siparişleriniz", path: "/new-order", badge: true },
    {
      name: "İşleme Alınanlar",
      path: "/order/in-process",
      badge: true,
      badgeText: "İşleme alınan siparişlerinizi inceleyin.",
    },
    {
      name: "Teslim Edilenler",
      path: "/orders/delivered",
      count: 23,
      badge: true,
      badgeText: "Teslim edilen siparişlerinizi inceleyin.",
    },
    {
      name: "İptal Edilenler",
      path: "/orders/cancels",
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
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "whitespace-nowrap px-4 py-2 border-r last:border-r-0 hover:bg-gray-100 transition-colors",
                pathname === item.path
                  ? "font-medium border-b-2 border-b-primary"
                  : ""
              )}
            >
              <div className="flex items-center gap-2">
                {item.name}
                {item.count && (
                  <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">
                    {item.count} Paket
                  </span>
                )}
                {item.badge && (
                  <Popover>
                    <PopoverTrigger>Open</PopoverTrigger>
                    <PopoverContent>
                      Place content for the popover here.
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
