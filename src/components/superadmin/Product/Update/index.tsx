"use client";

import type React from "react";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Minus } from "lucide-react";

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

import { updateProduct } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import ProductVariantForm from "../Shared/ProductVariantForm";

import { IGetByIdProduct } from "@/types/SingleProduct";
import { SubCategoriesSelect } from "./SubCategoriesSelect";
import { TProductFormData } from "@/types/ProductFormData";

export default function ProductUpdateForm({
  categories,
  product,
}: {
  categories: ICategory[];
  product: IGetByIdProduct;
}) {
  const [stockAttributeImages, setStockAttributeImages] = useState<{
    [key: string]: File[];
  }>({});

  const [deleteImages, setDeleteImages] = useState<string[]>([]);
  const { toast } = useToast();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TProductFormData>({
    defaultValues: {
      name: product.name,
      code: product.code,
      brandName: product.brandName,
      description: product.description,
      currencyType: product.currencyType,
      productType: product.productType,
      tags: product.tags?.map((tag) => ({ value: tag })) || [],
      companyId: product.company.id,
      categoryId: product.categoryId || "",
      subCategories: categories
        .flatMap((cat) => cat.subCategories)
        .filter((sub) => product.subCategoriesId?.includes(sub.id))
        .map((sub) => ({ value: sub.id, name: sub.name, image: sub.image })),
      attributes: product.attributes,
      variants: product.variations,
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

  const onSubmit = async (data: TProductFormData) => {
    // Transform data to match the required format
    const formattedData = {
      name: data.name,
      id: product.id,
      code: data.code,
      brandName: data.brandName,
      description: data.description,
      categoryId: data.categoryId,
      subCategories: data.subCategories?.map((item) => item.value),
      variants: data.variants.map((variation) => ({
        id: variation.id || "",
        modelName: variation.modelName,
        modelCode: variation.modelCode,
        color: variation.color,
        attributes: variation.attributes.map((attr, attrIndex) => ({
          attributeDetails: attr.attributeDetails.filter(
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
      deleteImages: deleteImages,
    };
    // console.log("formatted", formattedData);
    // console.log("deleteImages", deleteImages);
    // console.log("stockImages", stockAttributeImages);
    const formData = new FormData();
    formData.append(
      "data",
      new Blob([JSON.stringify(formattedData)], { type: "application/json" })
    );

    if (Object.values(stockAttributeImages).length) {
      Object.values(stockAttributeImages).forEach((fileArray) => {
        fileArray.forEach((file) => {
          formData.append(`images`, file);
        });
      });
    } else {
      formData.append("images", new File([""], ""), "empty.jpg");
    }

    const { success } = await updateProduct(formData);
    if (success) {
      toast({
        title: "Success",
        description: "Product is updated.",
        variant: "default",
      });
    } else {
      toast({
        title: "Error",
        description: "Product cannot be updated.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteImages = (url: string, variationIndex: number) => {
    const variants = watch("variants");
    const currentImages = variants[variationIndex].images as string[];

    const updatedImages = currentImages.filter((img) => img !== url);

    setValue(`variants.${variationIndex}.images`, updatedImages);
    setDeleteImages((prev) => [...prev, url]);
  };

  return (
    <div className=" mx-auto p-6">
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
                  defaultValue={product.description}
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

            <ProductVariantForm
              setValue={setValue}
              watch={watch}
              control={control}
              stockAttributeImages={stockAttributeImages}
              setStockAttributeImages={setStockAttributeImages}
              handleDeleteImages={handleDeleteImages}
            />

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
