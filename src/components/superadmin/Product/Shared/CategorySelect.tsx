import ImageView from "@/components/shared/ImageView";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/types/AdminTypes/category";
import { TProductFormData } from "@/types/ProductFormData";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  categories: ICategory[];
}

const CategorySelect = ({ categories }: IProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TProductFormData>();
  return (
    <div className="space-y-2">
      <Label htmlFor="categoryId">Category ID *</Label>
      <Controller
        control={control}
        rules={{ required: "Kategori seçimi zorunlu" }}
        name={"categoryId"}
        render={({ field }) => (
          <Select
            value={field.value}
            onValueChange={(value) => field.onChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    {category.image && (
                      <ImageView
                        className="h-4 w-4 rounded"
                        imageInfo={{
                          url: category.image,
                          name: category.name,
                        }}
                      />
                    )}
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default CategorySelect;
