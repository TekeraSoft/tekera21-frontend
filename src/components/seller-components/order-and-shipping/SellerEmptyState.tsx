import Image from "next/image";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description?: string;
  buttons?: {
    label: string;
    variant?: "default" | "outline";
  }[];
}

export default function EmptyState({
  title,
  description,
  buttons,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-32 h-32 relative mb-6">
        <Image
          src="/placeholder.svg?height=128&width=128"
          alt="Empty box"
          width={128}
          height={128}
          className="opacity-70"
        />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 text-center max-w-md mb-6">
          {description}
        </p>
      )}
      {buttons && buttons.length > 0 && (
        <div className="flex gap-2">
          {buttons.map((button, index) => (
            <Button key={index} variant={button.variant || "default"}>
              {button.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
