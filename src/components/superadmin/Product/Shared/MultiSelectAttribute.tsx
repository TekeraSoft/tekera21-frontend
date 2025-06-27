"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { AttributeType } from "./Types";

interface MultiSelectAttributeProps {
  attribute: AttributeType;
  selectedValues: string[];
  onSelectionChange: (attributeKey: string, values: string[]) => void;
}

export function MultiSelectAttribute({
  attribute,
  selectedValues,
  onSelectionChange,
}: MultiSelectAttributeProps) {
  const [open, setOpen] = useState(false);

  const handleValueToggle = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onSelectionChange(attribute.key, newValues);
  };

  const removeValue = (valueToRemove: string) => {
    const newValues = selectedValues.filter((value) => value !== valueToRemove);
    onSelectionChange(attribute.key, newValues);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{attribute.label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedValues.length > 0
              ? `${
                  selectedValues.length
                } ${attribute.label.toLowerCase()} seçildi`
              : `${attribute.label} seçin`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`${attribute.label} arayın`} />
            <CommandList>
              <CommandEmpty>
                No {attribute.label.toLowerCase()} found.
              </CommandEmpty>
              <CommandGroup>
                {attribute.options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.label}
                    onSelect={() => handleValueToggle(option.label)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(option.label)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((value) => (
            <Badge key={value} variant="outline" className="px-2 py-1">
              {value}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                onClick={() => removeValue(value)}
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
