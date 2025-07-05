import { Button } from "@/components/ui/button";
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
import ImageLibrary from "./ImageLibrary";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow, TooltipPortal } from "@radix-ui/react-tooltip";
import { ProductAttribute } from "@/types/product";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { colors } from "./Data/Colors";
import ImageView from "@/components/shared/ImageView";

interface IProps {
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
  const [currentVariantIndex, setCurrentVariantIndex] = useState<number | null>(
    null
  );
  // const watchedAttributes = watch(`variants.${variationIndex}.attributes`);

  const [primaryAttributeTypes, setPrimaryAttributeTypes] = useState<
    "size" | "weight"
  >();
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
      let newPrimaryType: "size" | "weight" = "size";

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
          newPrimaryType = detectedType;
        } else {
          newSelectedAttributes[variationIndex] = {};
          newPrimaryType = "size";
        }
      });

      setSelectedAttributes(newSelectedAttributes);
      setPrimaryAttributeTypes(newPrimaryType);
      setIsInitialized(true);
    }
  }, [watchedVariants, isInitialized]);

  const handlePrimaryAttributeTypeChange = (type: "size" | "weight") => {
    setPrimaryAttributeTypes(type);
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

  // const removeAttribute = (variationIndex: number, attributeIndex: number) => {
  //   const currentAttributes = watchedAttributes || [];
  //   const newAttributes = currentAttributes.filter(
  //     (_, index) => index !== attributeIndex
  //   );
  //   setValue(`variants.${variationIndex}.attributes`, newAttributes);
  // };

  const handleBulkUpdate = (bulkData: BulkUpdateData) => {
    watchedVariants.map((variant, variationIndex) => {
      const currentAttributes = variant.attributes || [];
      if (currentAttributes.length === 0) return;
      const updatedAttributes = applyBulkUpdates(currentAttributes, bulkData);
      setValue(`variants.${variationIndex}.attributes`, updatedAttributes, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    });
  };

  const currentPrimaryAttributeType = primaryAttributeTypes || "size";
  const currentPrimaryAttribute =
    currentPrimaryAttributeType === "size" ? SIZE_ATTRIBUTE : WEIGHT_ATTRIBUTE;

  const getCurrentSelectedAttributes = (variationIndex?: number) => {
    return selectedAttributes[variationIndex || 0] || {};
  };

  const getIsDisabled = (variantIndex: number) => {
    return (
      !!stockAttributeImages[variantIndex]?.length ||
      !!watchedVariants[variantIndex].images.length
    );
  };

  const handleSetImages = (images: File[], variantIndex: number) => {
    setStockAttributeImages((prev) => {
      const newState = {
        ...prev,
        [`${variantIndex}`]: images,
      };

      return newState;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Stok Bilgileri</h3>
      </div>

      {!!!watchedVariants.length && (
        <AttributeTypeSelector
          selectedType={currentPrimaryAttributeType}
          onTypeChange={(type) => handlePrimaryAttributeTypeChange(type)}
        />
      )}

      <div className="space-y-4">
        <Separator />
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">
            Oluşturulan Özellikler (
            {watchedVariants.reduce((total, variant) => {
              let attrLength = 0;
              attrLength += variant.attributes.length;
              return total + attrLength;
            }, 0)}
            ){/* Oluşturulan Özellikler ({watchedAttributes.length}) */}
          </Label>
          <BulkUpdateModal
            onBulkUpdate={(bulkData) => handleBulkUpdate(bulkData)}
            totalCombinations={watchedVariants.reduce((total, variant) => {
              let attrLength = 0;
              attrLength += variant.attributes.length;
              return total + attrLength;
            }, 0)}
          />
          {/* <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedAttributes({});
              setValue(`variants.${variationIndex}.attributes`, []);
            }}
          >
            Tümünü temizle
          </Button> */}
        </div>

        {watchedVariants.map((_, variationIndex) => {
          return (
            <div key={variationIndex} className="flex">
              <table className="text-sm text-left text-gray-700 max-w-36">
                <thead className="bg-gray-100">
                  <tr className="h-14">
                    <th className="px-4 py-2 font-medium">Görsel</th>
                    <th className="px-4 py-2 font-medium">Özellikler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="py-2">
                      <Dialog
                        open={showMediaLibrary}
                        onOpenChange={setShowMediaLibrary}
                      >
                        <DialogTrigger
                          asChild
                          onClick={() => setCurrentVariantIndex(variationIndex)}
                        >
                          <div className="flex items-center justify-center gap-2 cursor-pointer">
                            {watchedVariants[variationIndex].images.length ? (
                              <div className="relative">
                                <ImageView
                                  imageInfo={{
                                    name: watchedVariants[variationIndex]
                                      .modelCode,
                                    url: watchedVariants[variationIndex]
                                      .images[0],
                                  }}
                                  className="w-20 h-20 border rounded-md"
                                />
                                <div className="w-20 h-20 opacity-0 hover:opacity-100 flex justify-center items-center bg-white/50 absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity">
                                  <Camera className="w-9 h-9" />
                                </div>
                              </div>
                            ) : stockAttributeImages[variationIndex]?.length ? (
                              <div className="relative group">
                                <img
                                  src={URL.createObjectURL(
                                    stockAttributeImages[variationIndex][0]
                                  )}
                                  alt={`Stock ${variationIndex} 
                                  }`}
                                  className="w-20 h-20 object-cover rounded border"
                                />
                                <div className="w-20 h-20 opacity-0 hover:opacity-100 flex justify-center items-center bg-white/50 absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity">
                                  <Camera className="w-9 h-9" />
                                </div>
                              </div>
                            ) : (
                              <Camera className="h-20 w-20 hover:text-secondary transition-colors" />
                            )}
                          </div>
                        </DialogTrigger>
                        {currentVariantIndex === variationIndex && (
                          <ImageLibrary
                            setShowMediaLibrary={setShowMediaLibrary}
                            showMediaLibrary={showMediaLibrary}
                            handleDeleteImages={handleDeleteImages}
                            watch={watch}
                            imageName={`${
                              watch("variants")[currentVariantIndex].modelCode
                            }_${
                              watch(`variants.${currentVariantIndex}.color`) ||
                              "default"
                            }.webp`}
                            variationIndex={currentVariantIndex}
                            images={stockAttributeImages}
                            onImagesChange={(images) => {
                              handleSetImages(images, currentVariantIndex);
                            }}
                          />
                        )}
                      </Dialog>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center">
                          <Label
                            className="mr-1"
                            htmlFor={`variantColor-${variationIndex}`}
                          >
                            Renk:
                          </Label>

                          {(() => {
                            const colorObj = colors.find(
                              (color) =>
                                color.name ===
                                watchedVariants[variationIndex].color
                            );
                            return colorObj ? (
                              <span
                                style={{
                                  display: "inline-block",
                                  width: 16,
                                  height: 16,
                                  backgroundColor: colorObj.hex,
                                  borderRadius: "50%",
                                  marginLeft: 4,
                                  verticalAlign: "middle",
                                  border: "1px solid #ccc",
                                }}
                                title={colorObj.name}
                              ></span>
                            ) : null;
                          })()}
                        </div>
                        <div>
                          <Label htmlFor={`modelName-${variationIndex}`}>
                            Model Adı
                          </Label>
                          <Input
                            id={`modelName-${variationIndex}`}
                            value={watchedVariants[variationIndex].modelName}
                            {...control.register(
                              `variants.${variationIndex}.modelName`,
                              {
                                required: "Model adı zorunludur.",
                                valueAsNumber: false,
                              }
                            )}
                            placeholder="Model adını girin"
                          />
                          {errors.variants?.[variationIndex]?.modelName && (
                            <p className="text-sm text-red-500">
                              {
                                errors.variants[variationIndex].modelName
                                  .message
                              }
                            </p>
                          )}
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div>
                                <Label htmlFor={`modelCode-${variationIndex}`}>
                                  Model Kodu
                                </Label>
                                <Input
                                  disabled={getIsDisabled(variationIndex)}
                                  id={`modelCode-${variationIndex}`}
                                  value={
                                    watchedVariants[variationIndex].modelCode
                                  }
                                  {...control.register(
                                    `variants.${variationIndex}.modelCode`,
                                    {
                                      required: "Model kodu zorunludur.",
                                      valueAsNumber: false,
                                    }
                                  )}
                                  placeholder="Model kodunu girin"
                                />
                                {errors.variants?.[variationIndex]
                                  ?.modelCode && (
                                  <p className="text-sm text-red-500">
                                    {
                                      errors.variants[variationIndex].modelCode
                                        .message
                                    }
                                  </p>
                                )}
                              </div>
                            </TooltipTrigger>
                            {getIsDisabled(variationIndex) && (
                              <TooltipPortal>
                                <TooltipContent
                                  className="TooltipContent"
                                  sideOffset={5}
                                >
                                  <Button variant={"info"}>
                                    Bu alan, varyasyon görselleri yüklendiği
                                    için düzenlenemez. Tüm görselleri silip
                                    güncelleyebilirsiniz.
                                  </Button>
                                  <TooltipArrow className="TooltipArrow" />
                                </TooltipContent>
                              </TooltipPortal>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                        <div className="space-y-4">
                          <MultiSelectAttribute
                            attribute={currentPrimaryAttribute}
                            selectedValues={
                              (getCurrentSelectedAttributes(variationIndex)[
                                currentPrimaryAttribute.key
                              ] as string[]) || []
                            }
                            onSelectionChange={(key, values) =>
                              handleAttributeSelectionChange(
                                key,
                                values,
                                variationIndex
                              )
                            }
                          />
                        </div>
                        {!!getOtherAttributes(currentPrimaryAttribute.key)
                          .length && (
                          <div className="space-y-4">
                            {getOtherAttributes(
                              currentPrimaryAttribute.key
                            ).map((attributeType) => (
                              <SingleSelectAttribute
                                key={attributeType.key}
                                attribute={attributeType}
                                selectedValue={
                                  (getCurrentSelectedAttributes(variationIndex)[
                                    attributeType.key
                                  ] as string) || ""
                                }
                                onSelectionChange={(key, value) =>
                                  handleAttributeSelectionChange(
                                    key,
                                    value,
                                    variationIndex
                                  )
                                }
                              />
                            ))}
                          </div>
                        )}
                      </div>
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

                    <th className="px-4 py-2 font-medium">Stok Adeti</th>
                    <th className="px-4 py-2 font-medium">Fiyat</th>
                    <th className="px-4 py-2 font-medium">İndirimli Fiyat</th>
                    <th className="px-4 py-2 font-medium">Stok Kodu</th>
                    <th className="px-4 py-2 font-medium">Barkod</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {watchedVariants[variationIndex].attributes?.map(
                    (field, attrIndex) => {
                      const attribute =
                        watchedVariants[variationIndex].attributes?.[attrIndex];
                      const primaryAttr = attribute?.attributeDetails?.find(
                        (detail) => detail.key === currentPrimaryAttributeType
                      );

                      return (
                        <tr key={attrIndex} className="hover:bg-gray-50">
                          <td className="px-4 py-2">
                            {primaryAttr?.value || "N/A"}
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
                    }
                  )}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Attributes;
