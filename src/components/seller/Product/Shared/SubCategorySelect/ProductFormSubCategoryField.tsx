"use client";

import type React from "react";
import { useFormContext, type Control } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ISubCategory } from "@/types/AdminTypes/category";
import { SubCategoryTreeSelect } from "./SubCategoryTreeSelect";

interface ProductFormSubCategoryFieldProps {
  control: Control<any>;
  name: string;
  categories: ISubCategory[];
  label?: string;
}

export const ProductFormSubCategoryField: React.FC<
  ProductFormSubCategoryFieldProps
> = ({ name, categories, label = "Alt Kategoriler" }) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <SubCategoryTreeSelect
            categories={categories}
            selectedValues={field.value || []}
            onSelectionChange={field.onChange}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
