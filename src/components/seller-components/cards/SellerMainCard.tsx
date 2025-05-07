import React, { ReactNode } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type CardType = "basic" | "info" | "success" | "warning" | "error";
type CardSize = "sm" | "md" | "lg";

interface SellerMainCardProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
  type?: CardType;
  size?: CardSize;
  className?: string;
}

const typeStyles: Record<CardType, string> = {
  basic: "", // Klasik ShadCN card
  info: "bg-blue-50 text-blue-800 border-blue-200",
  success: "bg-green-50 text-green-800 border-green-200",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  error: "bg-red-50 text-red-800 border-red-200",
};

const sizeStyles: Record<CardSize, string> = {
  sm: "p-3 text-sm rounded-md",
  md: "p-5 text-base rounded-lg",
  lg: "p-7 text-lg rounded-xl",
};

const icons: Partial<Record<CardType, React.ReactNode>> = {
  info: <Info className="w-5 h-5 mr-2" />,
  success: <CheckCircle className="w-5 h-5 mr-2" />,
  warning: <AlertTriangle className="w-5 h-5 mr-2" />,
  error: <XCircle className="w-5 h-5 mr-2" />,
};

const SellerMainCard: React.FC<SellerMainCardProps> = ({
  title,
  description,
  footer,
  children,
  type = "basic",
  size = "md",
  className,
}) => {
  return (
    <Card
      className={cn("border", typeStyles[type], sizeStyles[size], className)}
    >
      {(title || description) && (
        <CardHeader className="flex flex-row items-start gap-2">
          {type !== "basic" && icons[type]}
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default SellerMainCard;
