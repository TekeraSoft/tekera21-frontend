"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function SellerHelpNavBar() {
  const pathname = usePathname();
  const tabs = [
    {
      label: "Destek Oluştur",
      href: "/seller/help",
    },
    {
      label: "Destek Taleplerim",
      href: "/seller/help/my-requests",
    },
    {
      label: "Müşteri Talepleri",
      href: "/seller/help/buyer-requests",
    },
  ];
  return (
    <div className="border-b ">
      <div className="flex h-10 items-center px-4">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none  relative",
              pathname === tab.href
                ? "text-foreground border-b-2 border-primary "
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
