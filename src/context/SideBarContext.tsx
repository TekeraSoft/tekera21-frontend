"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

type SidebarContext = {
  state: "expanded" | "collapsed";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (isOpen: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      isOpen: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, setIsMobile } = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    React.useEffect(() => {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768);
        if (window.innerWidth < 768) {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      };

      // Initial check
      checkIsMobile();

      // Add event listener
      window.addEventListener("resize", checkIsMobile);

      // Clean up
      return () => window.removeEventListener("resize", checkIsMobile);
    }, []);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const isOpen = openProp ?? _open;
    const setIsOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(isOpen) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, isOpen]
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((isOpen) => !isOpen)
        : setIsOpen((isOpen) => !isOpen);
    }, [isMobile, setIsOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = isOpen ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        isOpen,
        setIsOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [
        state,
        isOpen,
        setIsOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      ]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = "SidebarProvider";

export { SidebarProvider, useSidebar };
