"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SideBarContext";
import { cn } from "@/lib/utils";
import { PanelLeft, PlusCircle } from "lucide-react";

export function DashboardHeader() {
  const { isMobile, isOpen, toggleSidebar } = useSidebar(); // isMobile değerini kullanarak sınıfı ayarlayın

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant={"ghost"}
          className={cn(
            "lg:hidden px-0 pr-4 py-0 mt-1",
            !isOpen && isMobile ? "block" : "hidden"
          )}
          onClick={toggleSidebar}
        >
          <PanelLeft />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>
  );
}
