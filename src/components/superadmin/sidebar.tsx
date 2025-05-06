"use client";

import {
  Menu,
  X,
  Home,
  Users,
  Settings,
  HelpCircle,
  ChevronRight,
  Package,
  ShoppingCart,
  BarChart3,
} from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { useSidebar } from "@/context/SideBarContext";

export function SideBar({ userRoles }: { userRoles: string[] }) {
  const routes = [
    {
      name: "Dashboard",
      path: "/superadmin/dashboard",
      icon: Home,
    },
    userRoles.includes("products") && {
      name: "Products",
      path: "/superadmin/products",
      icon: Package,
    },
    userRoles.includes("orders") && {
      name: "Orders",
      path: "/superadmin/orders",
      icon: ShoppingCart,
    },
    userRoles.includes("customers") && {
      name: "Customers",
      path: "/superadmin/customers",
      icon: Users,
    },
    userRoles.includes("analytics") && {
      name: "Analytics",
      path: "/superadmin/analytics",
      icon: BarChart3,
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
          bg-gray-100 h-screen transition-all duration-300 border-r
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

        <div className="p-4 border-b">
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
              {routes.map((item, index) => {
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

          {/* Collapsible sections - only shown when sidebar is expanded */}
          {(isOpen || isMobile) && (
            <div className="mt-8">
              <div className="text-xs font-medium text-gray-500 mb-2 px-2">
                PROJECTS
              </div>

              {/* Collapsible section example */}
              <div className="mb-2">
                <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-200 text-gray-600">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    <span>Team Projects</span>
                  </div>
                </button>
              </div>

              <div className="mb-2">
                <button className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-200 text-gray-600">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    <span>Personal Projects</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Takes full width on mobile, or remaining space on desktop */}
    </>
  );
}
