import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Control,
  Controller,
  useFieldArray,
  useFormContext,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { TProductFormData } from "@/types/ProductFormData";
import AttributeDetails from "./AttributeDetails";
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
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${variationIndex}.attributes`,
  });

  const watchedVariants = watch("variants");

  type AttributeType = {
    key: string;
    label: string;
    options: string[];
    isMultiple?: boolean;
    hasStock?: boolean;
  };
  const SIZE_ATTRIBUTE: AttributeType = {
    key: "size",
    label: "Beden",
    options: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    isMultiple: true,
    hasStock: true,
  };

  const WEIGHT_ATTRIBUTE: AttributeType = {
    key: "weight",
    label: "Ağırlık",
    options: ["100g", "250g", "500g", "1kg", "2kg", "5kg", "10kg"],
    isMultiple: true,
    hasStock: true,
  };

  const getOtherAttributes = (primaryAttribute: string): AttributeType[] => {
    switch (primaryAttribute) {
      case "size":
        return OTHER_ATTRIBUTES.filter((attr) => attr.key === "style");
      case "weight":
        return OTHER_ATTRIBUTES.filter((attr) => attr.key === "weight");

      default:
        return OTHER_ATTRIBUTES;
    }
  };
  const OTHER_ATTRIBUTES: AttributeType[] = [
    {
      key: "style",
      label: "Kesim",
      options: ["Regular", "Slim", "Loose", "Fitted", "Oversized", "Cropped"],
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

  const handleBulkUpdate = (bulkData: BulkUpdateData, variantIndex: number) => {
    const currentAttributes = watchedVariants[variantIndex]?.attributes || [];
    if (currentAttributes.length === 0) return;

    const updatedAttributes = applyBulkUpdates(currentAttributes, bulkData);
    setValue(`variants.${variantIndex}.attributes`, updatedAttributes);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Stok Bilgileri</h3>

        {/* <Button type="button" onClick={addAttribute} variant="dark" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Attribute
        </Button> */}
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
            {/* <BulkUpdateModal
              onBulkUpdate={(bulkData) =>
                handleBulkUpdate(bulkData, variationIndex)
              }
              totalCombinations={currentSelectedAttributes.length}
            /> */}
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
            {fields.map((attribute, attrIndex) => {
              const primaryAttr = attribute.attributeDetails.find(
                (detail) => detail.key === currentPrimaryAttributeType
              );
              const otherAttrs = attribute.attributeDetails.filter(
                (detail) => detail.key !== currentPrimaryAttributeType
              );

              return (
                <Card key={attrIndex} className="p-4 relative">
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
                        render={({ field }) => (
                          <Input
                            {...field}
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
                        Fiyat
                      </Label>
                      <Controller
                        name={`variants.${variationIndex}.attributes.${attrIndex}.price`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
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
                          <Input {...field} className="h-8" />
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
                          <Input {...field} className="h-8" />
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

      {/* {fields.length > 0 && (
        <div className="space-y-4">
          <Label className="text-base font-semibold">Size Attributes</Label>
          <div className="grid gap-4">
            {fields.map((attribute, attrIndex) => {
              const sizeValue = attribute.attributeDetails.find(
                (detail) => detail.key === "size"
              )?.value;
              return (
                <Card key={attrIndex} className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Size</Label>
                      <div className="text-sm text-muted-foreground">
                        {sizeValue}
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor={`stock-${variationIndex}-${attrIndex}`}
                        className="text-sm font-medium"
                      >
                        Stock
                      </Label>
                      <Controller
                        name={`variants.${variationIndex}.attributes.${attrIndex}.stock`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
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
                        Price
                      </Label>
                      <Controller
                        name={`variants.${variationIndex}.attributes.${attrIndex}.price`}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
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
                        SKU
                      </Label>
                      <Controller
                        name={`variants.${variationIndex}.attributes.${attrIndex}.sku`}
                        control={control}
                        render={({ field }) => (
                          <Input {...field} className="h-8" />
                        )}
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )} */}

      {/* {fields.map((attribute, attributeIndex) => (
        <Card key={attributeIndex} className="bg-muted/50">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Attribute {attributeIndex + 1}</h4>
              <Button
                type="button"
                onClick={() => removeAttribute(attributeIndex)}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <AttributeDetails
                  setValue={setValue}
                  attributeIndex={attributeIndex}
                  control={control}
                  variationIndex={variationIndex}
                  watch={watch}
                  key={attributeIndex}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={watch(
                      `variants.${variationIndex}.attributes.${attributeIndex}.stock`
                    )}
                    {...control.register(
                      `variants.${variationIndex}.attributes.${attributeIndex}.stock`,
                      {
                        required: true,
                        valueAsNumber: true,
                      }
                    )}
                    placeholder="Stock"
                  />
                </div>
                <div>
                  <Label>SKU</Label>
                  <Input
                    value={watch(
                      `variants.${variationIndex}.attributes.${attributeIndex}.sku`
                    )}
                    {...control.register(
                      `variants.${variationIndex}.attributes.${attributeIndex}.sku`,
                      {
                        required: true,
                        valueAsNumber: false,
                      }
                    )}
                    placeholder="SKU"
                  />
                </div>
                <div>
                  <Label>Barcode</Label>
                  <Input
                    value={watch(
                      `variants.${variationIndex}.attributes.${attributeIndex}.barcode`
                    )}
                    {...control.register(
                      `variants.${variationIndex}.attributes.${attributeIndex}.barcode`,
                      {
                        required: true,
                        valueAsNumber: false,
                      }
                    )}
                    placeholder="Barcode"
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={watch(
                      `variants.${variationIndex}.attributes.${attributeIndex}.price`
                    )}
                    {...control.register(
                      `variants.${variationIndex}.attributes.${attributeIndex}.price`,
                      {
                        required: true,
                        valueAsNumber: false,
                      }
                    )}
                    placeholder="Price"
                  />
                </div>
                <div>
                  <Label>Discount Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={watch(
                      `variants.${variationIndex}.attributes.${attributeIndex}.discountPrice`
                    )}
                    {...control.register(
                      `variants.${variationIndex}.attributes.${attributeIndex}.discountPrice`,
                      {
                        required: true,
                        valueAsNumber: false,
                      }
                    )}
                    placeholder="Discount Price"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))} */}
    </div>
  );
};

export default Attributes;
