"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import Attributes from "./Attributes";
import { TProductFormData } from "@/types/ProductFormData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow, TooltipPortal } from "@radix-ui/react-tooltip";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "./Data/Colors";
import { MultiSelectColorVariant } from "./MultiSelectColorVariant";

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

  const { append, fields, remove } = useFieldArray({
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

  // const addVariant = () => {
  //   appendVariation({
  //     modelName: "",
  //     modelCode: "",
  //     images: [],
  //     color: "",
  //     attributes: [],
  //   });
  // };

  // const removeVariant = (variantIndex: number) => {
  //   // Görsel silme işlemleri
  //   if (watchedVariants[variantIndex]?.images?.length && handleDeleteImages) {
  //     watchedVariants[variantIndex].images.forEach((image) =>
  //       handleDeleteImages(image, variantIndex)
  //     );
  //   }

  //   // Mevcut variants'ı al ve silinecek olanı çıkar
  //   const currentVariants = [...watchedVariants];
  //   currentVariants.splice(variantIndex, 1);

  //   // Form'u güncelle - bu UI'ı da güncelleyecek
  //   setValue("variants", currentVariants, {
  //     shouldValidate: true,
  //     shouldDirty: true,
  //     shouldTouch: true,
  //   });

  //   // StockAttributeImages'ı reindex et
  //   setStockAttributeImages((prev) => {
  //     const newImages = { ...prev };
  //     delete newImages[variantIndex];
  //     return reindexStockAttributeImages(newImages, variantIndex);
  //   });

  //   // SelectedAttributes'ı reindex et
  //   setSelectedAttributes((prev) => {
  //     const entries = Object.entries(prev)
  //       .filter(([key]) => Number(key) !== variantIndex)
  //       .sort(([a], [b]) => Number(a) - Number(b));

  //     const reindexed: Record<number, Record<string, string | string[]>> = {};
  //     entries.forEach(([_, value], newIndex) => {
  //       reindexed[newIndex] = value;
  //     });

  //     return reindexed;
  //   });
  // };

  // const exportJSON = () => {
  //   const jsonString = JSON.stringify({ variants }, null, 2);
  //   navigator.clipboard.writeText(jsonString);
  //   alert("JSON copied to clipboard!");
  // };

  const [selectedColors, setSelectedColors] = useState<{ value: string }[]>([]);

  const handleSelectColor = (values: { value: string }[]) => {
    setSelectedColors(values);
  };

  const initializedRef = useRef(false);
  // console.log("selectedColors", selectedColors);

  const handleAddColor = () => {
    selectedColors.map((color) =>
      append({
        modelName: color.value + "modeli",
        modelCode: color.value + "kodu",
        images: [],
        color: color.value,
        attributes: [],
      })
    );
  };
  const handleUpdateVariants = () => {
    const deletedVariants = watchedVariants.filter(
      (variant) =>
        !selectedColors.some((color) => color.value === variant.color)
    );

    console.log("deleted", deletedVariants);

    // 1. Silinmesi gerekenleri kaldır
    deletedVariants.length &&
      deletedVariants.forEach((deleted) => {
        const index = fields.findIndex(
          (field) => field.color === deleted.color
        );
        if (index !== -1) {
          if (handleDeleteImages) {
            deleted.images.forEach((image) => handleDeleteImages(image, index));
          }
          console.log("braso");
          setStockAttributeImages((prev) => {
            const newImages = { ...prev };
            delete newImages[index];
            return reindexStockAttributeImages(newImages, index);
          });
          setSelectedAttributes((prev) => {
            const entries = Object.entries(prev)
              .filter(([key]) => Number(key) !== index)
              .sort(([a], [b]) => Number(a) - Number(b));

            const reindexed: Record<
              number,
              Record<string, string | string[]>
            > = {};
            entries.forEach(([_, value], newIndex) => {
              reindexed[newIndex] = value;
            });

            return reindexed;
          });
          remove(index);
        }
      });

    // 2. Yeni eklenmesi gerekenleri ekle
    selectedColors.forEach((color) => {
      const exists = fields.some((field) => field.color === color.value);
      console.log("exist", exists);
      if (!exists) {
        append({
          modelName: `${color.value} modeli`,
          modelCode: `${color.value} kodu`,
          images: [],
          color: color.value,
          attributes: [],
        });
      }
    });
  };

  useEffect(() => {
    if (watchedVariants.length && !initializedRef.current) {
      console.log("runn");
      watchedVariants.forEach((variant) =>
        setSelectedColors((prev) => [...prev, { value: variant.color }])
      );
      initializedRef.current = true;
    }

    return () => {};
  }, [watchedVariants, initializedRef.current]);

  return (
    <div className="mx-auto space-y-6 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Renk Varyantları</h1>
        <div className="flex gap-2"></div>
      </div>

      {watchedVariants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Henüz hiç varyant eklenmemiş.
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Label htmlFor={`color`}>Renk</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 block">
                      <Controller
                        control={control}
                        name={`variants`}
                        rules={{ required: "Renk seçimi zorunludur." }}
                        render={({ field }) => (
                          <MultiSelectColorVariant
                            options={colors.sort((a, b) =>
                              a.name.localeCompare(b.name, "tr")
                            )}
                            onChange={handleSelectColor}
                            selected={selectedColors}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <Button
                        type="button"
                        className="ml-auto"
                        onClick={handleAddColor}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Renk varyantı ekle
                      </Button>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              {/* {getIsDisabled(variantIndex) && (
                <TooltipPortal>
                  <TooltipContent className="TooltipContent" sideOffset={5}>
                    <Button variant={"info"}>
                      Bu alan, varyasyon görselleri yüklendiği için
                      düzenlenemez. Tüm görselleri silip güncelleyebilirsiniz.
                    </Button>
                    <TooltipArrow className="TooltipArrow" />
                  </TooltipContent>
                </TooltipPortal>
              )} */}
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Label htmlFor={`color`}>Renk</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 block">
                    <Controller
                      control={control}
                      name={`variants`}
                      rules={{ required: "Renk seçimi zorunludur." }}
                      render={({ field }) => (
                        <MultiSelectColorVariant
                          options={colors.sort((a, b) =>
                            a.name.localeCompare(b.name, "tr")
                          )}
                          onChange={handleSelectColor}
                          selected={selectedColors}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Button
                      type="button"
                      className="ml-auto"
                      onClick={handleUpdateVariants}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Varyantları güncelle
                    </Button>
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            {/* {getIsDisabled(variantIndex) && (
                <TooltipPortal>
                  <TooltipContent className="TooltipContent" sideOffset={5}>
                    <Button variant={"info"}>
                      Bu alan, varyasyon görselleri yüklendiği için
                      düzenlenemez. Tüm görselleri silip güncelleyebilirsiniz.
                    </Button>
                    <TooltipArrow className="TooltipArrow" />
                  </TooltipContent>
                </TooltipPortal>
              )} */}
          </Tooltip>
        </TooltipProvider>
      )}

      <div className="space-y-6">
        <Card className="w-full">
          {/* <CardHeader>
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
            </CardHeader> */}
          <CardContent className="space-y-4">
            <Separator />

            <Attributes
              selectedAttributes={selectedAttributes}
              setSelectedAttributes={setSelectedAttributes}
              handleDeleteImages={handleDeleteImages}
              setStockAttributeImages={setStockAttributeImages}
              stockAttributeImages={stockAttributeImages}
            />
          </CardContent>
        </Card>
      </div>

      {/* <Button type="button" className="ml-auto" onClick={addVariant}>
        <Plus className="w-4 h-4 mr-2" />
        Renk varyantı ekle
      </Button> */}
    </div>
  );
}
