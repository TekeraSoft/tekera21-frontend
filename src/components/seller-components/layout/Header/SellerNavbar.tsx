"use client";

import {
  Package,
  Users,
  ShoppingCart,
  Truck,
  BarChart2,
  UserRoundCog,
  LayoutDashboard,
  Store,
  LifeBuoy,
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

import { useAppSelector } from "@/store/store";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import { SellerMenuItem } from "../../../../../types/SellerTypes/SellerNavbarTypes";
import SellerNavbarMobile from "./SellerNavbarMobile";
import RestrictedAccessDialog from "./RestrictedAccessDialog";

// Define the menu structure

const menuItems: SellerMenuItem[] = [
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
    key: "sellerSuperAdmin",
    label: "Mağaza ",

    icon: <Store className="mr-2 h-4 w-4" />,
    requiredRole: "sellerSuperAdmin",
    subItems: [
      {
        key: "campaigns",
        label: "Mağaza Bilgileri",
        requiredRole: "sellerSuperAdmin",
        href: "/seller/company",
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

      // {
      //   key: "automaticPricing",
      //   label: "Otomatik Fiyatlandırma",
      //   requiredRole: "products",
      //   flyout: [
      //     {
      //       key: "buyboxRules",
      //       label: "Buybox Kuralları",
      //       requiredRole: "products",
      //       href: "/seller/products/buybox-rules",
      //     },
      //     {
      //       key: "advantageousProductRules",
      //       label: "Avantajlı Ürün Kuralları",
      //       requiredRole: "products",
      //       href: "/seller/products/advantageous-product-rules",
      //     },
      //   ],
      // },
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
      // {
      //   key: "cargo",
      //   label: "Kargo Firmaları",
      //   requiredRole: "cargo",
      //   href: "/seller/cargo/carriers",
      // },
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
        href: "/seller/users",
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
        href: "/seller/reports",
      },
      {
        key: "analyticsFavoritesAndViews",
        label: "Favori ve Görüntülenme",
        requiredRole: "analytics",
        href: "/seller/reports/favorites-and-views",
      },
      {
        key: "analyticPerform",
        label: "Satış ve Performans",
        requiredRole: "analytics",
        flyout: [
          {
            key: "analyticOverallPerformance",
            label: "Satış",
            requiredRole: "analytics",
            href: "/seller/reports/sales-and-operations/sales",
          },
          {
            key: "analyticProductPerformance",
            label: "Operasyon",
            requiredRole: "analytics",
            href: "/seller/reports/sales-and-operations/operations",
          },
        ],
      },
      {
        key: "analyticReportShop",
        label: "Mağaza",
        requiredRole: "analytics",
        href: "/seller/reports/sales-and-operations/shop",
      },
    ],
  },
  {
    key: "support",
    label: "Destek",

    icon: <LifeBuoy className="mr-2 h-4 w-4" />,
    requiredRole: "help",
    subItems: [
      {
        key: "supportTicketCreate",
        label: "Talep Oluştur",
        requiredRole: "help",
        href: "/seller/help",
      },
      {
        key: "supportMyTickets",
        label: "Destek Taleplerim",
        href: "/seller/help/my-requests",
        requiredRole: "help",
      },
      {
        key: "supportBuyerTickets",
        label: "Müşteri Talepleri",
        href: "/seller/help/buyer-requests",
        requiredRole: "help",
      },
    ],
  },
  // {
  //   key: "adds",
  //   label: "Reklamlar",
  //   icon: <FileText className="mr-2 h-4 w-4" />,
  //   requiredRole: "adds",
  //   subItems: [
  //     {
  //       key: "campaigns",
  //       label: "Kampanyalar",
  //       requiredRole: "adds",
  //       href: "/seller/adds/campaigns",
  //     },
  //     {
  //       key: "performance",
  //       label: "Performans",
  //       href: "/seller/adds/performance",
  //       requiredRole: "adds",
  //     },
  //   ],
  // },
];

function SellerNavbar() {
  const { userInfo } = useAuthContext();

  const { logoUrl } = useAppSelector((state) => state.globalSettings);

  // Check if the user has the required role
  const hasRole = (role: string): boolean => {
    if (!userInfo) return false;
    return userInfo.role.includes(role);
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRestrictedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDialogOpen(true);
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

          {menuItems.map((item) => {
            const isAccessible = hasRole(item.requiredRole);
            return (
              <MenubarMenu key={item.key}>
                {isAccessible ? (
                  <MenubarTrigger className="flex items-center gap-1 hover:bg-slate-100 transition duration-300 cursor-pointer">
                    {item.icon}
                    <span>{item.label}</span>
                  </MenubarTrigger>
                ) : (
                  <div
                    onClick={handleRestrictedClick}
                    className="flex items-center gap-1 bg-red-50 text-gray-400 px-3 py-2 rounded-md cursor-not-allowed"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                )}

                {isAccessible && (
                  <MenubarContent>
                    {item.subItems?.map((subItem) => {
                      const isSubAccessible = hasRole(subItem.requiredRole);

                      return subItem.flyout ? (
                        <MenubarSub key={subItem.key}>
                          {isSubAccessible ? (
                            <MenubarSubTrigger className="flex justify-between hover:bg-slate-100 cursor-pointer">
                              {subItem.label}
                            </MenubarSubTrigger>
                          ) : (
                            <div
                              onClick={handleRestrictedClick}
                              className="flex justify-between text-gray-400 opacity-50 px-3 py-2 cursor-not-allowed"
                            >
                              {subItem.label}
                            </div>
                          )}

                          {isSubAccessible && (
                            <MenubarSubContent>
                              {subItem.flyout.map((flyoutItem) => {
                                const isFlyoutAccessible = hasRole(
                                  flyoutItem.requiredRole
                                );
                                return isFlyoutAccessible ? (
                                  <MenubarItem
                                    key={flyoutItem.key}
                                    onClick={() =>
                                      (window.location.href = flyoutItem.href)
                                    }
                                    className="hover:bg-slate-100 cursor-pointer"
                                  >
                                    {flyoutItem.label}
                                  </MenubarItem>
                                ) : (
                                  <div
                                    key={flyoutItem.key}
                                    onClick={handleRestrictedClick}
                                    className="text-gray-400 px-3 py-2 opacity-50 cursor-not-allowed"
                                  >
                                    {flyoutItem.label}
                                  </div>
                                );
                              })}
                            </MenubarSubContent>
                          )}
                        </MenubarSub>
                      ) : isSubAccessible ? (
                        <MenubarItem
                          key={subItem.key}
                          onClick={() =>
                            subItem.href &&
                            (window.location.href = subItem.href)
                          }
                          className="hover:bg-slate-100 cursor-pointer"
                        >
                          {subItem.label}
                        </MenubarItem>
                      ) : (
                        <div
                          key={subItem.key}
                          onClick={handleRestrictedClick}
                          className="text-gray-400 px-3 py-2 opacity-50 cursor-not-allowed"
                        >
                          {subItem.label}
                        </div>
                      );
                    })}
                  </MenubarContent>
                )}
              </MenubarMenu>
            );
          })}
        </Menubar>
      </div>
      <SellerNavbarMobile menuItems={menuItems} />
      <RestrictedAccessDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}

export default SellerNavbar;
