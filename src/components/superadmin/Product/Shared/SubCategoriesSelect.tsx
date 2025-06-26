"use client";
import { type Control, Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { MultiSelect, OptionType } from "../Update/MultiSelect";
import { TProductFormData } from "@/types/ProductFormData";

interface SubCategoriesSelectProps {
  name: keyof TProductFormData;
  label: string;
  subCategories: { id: string; name: string; image?: string }[];
  required?: boolean;
}

export function SubCategoriesSelect({
  name,
  label,
  subCategories,
  required = false,
}: SubCategoriesSelectProps) {
  // Convert subcategories to option format
  const {
    control,
    formState: { errors },
  } = useFormContext<TProductFormData>();
  const options: OptionType[] = subCategories.map((subCategory) => ({
    value: subCategory.id,
    label: subCategory.name,
    image: subCategory.image,
  }));

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && "*"}
      </Label>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Alt Kategori seçimi zorunlu" }}
        render={({ field }) => (
          <MultiSelect
            options={options}
            selected={
              Array.isArray(field.value)
                ? field.value.map((item) =>
                    typeof item === "string"
                      ? { value: item }
                      : "value" in item
                      ? item
                      : "id" in item && item.id
                      ? { value: item.id }
                      : { value: "" }
                  )
                : typeof field.value === "string"
                ? [{ value: field.value }]
                : []
            }
            onChange={field.onChange}
            placeholder="Alt Kategori seçin"
            emptyMessage="Alt kategori bulunamadı."
          />
        )}
      />
      {errors.subCategories && (
        <p className="text-sm text-red-500">{errors.subCategories.message}</p>
      )}
    </div>
  );
}
