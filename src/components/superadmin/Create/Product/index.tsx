"use client";

import type React from "react";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { createProduct } from "@/app/actions";

type ProductFormData = {
  name?: string;
  code?: string;
  brandName?: string;
  description?: string;
  currencyType?: string;
  productType?: string;
  companyId?: string;
  tags?: { value: string }[];
  attributes?: { key: string; value: string }[];
  categoryId?: string;
  subCategories?: { value: string }[];
  variants: {
    modelName: string;
    modelCode: string;
    price: number;
    stock: number;
    sku: string;
    barcode: string;
    attributes: { key: string; value: string }[];
  }[];
};

export default function ProductCreateForm() {
  const [variantImages, setVariantImages] = useState<{ [key: number]: File[] }>(
    {}
  );

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
      companyId: "9390355b-bf31-47c8-88d1-dc91451df49b",
      categoryId: "912844d0-f9ac-4f77-bd1f-2db9be84ea07",
      tags: [{ value: "telefon" }],
      attributes: [{ key: "guarante", value: "w yıl" }],
      subCategories: [{ value: "76af090e-91e2-4c78-b892-3a4064df266e" }],
      variants: [
        {
          modelName: "Test1",
          modelCode: "Test1Code",
          price: 5555,
          stock: 550,
          sku: "SKU123",
          barcode: "98989898",
          attributes: [{ key: "", value: "" }],
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
    fields: subCategoryFields,
    append: appendSubCategory,
    remove: removeSubCategory,
  } = useFieldArray({
    control,
    name: "subCategories",
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (data: ProductFormData) => {
    // Transform data to match the required format
    const formattedData = {
      ...data,
      tags: data.tags?.map((tag) => tag.value).filter(Boolean),
      subCategories: data.subCategories
        ?.map((sub) => sub.value)
        .filter(Boolean),
      attributes: data.attributes?.filter((attr) => attr.key && attr.value),
      variants: data.variants?.map((variant, index) => ({
        ...variant,
        attributes: variant.attributes.filter((attr) => attr.key && attr.value),
      })),
    };
    console.log("variantImages", variantImages);
    console.log("formattedData", formattedData);
    const sample = {
      currencyType: "TRY",
      productType: "PHYSICAL",
      tags: ["telefon", "samsung"],
      attributes: [
        { key: "guarante", value: "2 Yıl" },
        { key: "material", value: "Mesh" },
      ],
      subCategories: ["2df9eb55-68d7-4126-9335-2706db488955"],
      variants: [
        {
          modelName: "ipone beyaz",
          modelCode: "byz256",
          price: 5555,
          stock: 5555,
          sku: "ip65454",
          barcode: "5454545",
          attributes: [
            {
              key: "color",
              value: "beyaz",
            },
          ],
        },
        {
          modelName: "ipone 555",
          modelCode: "black",
          price: 5855,
          stock: 555,
          sku: "sku-1121",
          barcode: "54544877",
          attributes: [
            {
              key: "color",
              value: "siyah",
            },
          ],
        },
      ],
      name: "ipone",
      code: "ipone",
      brandName: "ipone",
      companyId: "551f8828-b638-467d-b150-ad1aa36216b6",
      description: "desr",
      categoryId: "93999be6-f3bd-4623-83a4-84176d05cd1e",
    };

    const samplePostman = {
      name: "Beyaz T-shirt",
      code: "A2991",
      brandName: "Nike",
      description: "High-quality mobile phone.",
      currencyType: "TRY",
      productType: "PHYSICAL",
      companyId: "551f8828-b638-467d-b150-ad1aa36216b6",
      tags: ["tech", "mobility"],
      attributes: [
        { key: "guarante", value: "2 Yıl" },
        { key: "material", value: "Mesh" },
      ],
      categoryId: "93999be6-f3bd-4623-83a4-84176d05cd1e",
      subCategories: ["2df9eb55-68d7-4126-9335-2706db488955"],
      variants: [
        {
          modelName: "BLUE-123",
          modelCode: "SPACEGRY256",
          price: 44.9,
          stock: 15,
          sku: "SPRT123-RED",
          barcode: "8680000000011",
          attributes: [
            { key: "cpu", value: "Apple Silicon" },
            { key: "color", value: "Blue" },
          ],
        },
        {
          modelName: "WHITE-123",
          modelCode: "SPACEGRY256",
          price: 35.0,
          stock: 10,
          sku: "SPRT123-BLUE",
          barcode: "8680000000012",
          attributes: [
            { key: "cpu", value: "Apple Slycon" },
            { key: "color", value: "Blue" },
          ],
        },
      ],
    };
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(formattedData)], { type: "application/json" })
    );

    Object.values(variantImages).forEach((fileArray) => {
      fileArray.forEach((file) => {
        formData.append(`images`, file);
      });
    });

    // console.log("Product Data:", JSON.stringify(formattedData, null, 2));
    const response = await createProduct(formData);
    console.log("created product", response);
  };

  return (
    <div className="mx-auto p-6">
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
                    placeholder="Beyaz T-shirt"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
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
                <div className="space-y-2">
                  <Label htmlFor="companyId">Company ID *</Label>
                  <Input
                    id="companyId"
                    {...register("companyId", {
                      required: "Company ID is required",
                    })}
                    placeholder="5bb243a1-084d-4930-ab9f-7ded184fd4c5"
                  />
                  {errors.companyId && (
                    <p className="text-sm text-red-500">
                      {errors.companyId.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="High-quality mobile phone."
                  rows={3}
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
              <h3 className="text-lg font-semibold">Attributes</h3>
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

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Categories</h3>
              <div className="space-y-2">
                <Label htmlFor="categoryId">Category ID *</Label>
                <Input
                  id="categoryId"
                  {...register("categoryId", {
                    required: "Category ID is required",
                  })}
                  placeholder="5f33cd34-d24e-48ea-b992-d777b70d9ce8"
                />
                {errors.categoryId && (
                  <p className="text-sm text-red-500">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Sub Categories</Label>
                {subCategoryFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`subCategories.${index}.value`)}
                      placeholder="Sub category ID"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSubCategory(index)}
                      disabled={subCategoryFields.length === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendSubCategory({ value: "" })}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sub Category
                </Button>
              </div>
            </div>

            <Separator />

            {/* Variants */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Product Variants</h3>
              {variantFields.map((variant, variantIndex) => (
                <Card key={variant.id} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Variant {variantIndex + 1}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeVariant(variantIndex)}
                      disabled={variantFields.length === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label>Model Name *</Label>
                      <Input
                        {...register(`variants.${variantIndex}.modelName`, {
                          required: true,
                        })}
                        placeholder="BLUE-123"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Model Code *</Label>
                      <Input
                        {...register(`variants.${variantIndex}.modelCode`, {
                          required: true,
                        })}
                        placeholder="SPACEGRY256"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price *</Label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register(`variants.${variantIndex}.price`, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        placeholder="44.90"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Stock *</Label>
                      <Input
                        type="number"
                        {...register(`variants.${variantIndex}.stock`, {
                          required: true,
                          valueAsNumber: true,
                        })}
                        placeholder="15"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>SKU *</Label>
                      <Input
                        {...register(`variants.${variantIndex}.sku`, {
                          required: true,
                        })}
                        placeholder="SPRT123-RED"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Barcode *</Label>
                      <Input
                        {...register(`variants.${variantIndex}.barcode`, {
                          required: true,
                        })}
                        placeholder="8680000000011"
                      />
                    </div>
                  </div>
                  <VariantAttributes
                    control={control}
                    variantIndex={variantIndex}
                    setValue={setValue}
                  />
                  <VariantImageUpload
                    imageName={`${watch("variants")[variantIndex].modelCode}_${
                      watch(`variants.${variantIndex}.attributes`).find(
                        (attr) => attr.key === "color"
                      )?.value || "default"
                    }.webp`}
                    variantIndex={variantIndex}
                    images={variantImages[variantIndex] || []}
                    onImagesChange={(images) =>
                      setVariantImages((prev) => ({
                        ...prev,
                        [variantIndex]: images,
                      }))
                    }
                  />
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendVariant({
                    modelName: "",
                    modelCode: "",
                    price: 0,
                    stock: 0,
                    sku: "",
                    barcode: "",
                    attributes: [{ key: "", value: "" }],
                  })
                }
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Variant
              </Button>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Gönder
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function VariantAttributes({
  control,
  variantIndex,
  setValue,
}: {
  control: any;
  variantIndex: number;
  setValue: any;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${variantIndex}.attributes`,
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

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Variant Attributes</Label>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <div className="flex-1">
            <Select
              onValueChange={(value) =>
                setValue(
                  `variants.${variantIndex}.attributes.${index}.key`,
                  value
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select attribute" />
              </SelectTrigger>
              <SelectContent>
                {attributeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            {...control.register(
              `variants.${variantIndex}.attributes.${index}.value`
            )}
            placeholder="Attribute value"
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => remove(index)}
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
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Attribute
      </Button>
    </div>
  );
}

function VariantImageUpload({
  variantIndex,
  images,
  onImagesChange,
  imageName,
}: {
  variantIndex: number;
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

  const removeImage = (imageIndex: number) => {
    onImagesChange(images.filter((_, i) => i !== imageIndex));
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Variant Images</Label>

      <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
        <div className="text-center">
          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <Label
            htmlFor={`variant-images-${variantIndex}`}
            className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Upload variant images
          </Label>
          <Input
            id={`variant-images-${variantIndex}`}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {images.map((file, imageIndex) => (
            <div key={imageIndex} className="relative group">
              <img
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                alt={`Variant ${variantIndex + 1} - Image ${imageIndex + 1}`}
                className="w-full h-20 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(imageIndex)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
              <p className="text-xs text-gray-500 mt-1 truncate">{file.name}</p>
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
