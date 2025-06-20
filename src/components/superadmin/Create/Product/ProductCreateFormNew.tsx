"use client";

import type React from "react";

import { useState } from "react";
import { useForm, useFieldArray, UseFormWatch } from "react-hook-form";
import { Plus, Minus, Upload, X } from "lucide-react";
import Resizer from "react-image-file-resizer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ICategory } from "@/types/AdminTypes/category";
import MarkdownEditor from "@/components/shared/Editor/MarkdownEditor";
import ImageView from "@/components/shared/ImageView";
import { SubCategoriesSelect } from "./SubCategoriesSelect";
import { createProduct } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

type ProductFormData = {
  name: string;
  slug: string;
  code: string;
  brandName: string;
  companyId: string;
  description: string;
  currencyType: string;
  categoryId: string;
  subCategories?: { value: string }[];
  productType: string;
  tags: { value: string }[];
  attributes: { key: string; value: string }[];
  variants: {
    modelName: string;
    modelCode: string;
    images: string[];
    attributes: {
      stockAttribute: { key: string; value: string }[];
      stock: number;
      price: number;
      sku: string;
      barcode: string;
      discountPrice?: number | null;
    }[];
  }[];
};

export default function ProductCreateFormNew({
  categories,
}: {
  categories: ICategory[];
}) {
  const [stockAttributeImages, setStockAttributeImages] = useState<{
    [key: string]: File[];
  }>({});
  const { toast } = useToast();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    defaultValues: {
      currencyType: "TRY",
      productType: "PHYSICAL",
      tags: [{ value: "" }],
      categoryId: "",
      companyId: "",
      subCategories: [],
      attributes: [{ key: "", value: "" }],
      variants: [
        {
          modelName: "",
          modelCode: "",
          images: [],
          attributes: [
            {
              stockAttribute: [{ key: "", value: "" }],
              stock: 0,
              price: 0,
              sku: "",
              barcode: "",
              discountPrice: 0,
            },
          ],
        },
      ],
    },
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control,
    name: "attributes",
  });

  const {
    fields: variationFields,
    append: appendVariation,
    remove: removeVariation,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const watchedVariations = watch("variants");

  const onSubmit = async (data: ProductFormData) => {
    // Transform data to match the required format
    const formattedData = {
      name: data.name,
      code: data.code,
      companyId: data.companyId,
      brandName: data.brandName,
      description: data.description,
      categoryId: data.categoryId,
      subCategories: data.subCategories,
      variants: data.variants.map((variation) => ({
        modelName: variation.modelName,
        modelCode: variation.modelCode,
        attributes: variation.attributes.map((attr, attrIndex) => ({
          stockAttribute: attr.stockAttribute.filter(
            (sa) => sa.key && sa.value
          ),
          stock: attr.stock,
          price: Number(attr.price),
          discountPrice: Number(attr.discountPrice),
          sku: attr.sku,
          barcode: attr.barcode,
        })),
      })),
      currencyType: data.currencyType,
      tags: data.tags.map((tag) => tag.value).filter(Boolean),
      productType: data.productType,
      attributes: data.attributes.filter((attr) => attr.key && attr.value),
    };
    console.log("formatted", formattedData);
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(formattedData)], { type: "application/json" })
    );

    Object.values(stockAttributeImages).forEach((fileArray) => {
      fileArray.forEach((file) => {
        formData.append(`images`, file);
      });
    });

    const { message, success } = await createProduct(formData);
    if (success) {
      console.log("message", message);
      toast({
        title: "Success",
        description: "Product is created.",
        variant: "default",
      });
    } else {
      console.log("message", message);
      toast({
        title: "Error",
        description: "Product cannot be created.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Product</CardTitle>
          <CardDescription>Fill in the product details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    {...register("name", {
                      required: "Product name is required",
                    })}
                    placeholder="Kalp Nakış İşlemeli Yelek"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Company Id *</Label>
                  <Input
                    id="companyId"
                    {...register("companyId", {
                      required: "Company Id is required",
                    })}
                    placeholder="dfc9a257-a4bc-4bc3-89ee-8727a129efd2"
                  />
                  {errors.slug && (
                    <p className="text-sm text-red-500">
                      {errors.companyId?.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Product Code *</Label>
                  <Input
                    id="code"
                    {...register("code", {
                      required: "Product code is required",
                    })}
                    placeholder="A2991"
                  />
                  {errors.code && (
                    <p className="text-sm text-red-500">
                      {errors.code.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand Name *</Label>
                  <Input
                    id="brandName"
                    {...register("brandName", {
                      required: "Brand name is required",
                    })}
                    placeholder="Nike"
                  />
                  {errors.brandName && (
                    <p className="text-sm text-red-500">
                      {errors.brandName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <MarkdownEditor
                  onChange={(value) => setValue("description", value)}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currencyType">Currency Type *</Label>
                  <Select
                    onValueChange={(value) => setValue("currencyType", value)}
                    defaultValue="TRY"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TRY">TRY</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type *</Label>
                  <Select
                    onValueChange={(value) => setValue("productType", value)}
                    defaultValue="PHYSICAL"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PHYSICAL">Physical</SelectItem>
                      <SelectItem value="DIGITAL">Digital</SelectItem>
                      <SelectItem value="SERVICE">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Categories */}
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category ID *</Label>
              <Select
                value={watch("categoryId")}
                onValueChange={(value) => setValue("categoryId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        {category.image && (
                          <ImageView
                            className="h-4 w-4 rounded"
                            imageInfo={{
                              url: category.image,
                              name: category.name,
                            }}
                          />
                        )}
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <SubCategoriesSelect
              control={control}
              name="subCategories"
              label="Subcategories"
              subCategories={
                categories.find((cat) => cat.id === watch("categoryId"))
                  ?.subCategories || []
              }
            />
            <Separator />

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tags</h3>
              {tagFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    {...register(`tags.${index}.value`)}
                    placeholder="Enter tag"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeTag(index)}
                    disabled={tagFields.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendTag({ value: "" })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Tag
              </Button>
            </div>

            <Separator />

            {/* Attributes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Attributes</h3>
              {attributeFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input
                    {...register(`attributes.${index}.key`)}
                    placeholder="Attribute key"
                  />
                  <Input
                    {...register(`attributes.${index}.value`)}
                    placeholder="Attribute value"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeAttribute(index)}
                    disabled={attributeFields.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendAttribute({ key: "", value: "" })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Attribute
              </Button>
            </div>

            <Separator />

            {/* Variations */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Product variants</h3>
              {variationFields.map((variation, variationIndex) => (
                <Card key={variation.id} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">
                      Variation {variationIndex + 1}
                    </h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeVariation(variationIndex)}
                      disabled={variationFields.length === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label>Model Name *</Label>
                      <Input
                        {...register(`variants.${variationIndex}.modelName`, {
                          required: true,
                        })}
                        placeholder="BLUE-321"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Model Code *</Label>
                      <Input
                        {...register(`variants.${variationIndex}.modelCode`, {
                          required: true,
                        })}
                        placeholder="SPACEGRY256"
                      />
                    </div>
                  </div>
                  <VariationAttributes
                    control={control}
                    watch={watch}
                    variationIndex={variationIndex}
                    setValue={setValue}
                    watchedVariations={watchedVariations}
                    stockAttributeImages={stockAttributeImages}
                    setStockAttributeImages={setStockAttributeImages}
                  />
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendVariation({
                    modelName: "",
                    modelCode: "",
                    images: [],
                    attributes: [
                      {
                        stockAttribute: [{ key: "", value: "" }],
                        stock: 0,
                        price: 0,
                        discountPrice: 0,
                        sku: "",
                        barcode: "",
                      },
                    ],
                  })
                }
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Variation
              </Button>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function VariationAttributes({
  control,
  variationIndex,
  setValue,
  watchedVariations,
  stockAttributeImages,
  setStockAttributeImages,
  watch,
}: {
  control: any;
  variationIndex: number;
  setValue: any;
  watchedVariations: any[];
  stockAttributeImages: { [key: string]: File[] };
  setStockAttributeImages: React.Dispatch<
    React.SetStateAction<{ [key: string]: File[] }>
  >;
  watch: UseFormWatch<ProductFormData>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${variationIndex}.attributes`,
  });

  const attributeOptions = [
    { value: "color", label: "Color" },
    { value: "size", label: "Size" },
    { value: "material", label: "Material" },
    { value: "weight", label: "Weight" },
    { value: "dimensions", label: "Dimensions" },
    { value: "cpu", label: "CPU" },
    { value: "memory", label: "Memory" },
    { value: "storage", label: "Storage" },
    { value: "guarantee", label: "Guarantee" },
    { value: "brand", label: "Brand" },
    { value: "model", label: "Model" },
    { value: "capacity", label: "Capacity" },
    { value: "voltage", label: "Voltage" },
    { value: "power", label: "Power" },
    { value: "connectivity", label: "Connectivity" },
    { value: "compatibility", label: "Compatibility" },
  ];

  // Function to check if color value already exists in previous stock attributes
  const shouldShowImageUpload = (attributeIndex: number) => {
    const currentVariation = watchedVariations[variationIndex];
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

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Stock Attributes</Label>
      {fields.map((field, attributeIndex) => (
        <Card key={field.id} className="p-3 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-sm font-medium">
              Stock Attribute {attributeIndex + 1}
            </h5>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => remove(attributeIndex)}
              disabled={fields.length === 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>

          <StockAttributeFields
            watch={watch}
            control={control}
            variationIndex={variationIndex}
            attributeIndex={attributeIndex}
            setValue={setValue}
            attributeOptions={attributeOptions}
          />

          <div className="mt-3">
            <Label className="text-sm">Price *</Label>
            <Input
              type="string"
              {...control.register(
                `variants.${variationIndex}.attributes.${attributeIndex}.price`,
                {
                  required: true,
                  valueAsNumber: false,
                }
              )}
              placeholder="10"
              className="mt-1"
            />
          </div>
          <div className="mt-3">
            <Label className="text-sm">Discount Price</Label>
            <Input
              type="string"
              {...control.register(
                `variants.${variationIndex}.attributes.${attributeIndex}.discountPrice`,
                {
                  required: true,
                  valueAsNumber: false,
                }
              )}
              placeholder="0"
              className="mt-1"
            />
          </div>
          <div className="mt-3">
            <Label className="text-sm">Stock Quantity *</Label>
            <Input
              type="number"
              {...control.register(
                `variants.${variationIndex}.attributes.${attributeIndex}.stock`,
                {
                  required: true,
                  valueAsNumber: true,
                }
              )}
              placeholder="10"
              className="mt-1"
            />
          </div>
          <div className="mt-3">
            <Label className="text-sm">Barcode *</Label>
            <Input
              type="string"
              {...control.register(
                `variants.${variationIndex}.attributes.${attributeIndex}.barcode`,
                {
                  required: true,
                  valueAsNumber: false,
                }
              )}
              placeholder="8691234567890"
              className="mt-1"
            />
          </div>
          <div className="mt-3">
            <Label className="text-sm">SKU *</Label>
            <Input
              type="string"
              {...control.register(
                `variants.${variationIndex}.attributes.${attributeIndex}.sku`,
                {
                  required: true,
                  valueAsNumber: false,
                }
              )}
              placeholder="SKU"
              className="mt-1"
            />
          </div>

          {shouldShowImageUpload(attributeIndex) && (
            <StockAttributeImageUpload
              imageName={`${watch("variants")[variationIndex].modelCode}_${
                watch(
                  `variants.${variationIndex}.attributes.${attributeIndex}`
                ).stockAttribute.find((attr) => attr.key === "color")?.value ||
                "default"
              }.webp`}
              variationIndex={variationIndex}
              attributeIndex={attributeIndex}
              images={
                stockAttributeImages[`${variationIndex}-${attributeIndex}`] ||
                []
              }
              onImagesChange={(images) =>
                setStockAttributeImages((prev) => ({
                  ...prev,
                  [`${variationIndex}-${attributeIndex}`]: images,
                }))
              }
            />
          )}
        </Card>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({
            stockAttribute: [{ key: "", value: "" }],
            stock: 0,
            images: [],
          })
        }
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Stock Attribute
      </Button>
    </div>
  );
}

function StockAttributeFields({
  control,
  watch,
  variationIndex,
  attributeIndex,
  setValue,
  attributeOptions,
}: {
  control: any;
  variationIndex: number;
  attributeIndex: number;
  setValue: any;
  watch: UseFormWatch<ProductFormData>;
  attributeOptions: { value: string; label: string }[];
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${variationIndex}.attributes.${attributeIndex}.stockAttribute`,
  });

  // Get currently selected attribute keys for this stock attribute
  const getSelectedKeys = () => {
    const stockAttribute =
      control._formValues?.variants?.[variationIndex]?.attributes?.[
        attributeIndex
      ]?.stockAttribute ?? [];

    // const stockAttributes =
    //   watch(
    //     `variants.${variationIndex}.attributes.${attributeIndex}.stockAttribute`
    //   ) ?? [];

    return stockAttribute.map((attr: any) => attr.key).filter(Boolean);
  };

  // Check if color is already selected in this stock attribute
  // const isColorSelected = () => {
  //   const selectedKeys = getSelectedKeys();
  //   return selectedKeys.includes("color");
  // };

  // Get available options for each field (excluding already selected keys)
  const getAvailableOptions = (currentFieldIndex: number) => {
    const selectedKeys = getSelectedKeys();
    const currentFieldKey =
      control._formValues?.variants?.[variationIndex]?.attributes?.[
        attributeIndex
      ]?.stockAttribute?.[currentFieldIndex]?.key;

    return attributeOptions.filter((option) => {
      // Always show the current field's selected option
      if (option.value === currentFieldKey) return true;

      // For color: only show if not already selected in this stock attribute
      if (option.value === "color") {
        return !selectedKeys.includes("color") || currentFieldKey === "color";
      }
      if (option.value === "size") {
        return !selectedKeys.includes("size") || currentFieldKey === "size";
      }

      // For other attributes: always show (can be selected multiple times)
      return true;
    });
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium">Attributes</Label>
      {fields.map((field, stockAttrIndex) => (
        <div key={field.id} className="flex gap-2">
          <div className="flex-1">
            <Select
              onValueChange={(value) =>
                setValue(
                  `variants.${variationIndex}.attributes.${attributeIndex}.stockAttribute.${stockAttrIndex}.key`,
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select attribute" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableOptions(stockAttrIndex).map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            {...control.register(
              `variants.${variationIndex}.attributes.${attributeIndex}.stockAttribute.${stockAttrIndex}.value`
            )}
            placeholder="Attribute value"
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => remove(stockAttrIndex)}
            disabled={fields.length === 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => append({ key: "", value: "" })}
        className="w-full"
      >
        <Plus className="h-3 w-3 mr-2" />
        Add Attribute
      </Button>
    </div>
  );
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
      console.log("variantFields", imageName);
      onImagesChange([...images, reNamedImage]);
    } catch (error) {
      console.error("Resim küçültme hatası:", error);
    }
  };
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(event.target.files || []);
  //   onImagesChange([...images, ...files]);
  // };

  const removeImage = (imageIndex: number) => {
    onImagesChange(images.filter((_, i) => i !== imageIndex));
  };

  return (
    <div className="space-y-2 mt-3">
      <Label className="text-xs font-medium">Stock Attribute Images</Label>

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

      {images.length > 0 && (
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
      )}
    </div>
  );
}
