"use client";
import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SideBarContext";
import { PanelLeft } from "lucide-react";

const ToggleSidebarButton = () => {
  const { isMobile, isOpen, toggleSidebar } = useSidebar(); // isMobile değerini kullanarak sınıfı ayarlayın
  return (
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
  );
};

export default ToggleSidebarButton;
