"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { AttributeType } from "./Types";

interface SingleSelectAttributeProps {
  attribute: AttributeType;
  selectedValue: string;
  onSelectionChange: (attributeKey: string, value: string) => void;
}

export function SingleSelectAttribute({
  attribute,
  selectedValue,
  onSelectionChange,
}: SingleSelectAttributeProps) {
  const [open, setOpen] = useState(false);

  const handleValueSelect = (value: string) => {
    onSelectionChange(attribute.key, value);
    setOpen(false);
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
            {selectedValue || `${attribute.label} bilgisi seçin`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder={`${attribute.label} bilgisi ara`}
            />
            <CommandList>
              <CommandEmpty>
                No {attribute.label.toLowerCase()} found.
              </CommandEmpty>
              <CommandGroup>
                {attribute.options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleValueSelect(option)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === option ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
