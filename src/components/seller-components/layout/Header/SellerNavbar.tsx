"use client";

import {
  Package,
  Users,
  ShoppingCart,
  Truck,
  BarChart2,
  FileText,
  UserRoundCog,
  LayoutDashboard,
} from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";

import type { MenuItem } from "../../../../../types/SellerTypes/SellerNavbarTypes";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import SellerNavbarMobile from "./SellerNavbarMobile";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

// Define the menu structure

const menuItems: MenuItem[] = [
  {
    key: "user",
    label: "Kullanıcı",
    icon: <Users className="mr-2 h-4 w-4" />,

    requiredRole: "user",
    subItems: [
      {
        key: "user",
        label: "Profil",
        requiredRole: "users",
        href: "/seller/user/profile",
      },
    ],
  },
  {
    key: "products",
    label: "Ürünler",
    icon: <Package className="mr-2 h-4 w-4" />,
    requiredRole: "products",
    subItems: [
      {
        key: "productList",
        label: "Ürün Listesi",
        requiredRole: "products",
        href: "/seller/product/list",
      },
      {
        key: "productCreate",
        label: "Ürün oluştur",
        requiredRole: "products",
        href: "/seller/product/create",
      },

      {
        key: "automaticPricing",
        label: "Otomatik Fiyatlandırma",
        requiredRole: "products",
        flyout: [
          {
            key: "buyboxRules",
            label: "Buybox Kuralları",
            requiredRole: "products",
            href: "/seller/products/buybox-rules",
          },
          {
            key: "advantageousProductRules",
            label: "Avantajlı Ürün Kuralları",
            requiredRole: "products",
            href: "/seller/products/advantageous-product-rules",
          },
        ],
      },
    ],
  },
  {
    key: "orders",
    label: "Siparişler",
    icon: <ShoppingCart className="mr-2 h-4 w-4" />,
    requiredRole: "orders",
    subItems: [
      {
        key: "orderList",
        label: "Sipariş Listesi",
        requiredRole: "orders",
        href: "/seller/orders",
      },
      {
        key: "returns",
        label: "İade İşlemleri",
        requiredRole: "orders",
        href: "/seller/return-transactions",
      },
    ],
  },
  {
    key: "cargo",
    label: "Kargo",
    icon: <Truck className="mr-2 h-4 w-4" />,
    requiredRole: "cargo",
    subItems: [
      {
        key: "shippingSettings",
        label: "Kargo Ayarları",
        requiredRole: "cargo",
        href: "/seller/cargo/cargo-actions",
      },
      {
        key: "carriers",
        label: "Kargo Firmaları",
        requiredRole: "cargo",
        href: "/seller/cargo/carriers",
      },
    ],
  },

  {
    key: "users",
    label: "Kullanıcılar",
    icon: <UserRoundCog className="mr-2 h-4 w-4" />,

    requiredRole: "users",
    subItems: [
      {
        key: "userList",
        label: "Kullanıcı Listesi",
        requiredRole: "users",
        href: "/seller/users/list",
      },
      {
        key: "roles",
        label: "Roller",
        requiredRole: "users",
        href: "/seller/users/roles",
      },
    ],
  },

  {
    key: "adds",
    label: "Reklamlar",
    icon: <FileText className="mr-2 h-4 w-4" />,
    requiredRole: "adds",
    subItems: [
      {
        key: "campaigns",
        label: "Kampanyalar",
        requiredRole: "adds",
        href: "/seller/adds/campaigns",
      },
      {
        key: "performance",
        label: "Performans",
        href: "/seller/adds/performance",
        requiredRole: "adds",
      },
    ],
  },
  {
    key: "analytics",
    label: "Analitik",
    icon: <BarChart2 className="mr-2 h-4 w-4" />,
    requiredRole: "analytics",
    subItems: [
      {
        key: "analytics",
        label: "Anasayfa",
        requiredRole: "analytics",
        href: "/seller",
      },
      {
        key: "dashboard",
        label: "Dashboard",
        requiredRole: "analytics",
        href: "/seller/analytics/dashboard",
      },
      {
        key: "reports",
        label: "Raporlar",
        requiredRole: "analytics",
        href: "/seller/analytics/reports",
      },
    ],
  },
];

