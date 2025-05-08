import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Truck,
  Megaphone,
  Video,
  Star,
  Heart,
  LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface QuickAccessItem {
  icon: LucideIcon;
  labelKey: string;
  bgColor: string;
  iconColor: string;
  href: string;
}

const quickAccessItems: QuickAccessItem[] = [
  {
    icon: ShoppingCart,
    labelKey: "quickAccess.myProducts",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    href: "/seller/products",
  },
  {
    icon: Truck,
    labelKey: "quickAccess.delivery",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
    href: "/seller/delivery",
  },
  {
    icon: Megaphone,
    labelKey: "quickAccess.advertising",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    href: "/seller/ads",
  },
  {
    icon: Video,
    labelKey: "quickAccess.videoCenter",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
    href: "/seller/videos",
  },
  {
    icon: Star,
    labelKey: "quickAccess.reviews",
    bgColor: "bg-cyan-100",
    iconColor: "text-cyan-600",
    href: "/seller/reviews",
  },
  {
    icon: Heart,
    labelKey: "quickAccess.favorites",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    href: "/seller/favorites",
  },
];

function SellerQuickAccessCard() {
  const t = useTranslations();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">
          {t("quickAccess.title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} href={item.href}>
                <Button
                  variant="outline"
                  className="w-full h-auto flex flex-col items-center gap-2 py-6 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                >
                  <div
                    className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center`}
                  >
                    <Icon className={`h-6 w-6 ${item.iconColor}`} />
                  </div>
                  <span className="text-center text-xs">
                    {t(item.labelKey)}
                  </span>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default SellerQuickAccessCard;
