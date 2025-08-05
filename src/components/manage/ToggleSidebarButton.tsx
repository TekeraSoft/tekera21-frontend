"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SideBarContext";
import { Menu } from "lucide-react";

const ToggleSidebarButton = () => {
  const { isMobile, isOpen, toggleSidebar } = useSidebar(); // isMobile değerini kullanarak sınıfı ayarlayın
  return (
    <Button
      size={"max"}
      variant={"ghost"}
      className={cn(
        "lg:hidden p-2 m-0 bg-gray-800 hover:bg-gray-200 text-white",
        !isOpen && isMobile ? "block" : "hidden"
      )}
      onClick={toggleSidebar}
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
};

export default ToggleSidebarButton;
