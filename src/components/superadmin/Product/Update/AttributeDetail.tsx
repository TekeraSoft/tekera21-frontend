import { Input } from "@/components/ui/input";
import React from "react";
import {
  Control,
  useFieldArray,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ProductFormData } from ".";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  watch: UseFormWatch<ProductFormData>;
  control: Control<ProductFormData, any, ProductFormData>;
  variationIndex: number;
  attributeIndex: number;
  detailIndex: number;
  setValue: UseFormSetValue<ProductFormData>;
}

const AttributeDetail = ({
  control,
  variationIndex,
  watch,
  attributeIndex,
  detailIndex,
  setValue,
}: IProps) => {
  const { remove: removeAttributeDetail } = useFieldArray({
    control,
    name: `variants.${variationIndex}.attributes.${attributeIndex}.attributeDetails`,
  });

  const detail = watch(
    `variants.${variationIndex}.attributes.${attributeIndex}.attributeDetails.${detailIndex}`
  );

  const attributeOptions = [
    { value: "size", label: "Size" },
    { value: "material", label: "Material" },
    { value: "weight", label: "Weight" },
    { value: "dimensions", label: "Dimensions" },
    { value: "cpu", label: "CPU" },
    { value: "memory", label: "Memory" },
    { value: "storage", label: "Storage" },
    { value: "guarantee", label: "Guarantee" },
    { value: "brand", label: "Brand" },
    { value: "model", label: "Model" },
    { value: "capacity", label: "Capacity" },
    { value: "voltage", label: "Voltage" },
    { value: "power", label: "Power" },
    { value: "connectivity", label: "Connectivity" },
    { value: "compatibility", label: "Compatibility" },
  ];

  const getSelectedKeys = () => {
    const stockAttribute =
      control._formValues?.variants?.[variationIndex]?.attributes?.[
        attributeIndex
      ]?.attributeDetails ?? [];

    // const stockAttributes =
    //   watch(
    //     `variants.${variationIndex}.attributes.${attributeIndex}.stockAttribute`
    //   ) ?? [];

    return stockAttribute.map((attr: any) => attr.key).filter(Boolean);
  };

  const getAvailableOptions = (currentFieldIndex: number) => {
    const selectedKeys = getSelectedKeys();
    const currentFieldKey =
      control._formValues?.variants?.[variationIndex]?.attributes?.[
        attributeIndex
      ]?.stockAttribute?.[currentFieldIndex]?.key;

    return attributeOptions.filter((option) => {
      // Always show the current field's selected option
      if (option.value === currentFieldKey) return true;

      // For color: only show if not already selected in this stock attribute
      // if (option.value === "color") {
      //   return !selectedKeys.includes("color") || currentFieldKey === "color";
      // }
      if (option.value === "size") {
        return !selectedKeys.includes("size") || currentFieldKey === "size";
      }

      // For other attributes: always show (can be selected multiple times)
      return true;
    });
  };
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
            {attributeOptions.map((option) => (
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

export default AttributeDetail;
