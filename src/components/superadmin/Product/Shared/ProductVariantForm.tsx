"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import VariantImageUpload from "./VariantImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Attributes from "./Attributes";
import { TProductFormData } from "@/types/ProductFormData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow, TooltipPortal } from "@radix-ui/react-tooltip";
import React, { useState } from "react";
import { colors } from "./Data/Colors";

interface IProps {
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

export default function ProductVariantForm({
  stockAttributeImages,
  setStockAttributeImages,
  handleDeleteImages,
}: IProps) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TProductFormData>();
  const watchedVariants = watch("variants");

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<number, Record<string, string | string[]>>
  >({});

  const {
    append: appendVariation,
    remove: removeVariation,
    fields,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const reindexStockAttributeImages = (
    prevImages: { [key: string]: File[] },
    removedIndex: number
  ) => {
    const newImages: { [key: string]: File[] } = {};

    Object.keys(prevImages).forEach((key) => {
      const index = Number(key);

      if (index < removedIndex) {
        newImages[index] = prevImages[key];
      } else if (index > removedIndex) {
        newImages[index - 1] = prevImages[key]; // Silinen indexten sonrakileri bir kaydır
      }
      // Eğer index === removedIndex ise, o zaten siliniyor
    });

    return newImages;
  };

  const addVariant = () => {
    appendVariation({
      modelName: "",
      modelCode: "",
      images: [],
      color: "",
      attributes: [],
    });
  };
  const removeVariant = (variantIndex: number) => {
    // Görsel silme işlemleri
    if (watchedVariants[variantIndex]?.images?.length && handleDeleteImages) {
      watchedVariants[variantIndex].images.forEach((image) =>
        handleDeleteImages(image, variantIndex)
      );
    }

    // Mevcut variants'ı al ve silinecek olanı çıkar
    const currentVariants = [...watchedVariants];
    currentVariants.splice(variantIndex, 1);

    // Form'u güncelle - bu UI'ı da güncelleyecek
    setValue("variants", currentVariants, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    // StockAttributeImages'ı reindex et
    setStockAttributeImages((prev) => {
      const newImages = { ...prev };
      delete newImages[variantIndex];
      return reindexStockAttributeImages(newImages, variantIndex);
    });

    // SelectedAttributes'ı reindex et
    setSelectedAttributes((prev) => {
      const entries = Object.entries(prev)
        .filter(([key]) => Number(key) !== variantIndex)
        .sort(([a], [b]) => Number(a) - Number(b));

      const reindexed: Record<number, Record<string, string | string[]>> = {};
      entries.forEach(([_, value], newIndex) => {
        reindexed[newIndex] = value;
      });

      return reindexed;
    });
  };

  // const exportJSON = () => {
  //   const jsonString = JSON.stringify({ variants }, null, 2);
  //   navigator.clipboard.writeText(jsonString);
  //   alert("JSON copied to clipboard!");
  // };

  const getIsDisabled = (variantIndex: number) => {
    return (
      !!stockAttributeImages[variantIndex]?.length ||
      !!watchedVariants[variantIndex].images.length
    );
  };

  return (
    <div className="mx-auto space-y-6 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Renk Varyantları</h1>
        <div className="flex gap-2"></div>
      </div>

      <div className="space-y-6">
        {watchedVariants.map((variant, variantIndex) => (
          <Card key={variantIndex} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Renk Varyantı {variantIndex + 1}</CardTitle>
                <Button
                  type="button"
                  onClick={() => removeVariant(variantIndex)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`modelName-${variantIndex}`}>Model Adı</Label>
                  <Input
                    id={`modelName-${variantIndex}`}
                    value={variant.modelName}
                    {...control.register(`variants.${variantIndex}.modelName`, {
                      required: "Model adı zorunludur.",
                      valueAsNumber: false,
                    })}
                    placeholder="Model adını girin"
                  />
                  {errors.variants?.[variantIndex]?.modelName && (
                    <p className="text-sm text-red-500">
                      {errors.variants[variantIndex].modelName.message}
                    </p>
                  )}
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor={`modelCode-${variantIndex}`}>
                          Model Kodu
                        </Label>
                        <Input
                          disabled={getIsDisabled(variantIndex)}
                          id={`modelCode-${variantIndex}`}
                          value={variant.modelCode}
                          {...control.register(
                            `variants.${variantIndex}.modelCode`,
                            {
                              required: "Model kodu zorunludur.",
                              valueAsNumber: false,
                            }
                          )}
                          placeholder="Model kodunu girin"
                        />
                        {errors.variants?.[variantIndex]?.modelCode && (
                          <p className="text-sm text-red-500">
                            {errors.variants[variantIndex].modelCode.message}
                          </p>
                        )}
                      </div>
                    </TooltipTrigger>
                    {getIsDisabled(variantIndex) && (
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
                    )}
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <Label htmlFor={`color-${variantIndex}`}>Renk</Label>
                        <Controller
                          control={control}
                          name={`variants.${variantIndex}.color`}
                          rules={{ required: "Renk seçimi zorunludur." }}
                          render={({ field }) => (
                            <Select
                              disabled={getIsDisabled(variantIndex)}
                              value={field.value}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger id={`color-${variantIndex}`}>
                                <SelectValue placeholder="Renk seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                {colors
                                  .sort((a, b) =>
                                    a.name.localeCompare(b.name, "tr")
                                  )
                                  .map((color) => (
                                    <SelectItem
                                      key={color.name}
                                      value={color.name}
                                    >
                                      {color.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          )}
                        />

                        {errors.variants?.[variantIndex]?.color && (
                          <p className="text-sm text-red-500">
                            {errors.variants[variantIndex].color.message}
                          </p>
                        )}
                      </div>
                    </TooltipTrigger>
                    {getIsDisabled(variantIndex) && (
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
                    )}
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Separator />

              {watch(`variants.${variantIndex}.color`) &&
                watch(`variants.${variantIndex}.modelCode`) && (
                  <>
                    <VariantImageUpload
                      handleDeleteImages={handleDeleteImages}
                      watch={watch}
                      imageName={`${
                        watch("variants")[variantIndex].modelCode
                      }_${
                        watch(`variants.${variantIndex}.color`) || "default"
                      }.webp`}
                      variationIndex={variantIndex}
                      images={stockAttributeImages[`${variantIndex}`] || []}
                      onImagesChange={(images) =>
                        setStockAttributeImages((prev) => ({
                          ...prev,
                          [`${variantIndex}`]: images,
                        }))
                      }
                    />

                    <Separator />

                    <Attributes
                      variationIndex={variantIndex}
                      key={variantIndex}
                      selectedAttributes={selectedAttributes}
                      setSelectedAttributes={setSelectedAttributes}
                    />
                  </>
                )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button type="button" className="ml-auto" onClick={addVariant}>
        <Plus className="w-4 h-4 mr-2" />
        Renk varyantı ekle
      </Button>

      {watchedVariants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Henüz hiç varyant eklenmemiş.
          </p>
          <Button type="button" onClick={addVariant}>
            <Plus className="w-4 h-4 mr-2" />
            İlk varyantınızı ekleyin.
          </Button>
        </div>
      )}
    </div>
  );
}