function SellerNavbar() {
  const { userInfo } = useAuthContext();

  const { logoUrl } = useSelector((state: RootState) => state.globalSettings);

  // Check if the user has the required role
  const hasRole = (role: string): boolean => {
    if (!userInfo) return false;
    return userInfo.role.includes(role);
  };

  return (
    <div className="w-full">
      {/* Desktop Navigation */}
      <div className="w-full border-b hidden lg:flex justify-start items-center px-5 h-20">
        <Link
          href={"/seller"}
          className="mr-4 flex items-center justify-center"
        >
          {/* Logo */}
          <Image
            src={logoUrl}
            alt="logo-url"
            width={50}
            height={50}
            className="object-cover"
          />
        </Link>
        <Menubar className="border-none rounded-none px-2 lg:px-4">
          <Button size={"sm"}>
            <Link href={"/seller"} className="flex-center gap-2">
              <LayoutDashboard size={18} />
              <span>Anasayfa</span>
            </Link>
          </Button>

          {menuItems.map((item) => (
            <MenubarMenu key={item.key}>
              <MenubarTrigger
                className={cn(
                  "flex items-center gap-1 hover:bg-slate-100 transition duration-300",
                  hasRole(item.requiredRole)
                    ? "cursor-pointer "
                    : "bg-red-50 opacity-50 cursor-not-allowed"
                )}
                disabled={!hasRole(item.requiredRole)}
              >
                {item.icon}
                <span>{item.label}</span>
              </MenubarTrigger>
              {hasRole(item.requiredRole) && (
                <MenubarContent>
                  {item.subItems?.map((subItem) =>
                    subItem.flyout ? (
                      <MenubarSub key={subItem.key}>
                        <MenubarSubTrigger
                          className={cn(
                            "flex items-center justify-between transition duration-300 hover:bg-slate-100 cursor-pointer",
                            !hasRole(subItem.requiredRole) &&
                              "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <span>{subItem.label}</span>
                        </MenubarSubTrigger>
                        {hasRole(subItem.requiredRole) && (
                          <MenubarSubContent>
                            {subItem.flyout.map((flyoutItem) => (
                              <MenubarItem
                                key={flyoutItem.key}
                                className={cn(
                                  "cursor-pointer transition duration-300 hover:bg-slate-100 ",
                                  !hasRole(flyoutItem.requiredRole) &&
                                    "opacity-50 cursor-not-allowed"
                                )}
                                onClick={(e) => {
                                  if (!hasRole(flyoutItem.requiredRole)) {
                                    e.preventDefault();
                                    return;
                                  }
                                  // Handle navigation
                                  window.location.href = flyoutItem.href;
                                }}
                              >
                                {flyoutItem.label}
                              </MenubarItem>
                            ))}
                          </MenubarSubContent>
                        )}
                      </MenubarSub>
                    ) : (
                      <MenubarItem
                        key={subItem.key}
                        className={cn(
                          "cursor-pointer",
                          !hasRole(subItem.requiredRole) &&
                            "opacity-50 cursor-not-allowed"
                        )}
                        onClick={(e) => {
                          if (!hasRole(subItem.requiredRole)) {
                            e.preventDefault();
                            return;
                          }
                          // Handle navigation
                          if (subItem.href) {
                            window.location.href = subItem.href;
                          }
                        }}
                      >
                        {subItem.label}
                      </MenubarItem>
                    )
                  )}
                </MenubarContent>
              )}
            </MenubarMenu>
          ))}
        </Menubar>
      </div>
      <SellerNavbarMobile menuItems={menuItems} />
    </div>
  );
}

export default SellerNavbar;
