"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
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
  setDeletedVariants:
    | React.Dispatch<React.SetStateAction<string[]>>
    | undefined;
  handleDeleteImages:
    | ((url: string, variationIndex: number) => void)
    | undefined;
}

export default function ProductVariantForm({
  stockAttributeImages,
  setStockAttributeImages,
  handleDeleteImages,
  setDeletedVariants,
}: IProps) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<TProductFormData>();
  const watchedVariants = watch("variants");

  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<number, Record<string, string | string[]>>
  >({});

  const { append, remove } = useFieldArray({
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

  const [selectedColors, setSelectedColors] = useState<{ value: string }[]>([]);

  const handleSelectColor = (values: { value: string }[]) => {
    setSelectedColors(values);
  };

  const initializedRef = useRef(false);

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
    // idsi olan variantları state'e ekle.
    if (setDeletedVariants) {
      watchedVariants.forEach((variant) => {
        if (variant.id && typeof variant.id === "string" && variant.id.length) {
          setDeletedVariants((prev) => [...prev, variant.id as string]);
        }
      });
    }

    // 1. Silinmesi gereken indeksleri belirle
    const deletedIndices = watchedVariants
      .map((variant, index) =>
        !selectedColors.some((color) => color.value === variant.color)
          ? index
          : -1
      )
      .filter((i) => i !== -1)
      .sort((a, b) => a - b); // 🔁 Artan sırada, çünkü reindex fonksiyonu bu sırayla mantıklı çalışır

    // 2. Görselleri sil
    if (handleDeleteImages) {
      deletedIndices.forEach((index) => {
        const images = watchedVariants[index]?.images || [];
        images.forEach((image) => handleDeleteImages(image, index));
      });
    }

    // 3. stockAttributeImages state'ini güncelle
    setStockAttributeImages((prev) => {
      let updated = { ...prev };

      // 🔴 Önce tüm silinecek index'leri temizle
      deletedIndices.forEach((index) => {
        delete updated[index];
      });

      // 🟡 Ardından reindex işlemini sırayla uygula
      deletedIndices
        .sort((a, b) => a - b) // artan sırada
        .forEach((removedIndex) => {
          updated = reindexStockAttributeImages(updated, removedIndex);
        });

      return updated;
    });
    // 4. selectedAttributes state'ini güncelle
    setSelectedAttributes((prev) => {
      const updatedEntries = Object.entries(prev)
        .filter(([key]) => !deletedIndices.includes(Number(key)))
        .sort(([a], [b]) => Number(a) - Number(b));

      // Artan sırayla index'leri yeniden düzenle
      const reindexed: Record<number, Record<string, string | string[]>> = {};
      updatedEntries.forEach(([_, value], newIndex) => {
        reindexed[newIndex] = value;
      });

      return reindexed;
    });

    // 5. Alanları formdan sil
    if (deletedIndices.length > 0) {
      remove(deletedIndices.sort((a, b) => b - a)); // React Hook Form için azalan sırada sil
    }

    // 6. Yeni renkleri ekle
    selectedColors.forEach((color) => {
      const exists = watchedVariants.some(
        (field) => field.color === color.value
      );
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

      {
        <div className="text-center py-12">
          {watchedVariants.length === 0 && (
            <p className="text-muted-foreground mb-4">
              Henüz hiç varyant eklenmemiş.
            </p>
          )}
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
                        onClick={
                          !watchedVariants.length
                            ? handleAddColor
                            : handleUpdateVariants
                        }
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {!watchedVariants.length
                          ? "Renk varyantı ekle"
                          : "Varyantları güncelle"}
                      </Button>
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </div>
      }

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
