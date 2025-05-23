import React from "react";
import { cn } from "@/lib/utils";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5";
  children: React.ReactNode;
  size?: string; // Tailwind sınıfı olarak gelecek, örn: "text-2xl md:text-4xl"
  align?: string; // örn: "text-left md:text-center"
  variant?: "default" | "primary" | "secondary" | "white";
  className?: string;
};

const variantMap = {
  default: "text-foreground",
  primary: "text-primary",
  secondary: "text-secondary",
  white: "text-white",
};

export default function DigitalFashionHeading({
  as: Component = "h2",
  children,
  size = "text-2xl", // responsive yazılabilir: "text-2xl md:text-4xl"
  align = "text-left", // responsive yazılabilir: "text-left md:text-center"
  variant = "default",
  className,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "font-bold tracking-tight mt-2 mb-4",
        size,
        variantMap[variant],
        align,
        className
      )}
    >
      {children}
    </Component>
  );
}
