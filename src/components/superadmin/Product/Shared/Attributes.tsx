import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { SetStateAction, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

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
import { Camera, X } from "lucide-react";
import { sizes } from "./Data/Sizes";
import { weightOptions } from "./Data/WeightOptions";
import { styleOptions } from "./Data/StyleOptions";
import VariantImageUpload from "./VariantImageUpload";
import ImageLibrary from "./ImageLibrary";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow, TooltipPortal } from "@radix-ui/react-tooltip";

interface IProps {
  variationIndex: number;
  selectedAttributes: Record<number, Record<string, string | string[]>>;
  setSelectedAttributes: React.Dispatch<
    SetStateAction<Record<number, Record<string, string | string[]>>>
  >;
  stockAttributeImages: {
    [key: string]: File[];
  };
  setStockAttributeImages: React.Dispatch<
    React.SetStateAction<{
      [key: string]: File[];
    }>
  >;
  handleDeleteImages:
    | ((url: string, variationIndex: number) => void)
    | undefined;
}

const Attributes = ({
  variationIndex,
  selectedAttributes,
  setSelectedAttributes,
  stockAttributeImages,
  setStockAttributeImages,
  handleDeleteImages,
}: IProps) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TProductFormData>();

  const watchedVariants = watch("variants");
  const watchedAttributes = watch(`variants.${variationIndex}.attributes`);

  const [primaryAttributeTypes, setPrimaryAttributeTypes] = useState<
    Record<number, "size" | "weight">
  >({});
  const [isInitialized, setIsInitialized] = useState(false);

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

  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

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

  useEffect(() => {
    if (watchedVariants && !isInitialized) {
      const newSelectedAttributes: Record<
        number,
        Record<string, string | string[]>
      > = {};
      const newPrimaryTypes: Record<number, "size" | "weight"> = {};

      watchedVariants.forEach((variant, variationIndex) => {
        if (variant.attributes && variant.attributes.length > 0) {
          // Parse existing attributes back to selectedAttributes
          const parsedAttributes = parseAttributesFromCombinations(
            variant.attributes,
            ["size", "weight"]
          );
          newSelectedAttributes[variationIndex] = parsedAttributes;

          // Detect primary attribute type
          const detectedType = detectPrimaryAttributeType(variant.attributes);
          newPrimaryTypes[variationIndex] = detectedType;
        } else {
          newSelectedAttributes[variationIndex] = {};
          newPrimaryTypes[variationIndex] = "size";
        }
      });

      setSelectedAttributes(newSelectedAttributes);
      setPrimaryAttributeTypes(newPrimaryTypes);
      setIsInitialized(true);
    }
  }, [watchedVariants, isInitialized]);

  const handlePrimaryAttributeTypeChange = (
    type: "size" | "weight",
    variationIndex: number
  ) => {
    setPrimaryAttributeTypes((prev) => ({
      ...prev,
      [variationIndex]: type,
    }));

    // Clear previous selections when switching
    const newSelectedAttributes = { ...selectedAttributes };
    if (!newSelectedAttributes[variationIndex]) {
      newSelectedAttributes[variationIndex] = {};
    }
    delete newSelectedAttributes[variationIndex].size;
    delete newSelectedAttributes[variationIndex].weight;
    delete newSelectedAttributes[variationIndex].style;
    setSelectedAttributes(newSelectedAttributes);
    setValue(`variants.${variationIndex}.attributes`, []);
  };

  const handleAttributeSelectionChange = (
    attributeKey: string,
    values: string | string[],
    variationIndex: number
  ) => {
    const newSelectedAttributes = {
      ...selectedAttributes,
      [variationIndex]: {
        ...selectedAttributes[variationIndex],
        [attributeKey]: values,
      },
    };
    setSelectedAttributes(newSelectedAttributes);

    // Convert single values to arrays for combination generation
    const attributesForCombination: Record<string, string[]> = {};
    Object.entries(newSelectedAttributes[variationIndex] || {}).forEach(
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

    setValue(`variants.${variationIndex}.attributes`, newAttributes);
  };

  const removeAttribute = (variationIndex: number, attributeIndex: number) => {
    const currentAttributes = watchedAttributes || [];
    const newAttributes = currentAttributes.filter(
      (_, index) => index !== attributeIndex
    );
    setValue(`variants.${variationIndex}.attributes`, newAttributes);
  };

  const handleBulkUpdate = (bulkData: BulkUpdateData) => {
    const currentAttributes = watchedAttributes || [];
    if (currentAttributes.length === 0) return;

    const updatedAttributes = applyBulkUpdates(currentAttributes, bulkData);
    setValue(`variants.${variationIndex}.attributes`, updatedAttributes, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const currentPrimaryAttributeType =
    primaryAttributeTypes[variationIndex] || "size";
  const currentPrimaryAttribute =
    currentPrimaryAttributeType === "size" ? SIZE_ATTRIBUTE : WEIGHT_ATTRIBUTE;
  const currentSelectedAttributes = selectedAttributes[variationIndex] || {};

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

      {watchedAttributes.length > 0 && (
        <div className="space-y-4">
          <Separator />
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">
              Oluşturulan Özellikler ({watchedAttributes.length})
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

          <div className="flex">
            <table className="text-sm text-left text-gray-700 min-w-max">
              <thead className="bg-gray-100">
                <tr className="h-14">
                  <th className="px-4 py-2 font-medium">Görsel</th>
                  <th className="px-4 py-2 font-medium">Özellikler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {watch(`variants.${variationIndex}.color`) &&
                    watch(`variants.${variationIndex}.modelCode`) ? (
                      <ImageLibrary
                        setShowMediaLibrary={setShowMediaLibrary}
                        showMediaLibrary={showMediaLibrary}
                        handleDeleteImages={handleDeleteImages}
                        watch={watch}
                        imageName={`${
                          watch("variants")[variationIndex].modelCode
                        }_${
                          watch(`variants.${variationIndex}.color`) || "default"
                        }.webp`}
                        variationIndex={variationIndex}
                        images={stockAttributeImages[`${variationIndex}`] || []}
                        onImagesChange={(images) =>
                          setStockAttributeImages((prev) => ({
                            ...prev,
                            [`${variationIndex}`]: images,
                          }))
                        }
                      />
                    ) : (
                      <div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Camera />
                              </div>
                            </TooltipTrigger>

                            <TooltipPortal>
                              <TooltipContent
                                className="TooltipContent"
                                sideOffset={5}
                              >
                                <Button variant={"info"}>
                                  Bu alan, varyasyon görselleri yüklendiği için
                                  düzenlenemez. Tüm görselleri silip
                                  güncelleyebilirsiniz.
                                </Button>
                                <TooltipArrow className="TooltipArrow" />
                              </TooltipContent>
                            </TooltipPortal>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {watchedVariants[variationIndex].color}
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="text-sm text-left text-gray-700">
              <thead className="bg-gray-100">
                <tr className="h-14">
                  <th className="px-4 py-2 font-medium">
                    {currentPrimaryAttributeType === "size"
                      ? "Beden"
                      : "Ağırlık"}
                  </th>
                  <th className="px-4 py-2 font-medium">Diğer Özellikler</th>
                  <th className="px-4 py-2 font-medium">Stok Adeti</th>
                  <th className="px-4 py-2 font-medium">Fiyat</th>
                  <th className="px-4 py-2 font-medium">İndirimli Fiyat</th>
                  <th className="px-4 py-2 font-medium">Stok Kodu</th>
                  <th className="px-4 py-2 font-medium">Barkod</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {watchedAttributes?.map((field, attrIndex) => {
                  const attribute = watchedAttributes?.[attrIndex];
                  const primaryAttr = attribute?.attributeDetails?.find(
                    (detail) => detail.key === currentPrimaryAttributeType
                  );
                  const otherAttrs = attribute?.attributeDetails?.filter(
                    (detail) => detail.key !== currentPrimaryAttributeType
                  );

                  return (
                    <tr key={attrIndex} className="hover:bg-gray-50">
                      <td className="px-4 py-2">
                        {primaryAttr?.value || "N/A"}
                      </td>

                      <td className="px-4 py-2">
                        {otherAttrs?.length > 0
                          ? otherAttrs
                              .map((attr) => `${attr.key}: ${attr.value}`)
                              .join(", ")
                          : "Yok"}
                      </td>

                      <td className="px-4 py-2">
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
                      </td>
                      <td className="px-4 py-2">
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
                      </td>
                      <td className="px-4 py-2">
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
                      </td>
                      <td className="px-4 py-2">
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
                      </td>
                      <td className="px-4 py-2">
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* <div className="grid gap-4">
            {watchedAttributes?.map((field, attrIndex) => {
              const attribute = watchedAttributes?.[attrIndex];
              const primaryAttr = attribute?.attributeDetails?.find(
                (detail) => detail.key === currentPrimaryAttributeType
              );
              const otherAttrs = attribute?.attributeDetails?.filter(
                (detail) => detail.key !== currentPrimaryAttributeType
              );

              return (
               
                <div key={attrIndex} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                    onClick={() => removeAttribute(variationIndex, attrIndex)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-8 gap-4 pr-10">
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
                    </div>

                    <div>
                      <Label className="text-sm font-medium">
                        Diğer Özellikler
                      </Label>
                      <div className="text-sm text-muted-foreground">
                        {otherAttrs?.length > 0
                          ? otherAttrs
                              .map((attr) => `${attr.key}: ${attr.value}`)
                              .join(", ")
                          : "Yok"}
                      </div>
                    </div>

                    <div>
                      <Label
                      
                    </div>
                    <div>
                      <Label
                        htmlFor={`barcode-${variationIndex}-${attrIndex}`}
                        className="text-sm font-medium"
                      >
                        Barkod
                      </Label>
                      
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Attributes;
