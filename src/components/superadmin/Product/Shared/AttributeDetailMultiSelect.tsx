import { Input } from "@/components/ui/input";
import React from "react";
import {
  Control,
  useFieldArray,
  useFormContext,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProductFormData } from "@/types/ProductFormData";
import { variantAttributeOptions } from "./Data/AttributeOptions";
import MultiSelectSize from "./MultiSelectSize";

interface IProps {
  variationIndex: number;
  attributeIndex: number;
  detailIndex: number;
}

const AttributeDetailMultiSelect = ({
  variationIndex,
  attributeIndex,
  detailIndex,
}: IProps) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TProductFormData>();

  const { remove: removeAttributeDetail } = useFieldArray({
    control,
    name: `variants.${variationIndex}.attributes.${attributeIndex}.attributeDetails`,
  });

  const detail = watch(
    `variants.${variationIndex}.attributes.${attributeIndex}.attributeDetails.${detailIndex}`
  );

  const getSelectedKeys = () => {
    const stockAttribute =
      control._formValues?.variants?.[variationIndex]?.attributes?.[
        attributeIndex
      ]?.attributeDetails ?? [];

    return stockAttribute.map((attr: any) => attr.key).filter(Boolean);
  };

  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "2xl", label: "2xl" },
    { id: "3xl", label: "3xl" },
    { id: "4xl", label: "4xl" },
    { id: "5xl", label: "5xl" },
  ];

  const watchedVariants = watch("variants");

  return (
    <div className="flex gap-2 mb-2">
      <div className="flex-1">
        <Select
          defaultValue={detail.key}
          onValueChange={(value) =>
            setValue(
              `variants.${variationIndex}.attributes.${attributeIndex}.attributeDetails.${detailIndex}.key`,
              value
            )
          }
        >
          <SelectTrigger className="min-w-32">
            <SelectValue placeholder="Select attribute" />
          </SelectTrigger>
          <SelectContent>
            {variantAttributeOptions.map((option) => (
              <SelectItem
                disabled={getSelectedKeys().includes(option.value)}
                key={option.value}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {getSelectedKeys().includes("size") ? (
        <MultiSelectSize
          value={
            watchedVariants[variationIndex]?.attributes
              ?.map(
                (attr) =>
                  attr.attributeDetails.find((detail) => detail.key === "size")
                    ?.value || ""
              )
              .filter(Boolean) || []
          }
          onChange={(sizes) => {
            // This is handled in MultiSelectSize component
          }}
          variantIndex={variationIndex}
          onAttributesChange={(attributes) => {
            setValue(`variants.${variationIndex}.attributes`, attributes);
          }}
        />
      ) : (
        <Input
          value={detail.value}
          {...control.register(
            `variants.${variationIndex}.attributes.${attributeIndex}.attributeDetails.${detailIndex}.value`,
            {
              required: true,
              valueAsNumber: false,
            }
          )}
          placeholder="Value (e.g., M)"
        />
      )}

      <Button
        type="button"
        onClick={() => removeAttributeDetail(detailIndex)}
        variant="destructive"
        size="sm"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default AttributeDetailMultiSelect;
