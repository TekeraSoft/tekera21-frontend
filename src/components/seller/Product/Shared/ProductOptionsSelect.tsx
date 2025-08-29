import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProductFormData } from "@/types/ProductFormData";
import { IProductOption } from "@/types/SellerTypes/ProductOptions";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  options: IProductOption[];
  variationIndex: number;
  handleAttributeSelectionChange: (
    attributeKey: string,
    values: string | string[],
    variationIndex: number
  ) => void;
}

const ProductOptionsSelect = ({
  options,
  variationIndex,
  handleAttributeSelectionChange,
}: IProps) => {
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<IProductOption | null>(options[0]);

  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TProductFormData>();

  return (
    <div className="w-full overflow-auto">
      <div className="flex items-center justify-center gap-4">
        {options.map((option) => (
          <Button
            onClick={() => setSelectedCategoryOption(option)}
            key={option.id}
            variant={
              selectedCategoryOption?.id === option.id ? "default" : "outline"
            }
          >
            <h3 className="text-lg font-medium">{option.name}</h3>
          </Button>
        ))}
      </div>

      {selectedCategoryOption && (
        <div
          key={selectedCategoryOption.id}
          className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6"
        >
          {Object.entries(selectedCategoryOption.properties).map(
            ([key, value]) => (
              <div key={key}>
                {key}
                <Select
                  onValueChange={(value) =>
                    handleAttributeSelectionChange(key, value, variationIndex)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bir seçenek seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {value.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProductOptionsSelect;
