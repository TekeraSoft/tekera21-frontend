"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
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

export type ColorOptionType = {
  name: string;
  hex: string;
};

interface MultiSelectProps {
  options: ColorOptionType[];
  selected: { value: string }[];
  onChange: (selected: { value: string }[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelectColorVariant({
  options,
  selected,
  onChange,
  placeholder = "Renk varyantlarını seçin",
  emptyMessage = "Renk varyantı bulunamadı.",
  className,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i.value !== item));
  };

  const handleSelect = (value: string) => {
    if (selected.find((item) => item.value === value)) {
      onChange(selected.filter((item) => item.value !== value));
    } else {
      onChange([...selected, { value }]);
    }
  };

  const selectedLabels = selected.map((selected) => {
    const option = options.find((option) => option.name === selected.value);
    return option?.name || selected.value;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          <div className="flex flex-wrap gap-1 items-center">
            {selected.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : selected.length > 2 ? (
              <div className="flex items-center gap-1">
                <Badge variant="warning" className="rounded-sm">
                  {selectedLabels[0]}
                </Badge>
                <Badge variant="warning" className="rounded-sm">
                  {selectedLabels[1]}
                </Badge>
                <Badge variant="warning" className="rounded-sm">
                  +{selected.length - 2}
                </Badge>
              </div>
            ) : (
              selectedLabels.map((label) => (
                <Badge key={label} variant="warning" className="rounded-sm">
                  {label}
                </Badge>
              ))
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => {
                const isSelected = selected.filter(
                  (item) => item.value === option.name
                ).length;
                return (
                  <CommandItem
                    disabled={disabled}
                    key={option.name}
                    value={option.name}
                    onSelect={() => handleSelect(option.name)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {option.hex && (
                        <div
                          className="h-8 w-8"
                          style={{ backgroundColor: option.hex }}
                        />
                      )}
                      <span>{option.name}</span>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      
      </PopoverContent>
    </Popover>
  );
}
