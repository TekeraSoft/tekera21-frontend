"use client";
import { type Control, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { MultiSelect, OptionType } from "../../MultiSelect";

interface SubCategoriesSelectProps {
  control: Control<any>;
  name: string;
  label: string;
  subCategories: { id: string; name: string; image?: string }[];
  required?: boolean;
}

export function SubCategoriesSelect({
  control,
  name,
  label,
  subCategories,
  required = false,
}: SubCategoriesSelectProps) {
  // Convert subcategories to option format

  const options: OptionType[] = subCategories.map((subCategory) => ({
    value: subCategory.id,
    label: subCategory.name,
    image: subCategory.image,
  }));

  console.log("options in subcategoryis", options)

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && "*"}
      </Label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <MultiSelect
            options={options}
            selected={field.value || []}
            onChange={field.onChange}
            placeholder="Select subcategories"
            emptyMessage="No subcategories found."
          />
        )}
      />
    </div>
  );
}
