import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { attributeOptions } from "./Data/AttributeOptions";
import { useFieldArray, useFormContext } from "react-hook-form";
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
  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributeDetails",
  });

  return (
    <div>
      {attributeFields.map((attrField, index) => (
        <div className="flex gap-2 items-center" key={attrField.id}>
          <Select
            defaultValue={attrField.key}
            onValueChange={(value) =>
              setValue(`attributeDetails.${index}.key`, value)
            }
          >
            <SelectTrigger className="min-w-32">
              <SelectValue placeholder="Select attribute" />
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
          <Input
            {...control.register(`attributeDetails.${index}.value`)}
            placeholder="Attribute value"
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => appendAttribute({ key: "", value: "" })}
        className="w-full mt-4"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Attribute
      </Button>
    </div>
  );
};

export default ProductAttributes;
