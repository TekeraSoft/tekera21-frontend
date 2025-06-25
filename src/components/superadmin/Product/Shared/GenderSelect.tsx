import ImageView from "@/components/shared/ImageView";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProductFormData } from "@/types/ProductFormData";
import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { genders } from "./Data/Genders";

const GenderSelect = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TProductFormData>();
  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });
  return (
    <div className="space-y-2">
      <Label htmlFor="tags">Gender *</Label>
      <Controller
        control={control}
        rules={{ required: "Cinsiyet seçimi zorunlu" }}
        name={"tags"}
        render={({ field }) => (
          <Select
            defaultValue={
              tagFields.find((field) => genders.includes(field.value))?.value
            }
            onValueChange={(value) => appendTag({ value: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Cinsiyet seçin" />
            </SelectTrigger>
            <SelectContent>
              {genders?.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
};

export default GenderSelect;
