import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React from "react";
import AttributeDetail from "./AttributeDetail";
import {
  Control,
  useFieldArray,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { Plus } from "lucide-react";
import { TProductFormData } from "@/types/ProductFormData";
// import AttributeDetailMultiSelect from "./AttributeDetailMultiSelect";

interface IProps {
  watch: UseFormWatch<TProductFormData>;
  control: Control<TProductFormData, any, TProductFormData>;
  variationIndex: number;
  attributeIndex: number;
  setValue: UseFormSetValue<TProductFormData>;
}

const AttributeDetails = ({
  control,
  variationIndex,
  watch,
  attributeIndex,
}: IProps) => {
  const { append: appendAttributeDetail } = useFieldArray({
    control,
    name: `variants.${variationIndex}.attributes.${attributeIndex}.attributeDetails`,
  });

  const attributeDetails = watch(
    `variants.${variationIndex}.attributes.${attributeIndex}.attributeDetails`
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label>Attribute Details</Label>
        <Button
          type="button"
          onClick={() => appendAttributeDetail({ key: "", value: "" })}
          variant="outline"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Detail
        </Button>
      </div>
      {attributeDetails.map((_, detailIndex) => (
        <AttributeDetail
          key={detailIndex}
          attributeIndex={attributeIndex}
          detailIndex={detailIndex}
          variationIndex={variationIndex}
        />
      ))}
    </div>
  );
};

export default AttributeDetails;
