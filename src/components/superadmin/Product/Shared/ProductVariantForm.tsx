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
  const variants = watch("variants");

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
    if (fields[variantIndex]?.images?.length && handleDeleteImages) {
      fields[variantIndex].images.forEach((image) =>
        handleDeleteImages(image, variantIndex)
      );
    }
    if (stockAttributeImages[variantIndex]?.length) {
      const images = stockAttributeImages;
      delete images[variantIndex];

      setStockAttributeImages(images);
    }

    removeVariation(variantIndex);
    setStockAttributeImages((prev) =>
      reindexStockAttributeImages(prev, variantIndex)
    );
  };

  // const exportJSON = () => {
  //   const jsonString = JSON.stringify({ variants }, null, 2);
  //   navigator.clipboard.writeText(jsonString);
  //   alert("JSON copied to clipboard!");
  // };

  const colors = [
    { name: "Beyaz", hex: "#FFFFFF" },
    { name: "Siyah", hex: "#000000" },
    { name: "Gri", hex: "#808080" },
    { name: "Koyu Gri", hex: "#4B4B4B" },
    { name: "Açık Gri", hex: "#D3D3D3" },
    { name: "Krem", hex: "#FFFDD0" },
    { name: "Bej", hex: "#F5F5DC" },
    { name: "Lacivert", hex: "#000080" },
    { name: "Gece Mavisi", hex: "#003366" },
    { name: "Mavi", hex: "#0000FF" },
    { name: "Açık Mavi", hex: "#ADD8E6" },
    { name: "Buz Mavisi", hex: "#E0FFFF" },
    { name: "İndigo", hex: "#4B0082" },
    { name: "Kot Mavisi", hex: "#5D8AA8" },
    { name: "Turkuaz", hex: "#40E0D0" },
    { name: "Petrol Mavisi", hex: "#005F5F" },
    { name: "Yeşil", hex: "#008000" },
    { name: "Zeytin Yeşili", hex: "#808000" },
    { name: "Açık Yeşil", hex: "#90EE90" },
    { name: "Nane Yeşili", hex: "#98FF98" },
    { name: "Haki", hex: "#A29F79" },
    { name: "Fıstık Yeşili", hex: "#9DC183" },
    { name: "Sarı", hex: "#FFFF00" },
    { name: "Hardal", hex: "#FFDB58" },
    { name: "Altın Sarısı", hex: "#FFD700" },
    { name: "Turuncu", hex: "#FFA500" },
    { name: "Kavun İçi", hex: "#FFB07C" },
    { name: "Somon", hex: "#FA8072" },
    { name: "Mercan", hex: "#FF7F50" },
    { name: "Kırmızı", hex: "#FF0000" },
    { name: "Bordo", hex: "#800000" },
    { name: "Gül Kurusu", hex: "#C08081" },
    { name: "Fușya", hex: "#FF00FF" },
    { name: "Füme", hex: "#757a80" },
    { name: "Pembe", hex: "#FFC0CB" },
    { name: "Açık Pembe", hex: "#FFD1DC" },
    { name: "Şeker Pembe", hex: "#FFB6C1" },
    { name: "Mor", hex: "#800080" },
    { name: "Eflatun", hex: "#9370DB" },
    { name: "Lila", hex: "#C8A2C8" },
    { name: "Lavanta", hex: "#E6E6FA" },
    { name: "Kahverengi", hex: "#8B4513" },
    { name: "Koyu Kahverengi", hex: "#5C4033" },
    { name: "Açık Kahverengi", hex: "#A0522D" },
    { name: "Tarçın", hex: "#D2691E" },
    { name: "Karamel", hex: "#FFDDA0" },
    { name: "Vizon", hex: "#B5A642" },
    { name: "Camel", hex: "#C19A6B" },
    { name: "Antrasit", hex: "#2F4F4F" },
    { name: "Şarap Rengi", hex: "#722F37" },
    { name: "Koyu Mürdüm", hex: "#580F41" },
    { name: "Metalik Gri", hex: "#A9A9A9" },
    { name: "Gümüş", hex: "#C0C0C0" },
    { name: "Şampanya", hex: "#F7E7CE" },
    { name: "Ten Rengi", hex: "#F5CBA7" },
  ];

  const getIsDisabled = (variantIndex: number) => {
    return (
      !!stockAttributeImages[variantIndex]?.length ||
      !!variants[variantIndex].images.length
    );
  };

  return (
    <div className="mx-auto space-y-6 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Renk Varyantları</h1>
        <div className="flex gap-2">
          {/* <Button type="button" onClick={exportJSON} variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Export JSON
          </Button> */}
        </div>
      </div>

      <div className="space-y-6">
        {variants.map((variant, variantIndex) => (
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
                    placeholder="Enter model name"
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
                          placeholder="Enter model code"
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
                                <SelectValue placeholder="Select Color" />
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

      {variants.length === 0 && (
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
