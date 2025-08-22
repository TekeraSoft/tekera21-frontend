"use client";

import {
  Menu,
  X,
  Home,
  Package,
  ShoppingCart,
  BarChart3,
  LucidePercentDiamond,
  LucideAirVent,
  DollarSign,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { useSidebar } from "@/context/SideBarContext";
import { useAuthContext } from "@/context/AuthContext";
import { sellerRoles } from "@/constants/roles";

export function SellerSidebar() {
  const { userInfo: user } = useAuthContext();

  const routes = [
    {
      name: "Genel Bakış",
      path: "/seller/dashboard",
      icon: Home,
    },
    user?.roles.some((role) => sellerRoles.includes(role)) && {
      name: "Ürünler",
      path: "/seller/products",
      icon: Package,
    },
    user?.roles.some((role) => sellerRoles.includes(role)) && {
      name: "Ürün Oluştur",
      path: "/seller/create/product",
      icon: LucidePercentDiamond,
    },
    user?.roles.some((role) => sellerRoles.includes(role)) && {
      name: "Siparişler",
      path: "/seller/orders",
      icon: ShoppingCart,
    },
    user?.roles.some((role) => sellerRoles.includes(role)) && {
      name: "Ödeme Raporları",
      path: "/seller/payment",
      icon: DollarSign,
    },
    user?.roles.some((role) => sellerRoles.includes(role)) && {
      name: "Analitik veriler",
      path: "/seller/analytics",
      icon: BarChart3,
    },
    user?.roles.some((role) => sellerRoles.includes(role)) && {
      name: "Koleksiyonlar",
      path: "/seller/collections",
      icon: LucideAirVent,
    },
    user?.roles.some((role) => sellerRoles.includes(role)) && {
      name: "Koleksiyon Oluştur",
      path: "/seller/create/collection",
      icon: LucideAirVent,
    },
  ].filter(Boolean) as { name: string; path: string; icon: any }[]; // Filter out any undefined values

  const { isMobile, openMobile, setOpenMobile, toggleSidebar, isOpen } =
    useSidebar();

  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && openMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpenMobile(false)}
        />
      )}

      {/* Sidebar - Mobile: absolute positioning, Desktop: part of the grid */}
      <div
        className={`
          ${
            isMobile
              ? `fixed inset-y-0 left-0 z-50 transform ${
                  openMobile ? "translate-x-0" : "-translate-x-full"
                }`
              : "relative"
          }
          bg-gray-100 min-h-screen transition-all duration-300 border-r
          ${isOpen && !isMobile ? "w-96" : isMobile ? "w-64" : "w-16"}
        `}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <button
            className="absolute right-2 top-2 p-2 rounded-md hover:bg-gray-200"
            onClick={() => setOpenMobile(false)}
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="px-4 py-2 border-b">
          <div className="flex items-center gap-2">
            <div
              onClick={toggleSidebar}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800 text-white cursor-pointer"
            >
              <Menu className="h-4 w-4" />
            </div>
            {(isOpen || isMobile) && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Dashboard</span>
                <span className="text-xs text-gray-500">v1.0.0</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-4">
          <nav>
            <ul className="space-y-2">
              {routes?.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <Link
                      href={item.path}
                      className={`
                      flex items-center gap-2 p-2 rounded-md 
                      ${
                        item.path === pathname
                          ? "bg-gray-200 text-gray-800"
                          : "hover:bg-gray-200 text-gray-600"
                      }
                      ${!isOpen && !isMobile ? "justify-center" : ""}
                    `}
                    >
                      <Icon className="h-4 w-4" />
                      {/* Show text only when sidebar is open or on mobile */}
                      {(isOpen || isMobile) && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
