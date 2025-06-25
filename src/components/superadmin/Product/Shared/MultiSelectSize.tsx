import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sizeOptions } from "@/data/productCreateValues";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useState } from "react";

interface MultiSelectSizeProps {
  value: string[];
  onChange: (sizes: string[]) => void;
  variantIndex: number;
  onAttributesChange: (attributes: any[]) => void;
}

export default function MultiSelectSize({
  value,
  onChange,
  variantIndex,
  onAttributesChange,
}: MultiSelectSizeProps) {
  const [open, setOpen] = useState(false);

  const handleSizeToggle = (size: string) => {
    const newSizes = value.includes(size)
      ? value.filter((s) => s !== size)
      : [...value, size];

    onChange(newSizes);

    // Create attributes for each selected size
    const newAttributes = newSizes.map((selectedSize) => ({
      attributeDetails: [{ key: "size", value: selectedSize }],
      stock: 50,
      price: 1449,
      discountPrice: 0,
      sku: `DK-BYZTB1${selectedSize.toLowerCase()}`,
      barcode: `DK-BYZTB1${selectedSize.toLowerCase()}1`,
    }));

    onAttributesChange(newAttributes);
  };

  const removeSizeTag = (sizeToRemove: string) => {
    const newSizes = value.filter((size) => size !== sizeToRemove);
    onChange(newSizes);

    const newAttributes = newSizes.map((selectedSize) => ({
      attributeDetails: [{ key: "size", value: selectedSize }],
      stock: 50,
      price: 1449,
      discountPrice: 0,
      sku: `DK-BYZTB1${selectedSize.toLowerCase()}`,
      barcode: `DK-BYZTB1${selectedSize.toLowerCase()}1`,
    }));

    onAttributesChange(newAttributes);
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value.length > 0
              ? `${value.length} size selected`
              : "Select sizes..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search sizes..." />
            <CommandList>
              <CommandEmpty>No size found.</CommandEmpty>
              <CommandGroup>
                {sizeOptions.map((size) => (
                  <CommandItem
                    key={size}
                    value={size}
                    onSelect={() => handleSizeToggle(size)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value.includes(size) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {size}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((size) => (
            <Badge key={size} variant="secondary" className="px-2 py-1">
              {size}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => removeSizeTag(size)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
