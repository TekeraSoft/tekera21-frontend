"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/SideBarContext";
import { cn } from "@/lib/utils";
import { PanelLeft, PlusCircle } from "lucide-react";
import ToggleSidebarButton from "./ToggleSidebarButton";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <ToggleSidebarButton />
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>
  );
}
