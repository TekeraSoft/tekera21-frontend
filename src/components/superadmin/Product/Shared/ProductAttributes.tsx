import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { attributeOptions } from "./Data/AttributeOptions";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { TProductFormData } from "@/types/ProductFormData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

const ProductAttributes = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<TProductFormData>();
  const { fields: attributeFields, append: appendAttribute } = useFieldArray({
    control,
    name: "attributeDetails",
  });

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">Ürün Öznitelikleri</h3>
      {attributeFields.map((attrField, index) => (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          key={attrField.id}
        >
          <div className="space-y-2 flex-1">
            <Controller
              control={control}
              name={`attributeDetails.${index}.key`}
              rules={{ required: "Lütfen en az bir öznitelik ekleyin." }}
              render={({ field }) => (
                <Select
                  defaultValue={attrField.key}
                  onValueChange={(value) =>
                    setValue(`attributeDetails.${index}.key`, value)
                  }
                >
                  <SelectTrigger className="min-w-32">
                    <SelectValue placeholder="Öznitelik ekle" />
                  </SelectTrigger>
                  <SelectContent>
                    {attributeOptions.map((option) => (
                      <SelectItem
                        //   disabled={getSelectedKeys().includes(option.value)}
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.attributeDetails?.[index]?.key && (
              <p className="text-sm text-red-500">
                {errors.attributeDetails[index].key.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              {...control.register(`attributeDetails.${index}.value`, {
                required: "Öznitelik değeri zorunludur.",
              })}
              placeholder="Öznitelik değeri"
            />

            {errors.attributeDetails?.[index]?.value && (
              <p className="text-sm text-red-500">
                {errors.attributeDetails[index].value.message}
              </p>
            )}
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => appendAttribute({ key: "", value: "" })}
        className="w-full mt-4"
      >
        <Plus className="h-4 w-4 mr-2" />
        Başka Bir Öznitelik Ekle
      </Button>
    </div>
  );
};

export default ProductAttributes;
