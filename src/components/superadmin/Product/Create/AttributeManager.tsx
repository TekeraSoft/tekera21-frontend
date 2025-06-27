"use client";

import React from "react";
import { useState } from "react";
import Resizer from "react-image-file-resizer";
import {
  X,
  ChevronDown,
  Trash2,
  Plus,
  Upload,
  Camera,
  CameraIcon,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UseFormWatch } from "react-hook-form";
import { ProductFormData } from "./ProductCreateFormNewWithSizes";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { colors } from "../Shared/Data/Colors";

type TColor = { name: string; hex: string };

const sizes = [
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
  { id: "lxl", label: "L/XL" },
];

type TVariant = {
  id: string;
  image: File | null;
  color: string;
  size: string;
  barcode: string;
  price: string;
  stock: string;
  tax: string;
  stockCode: string;
};

interface IProps {
  variationIndex: number;
  attributeIndex: number;
  setValue: any;
  stockAttributeImages: {
    [key: string]: File[];
  };
  setStockAttributeImages: React.Dispatch<
    React.SetStateAction<{
      [key: string]: File[];
    }>
  >;
  watch: UseFormWatch<ProductFormData>;
}

function StockAttributeImageUpload({
  variationIndex,
  attributeIndex,
  images,
  onImagesChange,
  imageName,
}: {
  variationIndex: number;
  attributeIndex: number;
  images: File[];
  onImagesChange: (images: File[]) => void;
  imageName: string;
}) {
  console.log("imageName", imageName);
  const resizeImage = (file: File) => {
    const fileResized = new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        920, // ✅ Genişlik
        1840, // ✅ Yükseklik
        "WEBP", // ✅ Format (PNG, WEBP de olabilir)
        100, // ✅ Kalite (0-100 arasında)
        0, // ✅ Rotasyon
        (resizedFile) => {
          // Ensure resizedFile is a Blob or File, not a ProgressEvent
          if (resizedFile instanceof Blob || resizedFile instanceof File) {
            resolve(new File([resizedFile], file.name, { type: file.type }));
          } else if (
            resizedFile &&
            typeof resizedFile === "object" &&
            "target" in resizedFile &&
            (resizedFile as ProgressEvent<FileReader>).target?.result
          ) {
            // If it's a ProgressEvent, extract the result as a Blob
            const result = (resizedFile as ProgressEvent<FileReader>).target
              ?.result;
            if (result instanceof ArrayBuffer) {
              resolve(new File([result], file.name, { type: file.type }));
            } else if (typeof result === "string") {
              // If result is a base64 string, convert to Blob
              const arr = result.split(",");
              const mime = arr[0].match(/:(.*?);/)?.[1] || file.type;
              const bstr = atob(arr[1]);
              let n = bstr.length;
              const u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              resolve(new File([u8arr], file.name, { type: mime }));
            } else {
              resolve(file);
            }
          } else {
            resolve(file);
          }
        },
        "file" // ✅ Çıktıyı doğrudan File olarak al
      );
    });
    return fileResized as Promise<File>;
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    const file = event.target.files![0];
    try {
      const resizedImage = await resizeImage(file);
      // Check if the image already exist

      const reNamedImage = new File([resizedImage], imageName);

      onImagesChange([...images, reNamedImage]);
    } catch (error) {
      console.error("Resim küçültme hatası:", error);
    }
  };

  const removeImage = (imageIndex: number) => {
    onImagesChange(images.filter((_, i) => i !== imageIndex));
  };

  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  console.log("images", images);

  return (
    <div>
      <div className="text-center w-full h-full">
        {/* <Label
          onClick={() => setShowMediaLibrary(true)}
          htmlFor={`stock-images-${variationIndex}-${attributeIndex}`}
          className="cursor-pointer text-xs font-medium text-primary hover:text-primary/60"
        >
          <Camera className="w-8 h-8" />
        </Label> */}

        {/* Upload Trigger Button */}
        <Dialog open={showMediaLibrary} onOpenChange={setShowMediaLibrary}>
          <DialogTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <Camera className="h-8 w-8" />
            </div>
          </DialogTrigger>

          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>

            <div className="flex flex-col h-full">
              {/* Upload Area */}
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-3">
                    <div className="text-center">
                      <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                      <Label
                        htmlFor={`stock-images-${variationIndex}-${attributeIndex}`}
                        className="cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-500"
                      >
                        Upload images
                      </Label>
                      <Input
                        id={`stock-images-${variationIndex}-${attributeIndex}`}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB each
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Images Grid */}
              <div className="flex-1 overflow-y-auto">
                {images.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <ImageIcon className="h-16 w-16 mb-4" />
                    <p className="text-lg font-medium">
                      No images uploaded yet
                    </p>
                    <p className="text-sm">
                      Upload your first images using the area above
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        Uploaded Images ({images.length})
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {images.map((file, imageIndex) => (
                            <div key={imageIndex} className="relative group">
                              <img
                                src={
                                  URL.createObjectURL(file) ||
                                  "/placeholder.svg"
                                }
                                alt={`Stock ${attributeIndex + 1} - Image ${
                                  imageIndex + 1
                                }`}
                                className="w-full h-16 object-cover rounded border"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(imageIndex)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-2 w-2" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {images.length > 0 && (
                        <p className="text-xs text-gray-600">
                          {images.length} image(s) uploaded
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Input
          id={`stock-images-${variationIndex}-${attributeIndex}`}
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((file, imageIndex) => (
            <div key={imageIndex} className="relative group">
              <img
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt={`Stock ${attributeIndex + 1} - Image ${imageIndex + 1}`}
                className="w-full h-16 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(imageIndex)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-2 w-2" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-xs text-gray-600">
          {images.length} image(s) uploaded
        </p>
      )} */}
    </div>
  );
}

export default function ProductAttributeManager({
  watch,
  variationIndex,
  attributeIndex,
  stockAttributeImages,
  setStockAttributeImages,
}: IProps) {
  const [selectedColor, setSelectedColor] = useState<TColor>();
  const [selectedColors, setSelectedColors] = useState<TColor[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [attributes, setAttributes] = useState<TVariant[]>([]);
  const [globalPrice, setGlobalPrice] = useState("0,00₺");
  const [globalTax, setGlobalTax] = useState("");
  const [globalStock, setGlobalStock] = useState(0);

  const removeColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev!.filter((color) => color.name !== colorName)
    );
  };

  const removeSize = (sizeId: string) => {
    setSelectedSizes((prev) => prev!.filter((id) => id !== sizeId));
  };

  const handleSizeChange = (sizeId: string, checked: boolean) => {
    if (!selectedColor?.name) return;
    if (checked) {
      setSelectedSizes((prev) => [...prev, sizeId]);
    } else {
      setSelectedSizes((prev) => prev!.filter((id) => id !== sizeId));
    }
  };

  const getColorInfo = (colorName: string) => {
    return colors.find((c) => c.name === colorName);
  };

  const getSizeLabel = (sizeId: string) => {
    return sizes.find((s) => s.id === sizeId)?.label || "";
  };

  const deleteVariant = (variantId: string) => {
    if (attributes?.length) {
      setAttributes((prev) => prev!.filter((v) => v.id !== variantId));
    }
  };

  const handleAddColor = () => {
    if (!selectedColor) return;
    if (selectedColors?.find((col) => col.name === selectedColor.name)) {
      return;
    }
    setSelectedColors((prev) => [...prev, selectedColor]);
  };

  const handleAddVariant = () => {
    if (!selectedColors.length || !selectedSizes.length) return;

    const existingCombinations = new Set(
      attributes.map((v) => `${v.color}-${v.size}`)
    );

    const newVariants = selectedColors.flatMap((color) =>
      selectedSizes.flatMap((size, index) => {
        const key = `${color.name}-${size}`;
        if (existingCombinations.has(key)) {
          return []; // bu kombinasyon zaten var, ekleme
        }

        const variant = {
          id: index + color.name,
          image: null,
          color: color.name,
          size: size,
          barcode: "string",
          price: "string",
          stock: "string",
          tax: "string",
          stockCode: "string",
        };
        return [variant];
      })
    );

    setAttributes((prev) => [...prev, ...newVariants]);
  };

  const watchedVariations = watch("variants");

  const shouldShowImageUpload = (attributeIndex: number) => {
    const currentVariation = watchedVariations[variationIndex];
    // const currentVariation = watchedVariations[variationIndex];
    if (!currentVariation || !currentVariation.attributes) return true;

    const currentAttribute = currentVariation.attributes[attributeIndex];
    if (!currentAttribute || !currentAttribute.stockAttribute) return true;

    const colorAttribute = currentAttribute.stockAttribute.find(
      (attr: any) => attr.key === "color"
    );
    if (!colorAttribute || !colorAttribute.value) return true;

    // Check if this color value exists in previous stock attributes
    for (let i = 0; i < attributeIndex; i++) {
      const prevAttribute = currentVariation.attributes[i];
      if (prevAttribute && prevAttribute.stockAttribute) {
        const prevColorAttribute = prevAttribute.stockAttribute.find(
          (attr: any) => attr.key === "color"
        );
        if (
          prevColorAttribute &&
          prevColorAttribute.value === colorAttribute.value
        ) {
          return false; // Don't show image upload if color already exists
        }
      }
    }

    return true;
  };

  const groups = Object.entries(
    attributes.reduce((groups, variant) => {
      const color = variant.color;
      if (!groups[color]) {
        groups[color] = [];
      }
      groups[color].push(variant);
      return groups;
    }, {} as Record<string, typeof attributes>)
  );

  const attributesForBackend = attributes.map((item) => {
    return {
      stockAttribute: [
        { key: "color", value: item.color },
        { key: "size", value: item.size },
      ],
      stock: item.stock,
      sku: `${item.stockCode}-${item.color}`, // veya başka bir mantıkla
      barcode: item.barcode,
      price: item.price,
      discountPrice: 0,
    };
  });

  console.log("attrss", attributesForBackend);

  console.log("stockAttributeImages", stockAttributeImages);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Top Filter Section */}
      <div className="flex items-center gap-4">
        <Select
          defaultValue=""
          onValueChange={(val) =>
            setSelectedColor(colors.find((color) => color.name === val)!)
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Seçiniz" />
          </SelectTrigger>
          <SelectContent>
            {colors.map((color) => (
              <SelectItem
                key={color.name}
                disabled={
                  selectedColors.find((clr) => clr.name === color.name)?.name
                    ? true
                    : false
                }
                value={color.name}
              >
                {color.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder=""
          className="flex-1"
          value={selectedColor?.name || ""}
          onChange={(e) =>
            setSelectedColor((prev) => {
              const newColor = { hex: prev!.hex, name: e.target.value };
              return newColor;
            })
          }
        />

        <Button
          type="button"
          onClick={handleAddColor}
          className="bg-slate-600 hover:bg-slate-700"
        >
          Renk Ekle
        </Button>
      </div>

      {/* Color Tags */}
      <div className="flex flex-wrap gap-2">
        {selectedColors.map((color) => {
          return (
            <Badge
              key={color.name}
              variant="default"
              className="flex text-black items-center gap-2 px-3 py-1"
            >
              <div
                className="w-4 h-4 rounded-full border text-black"
                style={{ backgroundColor: color.hex }}
              />
              {color.name}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeColor(color.name)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          );
        })}
      </div>

      {/* Size Selection */}
      {!!selectedColors.length && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">
              Beden <span className="text-red-500">*</span>
            </Label>
            <div className="ml-1">
              {selectedColor?.name && (
                <DropdownMenu
                  open={sizeDropdownOpen}
                  onOpenChange={setSizeDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    {sizes.map((size) => (
                      <DropdownMenuItem
                        key={size.id}
                        className="flex items-center space-x-2"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <Checkbox
                          checked={selectedSizes?.includes(size.id)}
                          onCheckedChange={(checked) =>
                            handleSizeChange(size.id, checked as boolean)
                          }
                        />
                        <span>{size.label}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {selectedSizes?.map((sizeId) => (
                <Badge
                  key={sizeId}
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1"
                >
                  {getSizeLabel(sizeId)}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeSize(sizeId)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddVariant}
            className="bg-secondary hover:bg-secondary/80 flex items-center gap-2 ml-auto"
          >
            <Plus className="h-4 w-4" />
            Renk Varyantı Ekle
          </Button>
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <Label className="text-sm">
            Satış Fiyatı <span className="text-red-500">*</span>
          </Label>
          <Input
            value={globalPrice}
            onChange={(e) => setGlobalPrice(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label className="text-sm">
            KDV <span className="text-red-500">*</span>
          </Label>
          <Select value={globalTax} onValueChange={setGlobalTax}>
            <SelectTrigger>
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">%0</SelectItem>
              <SelectItem value="8">%8</SelectItem>
              <SelectItem value="18">%18</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm">
            Stok Adedi <span className="text-red-500">*</span>
          </Label>
          <Input
            value={globalStock}
            onChange={(e) => setGlobalStock(Number(e.target.value))}
            placeholder="0"
          />
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" className="flex-1">
            Tümüne Uygula
          </Button>
        </div>
      </div>

      {/* Variants Table - Grouped by Color */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead>Görsel</TableHead>
              <TableHead>Renk</TableHead>
              <TableHead>Beden</TableHead>
              <TableHead>Barkod</TableHead>
              <TableHead>Satış Fiyatı</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>KDV</TableHead>
              <TableHead>Stok Kodu</TableHead>
              <TableHead>İşlem</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!!attributes?.length &&
              groups.map(([colorKey, colorVariants], groupIndex) => {
                const colorInfo = getColorInfo(colorKey);
                // console.log(
                //   "colorınfo",
                //   colorInfo,
                //   colorVariants,
                //   groupIndex,
                //   attributes
                // );
                return (
                  <React.Fragment key={colorKey}>
                    {/* Color Group Header */}
                    <TableRow className="bg-blue-50 border-t-2 border-blue-200">
                      <TableCell
                        colSpan={10}
                        className="font-medium text-blue-800 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: colorInfo?.hex }}
                          />
                          {colorInfo?.name} ({colorVariants.length} varyant)
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Color Variants */}
                    {colorVariants.map((variant, index) => (
                      <TableRow key={variant.id} className="hover:bg-gray-50">
                        <TableCell>
                          <Checkbox />
                        </TableCell>
                        <TableCell>
                          {index === 0 ? (
                            <div className="w-12 h-12 border-2 border-dashed border-orange-300 rounded flex items-center justify-center">
                              {shouldShowImageUpload(attributeIndex) && (
                                <StockAttributeImageUpload
                                  imageName={`${
                                    watch("variants")[variationIndex].modelCode
                                  }_${variant.color || "default"}.webp`}
                                  variationIndex={variationIndex}
                                  attributeIndex={attributeIndex}
                                  images={
                                    stockAttributeImages[
                                      `${variationIndex}-${attributeIndex}`
                                    ] || []
                                  }
                                  onImagesChange={(images) =>
                                    setStockAttributeImages((prev) => ({
                                      ...prev,
                                      [`${variationIndex}-${attributeIndex}`]:
                                        images,
                                    }))
                                  }
                                />
                              )}
                            </div>
                          ) : (
                            <div className="w-12 h-12"></div>
                          )}
                        </TableCell>
                        <TableCell>
                          {index === 0 ? (
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: colorInfo?.hex }}
                              />
                            </div>
                          ) : (
                            <div className="text-gray-400 text-sm ml-6">└─</div>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {variant.size}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Input className="w-24" placeholder="Barkod" />
                        </TableCell>
                        <TableCell>
                          <Input className="w-24" placeholder="0,00₺" />
                        </TableCell>
                        <TableCell>
                          <Input className="w-20" placeholder="0" />
                        </TableCell>
                        <TableCell>
                          <Select>
                            <SelectTrigger className="w-20">
                              <SelectValue placeholder="%" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">%0</SelectItem>
                              <SelectItem value="8">%8</SelectItem>
                              <SelectItem value="18">%18</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input className="w-20" placeholder="SKU-123" />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            type="button"
                            size="sm"
                            onClick={() => deleteVariant(variant.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            sil
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
