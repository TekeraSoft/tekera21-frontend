"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RootState } from "@/store/store";
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { NotificationPopover } from "./SellerNotificationPopover";
import { MenuItem } from "../../../../../types/SellerTypes/SellerNavbarTypes";
import SellerUserPopover from "./SellerCompanyPopover";

interface SellerNavbarMobileProps {
  menuItems: MenuItem[];
}

function SellerNavbarMobile({ menuItems }: SellerNavbarMobileProps) {
  const { SellerUserInfo } = useSelector(
    (state: RootState) => state.SellerUser
  );

  interface AlertItem {
    id: string;
    title: string;
    message: string;
    type: "success" | "warning" | "info" | "error";
  }

  const alertItems: AlertItem[] = [
    {
      id: "1",
      title: "Yeni Sipariş",
      message: "Bir müşteri yeni bir sipariş verdi.",
      type: "success",
    },
    {
      id: "2",
      title: "Stok Uyarısı",
      message: "Stokta azalan ürünler var.",
      type: "warning",
    },
    {
      id: "3",
      title: "Yeni Duyuru",
      message: "Yeni bir duyuru yayınlandı.",
      type: "info",
    },
    {
      id: "4",
      title: "Hata Bildirimi",
      message: "Bir hata oluştu.",
      type: "error",
    },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({});
  const [openFlyouts, setOpenFlyouts] = useState<Record<string, boolean>>({});

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

  // Check if the user has the required role
  const hasRole = (role: string): boolean => {
    if (!SellerUserInfo) return false;
    return SellerUserInfo.role.includes(role);
  };

  return (
    <div className="lg:hidden border-b">
      <div className="flex justify-between items-center p-4">
        <div>Logo</div>
        <div className="flex  justify-between items-center gap-2">
          <Button
            className=" rounded-full"
            variant="default"
            size="icon"
            aria-label="Toggle alert"
          >
            <Search size={16} />
          </Button>

          <NotificationPopover alertItems={alertItems} />
          <SellerUserPopover />
          <Button
            className="border"
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
  );
}

export default SellerNavbarMobile;
