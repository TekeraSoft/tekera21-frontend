"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AttributeTypeSelectorProps {
  selectedType: "size" | "weight";
  onTypeChange: (type: "size" | "weight") => void;
}

export function AttributeTypeSelector({
  selectedType,
  onTypeChange,
}: AttributeTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-base font-semibold">Birincil Özellik (stok ve barkod bilgisi için)</Label>
      <RadioGroup
        value={selectedType}
        onValueChange={onTypeChange}
        className="flex gap-6 cursor-pointer mt-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="size" id="size" />
          <Label htmlFor="size">Beden Temelli</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="weight" id="weight" />
          <Label htmlFor="weight">Ağırlık Temelli</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
