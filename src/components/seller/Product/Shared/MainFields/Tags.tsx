import { cn } from "@/lib/utils";
import { TProductFormData } from "@/types/ProductFormData";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { genders } from "../Data/Genders";

const Tags = () => {
  const {
    register,
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
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Etiketler</h3>
      {tagFields.map((field, index) => (
        <div
          key={field.id}
          className={cn(
            "flex gap-2",
            genders.includes(field.value) && "hidden"
          )}
        >
          <Input
            {...register(`tags.${index}.value`)}
            placeholder="Bir etiket ekle"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeTag(index)}
            disabled={tagFields.length === 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => appendTag({ value: "" })}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Etiket Ekle
      </Button>
    </div>
  );
};

export default Tags;
