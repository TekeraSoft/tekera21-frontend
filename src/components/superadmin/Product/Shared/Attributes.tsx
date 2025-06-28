import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { IAttribute, TProductFormData } from "@/types/ProductFormData";
import { AttributeTypeSelector } from "./AttributeTypeSelector";
import {
  applyBulkUpdates,
  detectPrimaryAttributeType,
  generateAttributeCombinations,
  parseAttributesFromCombinations,
} from "./utils";
import { MultiSelectAttribute } from "./MultiSelectAttribute";
import { Separator } from "@/components/ui/separator";
import { SingleSelectAttribute } from "./SingleSelectAttribute";
import { BulkUpdateData, BulkUpdateModal } from "./BulkUpdateModal";
import { X } from "lucide-react";
import { sizes } from "./Data/Sizes";
import { weightOptions } from "./Data/WeightOptions";
import { styleOptions } from "./Data/StyleOptions";

interface IProps {
  variationIndex: number;
}

const Attributes = ({ variationIndex }: IProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TProductFormData>();
  const { fields } = useFieldArray({
    control,
    name: `variants.${variationIndex}.attributes`,
  });

  const watchedVariants = watch("variants");
  const watchedAttributes = useWatch({
    control,
    name: `variants.${variationIndex}.attributes`,
  });

  const SIZE_ATTRIBUTE: IAttribute = {
    key: "size",
    label: "Beden",
    options: sizes,
    isMultiple: true,
    hasStock: true,
  };

  const WEIGHT_ATTRIBUTE: IAttribute = {
    key: "weight",
    label: "Ağırlık",
    options: weightOptions,
    isMultiple: true,
    hasStock: true,
  };

  const getOtherAttributes = (primaryAttribute: string): IAttribute[] => {
    switch (primaryAttribute) {
      case "size":
        return OTHER_ATTRIBUTES.filter((attr) => attr.key === "style");
      case "weight":
        return OTHER_ATTRIBUTES.filter((attr) => attr.key === "weight");

      default:
        return OTHER_ATTRIBUTES;
    }
  };
  const OTHER_ATTRIBUTES: IAttribute[] = [
    {
      key: "style",
      label: "Kesim",
      options: styleOptions,
      isMultiple: false,
      hasStock: false,
    },
  ];
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<number, Record<string, string | string[]>>
  >({});
  const [primaryAttributeTypes, setPrimaryAttributeTypes] = useState<
    Record<number, "size" | "weight">
  >({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (watchedVariants && !isInitialized) {
      const newSelectedAttributes: Record<
        number,
        Record<string, string | string[]>
      > = {};
      const newPrimaryTypes: Record<number, "size" | "weight"> = {};

      watchedVariants.forEach((variant, variantIndex) => {
        if (variant.attributes && variant.attributes.length > 0) {
          // Parse existing attributes back to selectedAttributes
          const parsedAttributes = parseAttributesFromCombinations(
            variant.attributes,
            ["size", "weight"]
          );
          newSelectedAttributes[variantIndex] = parsedAttributes;

          // Detect primary attribute type
          const detectedType = detectPrimaryAttributeType(variant.attributes);
          newPrimaryTypes[variantIndex] = detectedType;
        } else {
          newSelectedAttributes[variantIndex] = {};
          newPrimaryTypes[variantIndex] = "size";
        }
      });

      setSelectedAttributes(newSelectedAttributes);
      setPrimaryAttributeTypes(newPrimaryTypes);
      setIsInitialized(true);
    }
  }, [watchedVariants, isInitialized]);

  const handlePrimaryAttributeTypeChange = (
    type: "size" | "weight",
    variantIndex: number
  ) => {
    setPrimaryAttributeTypes((prev) => ({
      ...prev,
      [variantIndex]: type,
    }));

    // Clear previous selections when switching
    const newSelectedAttributes = { ...selectedAttributes };
    if (!newSelectedAttributes[variantIndex]) {
      newSelectedAttributes[variantIndex] = {};
    }
    delete newSelectedAttributes[variantIndex].size;
    delete newSelectedAttributes[variantIndex].weight;
    delete newSelectedAttributes[variantIndex].style;
    setSelectedAttributes(newSelectedAttributes);
    setValue(`variants.${variantIndex}.attributes`, []);
  };

  const handleAttributeSelectionChange = (
    attributeKey: string,
    values: string | string[],
    variantIndex: number
  ) => {
    const newSelectedAttributes = {
      ...selectedAttributes,
      [variantIndex]: {
        ...selectedAttributes[variantIndex],
        [attributeKey]: values,
      },
    };
    setSelectedAttributes(newSelectedAttributes);

    // Convert single values to arrays for combination generation
    const attributesForCombination: Record<string, string[]> = {};
    Object.entries(newSelectedAttributes[variantIndex] || {}).forEach(
      ([key, value]) => {
        if (Array.isArray(value)) {
          attributesForCombination[key] = value;
        } else if (value) {
          attributesForCombination[key] = [value];
        }
      }
    );

    // Generate new attribute combinations
    const newAttributes = generateAttributeCombinations(
      attributesForCombination
    );
    setValue(`variants.${variantIndex}.attributes`, newAttributes);
  };

  const removeAttribute = (variationIndex: number, attributeIndex: number) => {
    const currentAttributes = fields || [];
    const newAttributes = currentAttributes.filter(
      (_, index) => index !== attributeIndex
    );
    setValue(`variants.${variationIndex}.attributes`, newAttributes);
  };

  const currentPrimaryAttributeType =
    primaryAttributeTypes[variationIndex] || "size";
  const currentPrimaryAttribute =
    currentPrimaryAttributeType === "size" ? SIZE_ATTRIBUTE : WEIGHT_ATTRIBUTE;
  const currentSelectedAttributes = selectedAttributes[variationIndex] || {};

  const handleBulkUpdate = (bulkData: BulkUpdateData) => {
    const currentAttributes = watchedAttributes || [];
    if (currentAttributes.length === 0) return;

    const updatedAttributes = applyBulkUpdates(currentAttributes, bulkData);
    setValue(`variants.${variationIndex}.attributes`, updatedAttributes);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Stok Bilgileri</h3>
      </div>

      <AttributeTypeSelector
        selectedType={currentPrimaryAttributeType}
        onTypeChange={(type) =>
          handlePrimaryAttributeTypeChange(type, variationIndex)
        }
      />

      <div className="space-y-4">
        <Label className="text-base font-semibold">
          {currentPrimaryAttributeType === "size"
            ? "Beden Seçimi"
            : "Ağırlık Seçimi"}
        </Label>
        <MultiSelectAttribute
          attribute={currentPrimaryAttribute}
          selectedValues={
            (currentSelectedAttributes[
              currentPrimaryAttribute.key
            ] as string[]) || []
          }
          onSelectionChange={(key, values) =>
            handleAttributeSelectionChange(key, values, variationIndex)
          }
        />
      </div>

      <Separator />

      {!!getOtherAttributes(currentPrimaryAttribute.key).length && (
        <div className="space-y-4">
          <Label className="text-base font-semibold">Diğer Özellikler</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {getOtherAttributes(currentPrimaryAttribute.key).map(
              (attributeType) => (
                <SingleSelectAttribute
                  key={attributeType.key}
                  attribute={attributeType}
                  selectedValue={
                    (currentSelectedAttributes[attributeType.key] as string) ||
                    ""
                  }
                  onSelectionChange={(key, value) =>
                    handleAttributeSelectionChange(key, value, variationIndex)
                  }
                />
              )
            )}
          </div>
        </div>
      )}

      {fields.length > 0 && (
        <div className="space-y-4">
          <Separator />
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">
              Oluşturulan Özellikler ({fields.length})
            </Label>
            <BulkUpdateModal
              onBulkUpdate={(bulkData) => handleBulkUpdate(bulkData)}
              totalCombinations={watchedAttributes.length}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedAttributes({});
                setValue(`variants.${variationIndex}.attributes`, []);
              }}
            >
              Tümünü temizle
            </Button>
          </div>

          <div className="grid gap-4">
            {fields.map((field, attrIndex) => {
              const attribute = watchedAttributes?.[attrIndex];
              const primaryAttr = attribute.attributeDetails.find(
                (detail) => detail.key === currentPrimaryAttributeType
              );
              const otherAttrs = attribute.attributeDetails.filter(
                (detail) => detail.key !== currentPrimaryAttributeType
              );

              return (
                <Card key={field.id} className="p-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                    onClick={() => removeAttribute(variationIndex, attrIndex)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 pr-10">
                    <div className="flex flex-col gap-y-1">
                      <div>
                        <Label className="text-sm font-medium">
                          {currentPrimaryAttributeType === "size"
                            ? "Size"
                            : "Weight"}
                        </Label>
                        <div className="text-sm font-semibold text-blue-600">
                          {primaryAttr?.value || "N/A"}
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Diğer Özellikler
                        </Label>
                        <div className="text-sm text-muted-foreground">
                          {otherAttrs.length > 0
                            ? otherAttrs
                                .map((attr) => `${attr.key}: ${attr.value}`)
                                .join(", ")
                            : "Yok"}
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor={`stock-${variationIndex}-${attrIndex}`}
                        className="text-sm font-medium"
                      >
                        Stok Adeti
                      </Label>
                      <Controller
                        name={`variants.${variationIndex}.attributes.${attrIndex}.stock`}
                        control={control}
                        render={({ field }) => {
                          return (
                            <Input
                              {...field}
                              value={field.value ?? ""}
                              type="number"
                              className="h-8"
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          );
                        }}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`price-${variationIndex}-${attrIndex}`}
                        className="text-sm font-medium"
                      >
                        Fiyat
                      </Label>
                      <Controller
                        name={`variants.${variationIndex}.attributes.${attrIndex}.price`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            type="number"
                            className="h-8"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`price-${variationIndex}-${attrIndex}`}
                        className="text-sm font-medium"
                      >
                        İndirimli fiyatı
                      </Label>
                      <Controller
                        name={`variants.${variationIndex}.attributes.${attrIndex}.discountPrice`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            type="number"
                            className="h-8"
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`sku-${variationIndex}-${attrIndex}`}
                        className="text-sm font-medium"
                      >
                        Stok Kodu
                      </Label>
                      <Controller
                        name={`variants.${variationIndex}.attributes.${attrIndex}.sku`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            className="h-8"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`barcode-${variationIndex}-${attrIndex}`}
                        className="text-sm font-medium"
                      >
                        Barkod
                      </Label>
                      <Controller
                        name={`variants.${variationIndex}.attributes.${attrIndex}.barcode`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            value={field.value ?? ""}
                            className="h-8"
                          />
                        )}
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Attributes;
