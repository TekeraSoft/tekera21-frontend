"use client";

import { useState } from "react";
import {
  Package,
  Users,
  ShoppingCart,
  Truck,
  BarChart2,
  FileText,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
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
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { MenuItem } from "../../../../../types/SellerTypes/SellerNavbarTypes";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

// Define the menu structure
const menuItems: MenuItem[] = [
  {
    key: "products",
    label: "Ürünler",
    icon: <Package className="mr-2 h-4 w-4" />,
    requiredRole: "products",
    subItems: [
      {
        key: "automaticPricing",
        label: "Otomatik Fiyatlandırma",
        requiredRole: "products",
        flyout: [
          {
            key: "buyboxRules",
            label: "Buybox Kuralları",
            requiredRole: "products",
            href: "/products/buybox-rules",
          },
          {
            key: "advantageousProductRules",
            label: "Avantajlı Ürün Kuralları",
            requiredRole: "products",
            href: "/products/advantageous-product-rules",
          },
        ],
      },
      {
        key: "productList",
        label: "Ürün Listesi",
        requiredRole: "products",
        href: "/products/list",
      },
      {
        key: "categories",
        label: "Kategoriler",
        requiredRole: "products",
        href: "/products/categories",
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
        href: "/orders/list",
      },
      {
        key: "returns",
        label: "İadeler",
        requiredRole: "orders",
        href: "/orders/returns",
      },
    ],
  },
  {
    key: "users",
    label: "Kullanıcılar",
    icon: <Users className="mr-2 h-4 w-4" />,
    requiredRole: "users",
    subItems: [
      {
        key: "userList",
        label: "Kullanıcı Listesi",
        requiredRole: "users",
        href: "/users/list",
      },
      {
        key: "roles",
        label: "Roller",
        requiredRole: "users",
        href: "/users/roles",
      },
    ],
  },
  {
    key: "shipping",
    label: "Sipariş & Kargo",
    icon: <Truck className="mr-2 h-4 w-4" />,
    requiredRole: "shipping",
    subItems: [
      {
        key: "shippingSettings",
        label: "Kargo Ayarları",
        requiredRole: "shipping",
        href: "/shipping/settings",
      },
      {
        key: "carriers",
        label: "Kargo Firmaları",
        requiredRole: "shipping",
        href: "/shipping/carriers",
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
        href: "/adds/campaigns",
      },
      {
        key: "performance",
        label: "Performans",
        href: "/adds/performance",
        requiredRole: "adds",
      },
    ],
  },
  {
    key: "home",
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
        href: "/analytics/dashboard",
      },
      {
        key: "reports",
        label: "Raporlar",
        requiredRole: "analytics",
        href: "/analytics/reports",
      },
    ],
  },
];

function SellerNavbar() {
  const { SellerUserInfo } = useSelector(
    (state: RootState) => state.SellerUser
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const [openFlyouts, setOpenFlyouts] = useState<Record<string, boolean>>({});

  // Check if the user has the required role
  const hasRole = (role: string): boolean => {
    if (!SellerUserInfo) return false;
    return SellerUserInfo.role.includes(role);
  };

  const toggleSubMenu = (key: string) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleFlyout = (key: string) => {
    setOpenFlyouts((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNavigation = (href: string, hasRequiredRole: boolean) => {
    if (!hasRequiredRole) return;
    window.location.href = href;
  };

  return (
    <div className="w-full">
      {/* Desktop Navigation */}
      <div className="w-full border-b hidden md:flex justify-start items-center px-5 h-20">
        <div className="mr-4">Logo</div>
        <Menubar className="border-none rounded-none px-2 lg:px-4">
          {menuItems.map((item) => (
            <MenubarMenu key={item.key}>
              <MenubarTrigger
                className={cn(
                  "flex items-center gap-1 hover:bg-slate-100 transition duration-300",
                  hasRole(item.requiredRole)
                    ? "cursor-pointer"
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

      {/* Mobile Navigation */}
      <div className="md:hidden border-b">
        <div className="flex justify-between items-center p-4">
          <div>Logo</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="px-4 pb-4 bg-white">
            {menuItems.map((item) => (
              <div key={item.key} className="mb-2">
                <Collapsible>
                  <CollapsibleTrigger
                    className={cn(
                      "w-full flex items-center justify-between p-2 rounded-md",
                      hasRole(item.requiredRole)
                        ? "hover:bg-slate-100"
                        : "bg-red-50 opacity-50 cursor-not-allowed"
                    )}
                    disabled={!hasRole(item.requiredRole)}
                    onClick={() => toggleSubMenu(item.key)}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </div>
                    {openSubMenus[item.key] ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {item.subItems?.map((subItem) =>
                      subItem.flyout ? (
                        <Collapsible key={subItem.key}>
                          <CollapsibleTrigger
                            className={cn(
                              "w-full flex items-center justify-between p-2 pl-8 rounded-md",
                              hasRole(subItem.requiredRole)
                                ? "hover:bg-slate-100"
                                : "opacity-50 cursor-not-allowed"
                            )}
                            disabled={!hasRole(subItem.requiredRole)}
                            onClick={() => toggleFlyout(subItem.key)}
                          >
                            <span>{subItem.label}</span>
                            {openFlyouts[subItem.key] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {subItem.flyout.map((flyoutItem) => (
                              <div
                                key={flyoutItem.key}
                                className={cn(
                                  "p-2 pl-12 rounded-md",
                                  hasRole(flyoutItem.requiredRole)
                                    ? "hover:bg-slate-100 cursor-pointer"
                                    : "opacity-50 cursor-not-allowed"
                                )}
                                onClick={() =>
                                  handleNavigation(
                                    flyoutItem.href,
                                    hasRole(flyoutItem.requiredRole)
                                  )
                                }
                              >
                                {flyoutItem.label}
                              </div>
                            ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <div
                          key={subItem.key}
                          className={cn(
                            "p-2 pl-8 rounded-md",
                            hasRole(subItem.requiredRole)
                              ? "hover:bg-slate-100 cursor-pointer"
                              : "opacity-50 cursor-not-allowed"
                          )}
                          onClick={() =>
                            handleNavigation(
                              subItem.href || "",
                              hasRole(subItem.requiredRole)
                            )
                          }
                        >
                          {subItem.label}
                        </div>
                      )
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerNavbar;
