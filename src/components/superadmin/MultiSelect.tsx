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
import ImageView from "../shared/ImageView";

export type OptionType = {
  value: string;
  label: string;
  image?: string;
};

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items",
  emptyMessage = "No items found.",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // Get display labels for selected items
  const selectedLabels = selected.map((value) => {
    const option = options.find((option) => option.value === value);
    return option?.label || value;
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
                <Badge variant="secondary" className="rounded-sm">
                  {selectedLabels[0]}
                </Badge>
                <Badge variant="secondary" className="rounded-sm">
                  {selectedLabels[1]}
                </Badge>
                <Badge variant="secondary" className="rounded-sm">
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
          <CommandInput placeholder="Search items..." />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {option.image && (
                        <ImageView
                          imageInfo={{ url: option.image, name: option.label }}
                          className="h-4 w-4 rounded"
                        />
                      )}
                      <span>{option.label}</span>
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
        {selected.length > 0 && (
          <div className="p-2 border-t flex flex-wrap gap-1">
            {selected.map((value) => {
              const option = options.find((option) => option.value === value);
              return (
                <Badge key={value} variant="warning" className="rounded-sm">
                  {option?.label || value}
                  <button
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(value);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(value)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">
                      Remove {option?.label || value}
                    </span>
                  </button>
                </Badge>
              );
            })}
            {selected.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2"
                onClick={() => onChange([])}
              >
                Clear
              </Button>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
