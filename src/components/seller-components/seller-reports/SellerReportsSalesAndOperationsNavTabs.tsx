"use client";
import { Badge } from "@/components/ui/badge";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavTabsProps {
  tabs: {
    label: string;
    href: string;
    isNew?: boolean;
  }[];
}

export function SellerReportsSalesAndOperationsNavTabs({ tabs }: NavTabsProps) {
  const pathname = usePathname();

  return (
    <div className="border-b">
      <div className="flex h-10 items-center px-4">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
              pathname === tab.href
                ? "text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {tab.isNew && (
              <Badge variant="secondary" className="ml-1 px-1 py-0 text-[10px]">
                Yeni
              </Badge>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
