"use client"

import { BarChart3, Package, ShoppingCart, Users, Home, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, usePathname } from "@/i18n/navigation"

export function Sidebar({userRoles}: {userRoles: string[]}) {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/superadmin/dashboard",
      icon: Home,
    },
   userRoles.includes("products") && {
      name: "Products",
      path: "/products",
      icon: Package,
    },
    userRoles.includes("orders") && {
      name: "Orders",
      path: "/orders",
      icon: ShoppingCart,
    },
    userRoles.includes("customers") && {
      name: "Customers",
      path: "/customers",
      icon: Users,
    },
    userRoles.includes("analytics") &&  {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ].filter(Boolean) as { name: string; path: string; icon: any }[] // Filter out any undefined values

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <h1 className="font-semibold text-lg">E-Commerce Admin</h1>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-gray-900",
                  pathname === route.path ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-100",
                )}
              >
                <Icon className="h-4 w-4" />
                {route.name}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <nav className="grid gap-1 text-sm font-medium">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </nav>
      </div>
    </div>
  )
}
