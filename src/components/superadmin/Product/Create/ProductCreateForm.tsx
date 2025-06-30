"use client";

import type React from "react";

import { useState } from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  Controller,
} from "react-hook-form";
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

import { createProduct } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import ProductVariantForm from "../Shared/ProductVariantForm";
import { TProductFormData } from "@/types/ProductFormData";
import { SubCategoriesSelect } from "../Shared/SubCategoriesSelect";
import ProductAttributes from "../Shared/ProductAttributes";
import CategorySelect from "../Shared/CategorySelect";
import GenderSelect from "../Shared/GenderSelect";
import { genders } from "../Shared/Data/Genders";
import { cn } from "@/lib/utils";

export default function ProductCreateForm({
  categories,
}: {
  categories: ICategory[];
}) {
  const [stockAttributeImages, setStockAttributeImages] = useState<{
    [key: string]: File[];
  }>({});
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const methods = useForm<TProductFormData>({
    defaultValues: {
      currencyType: "TRY",
      productType: "PHYSICAL",
      tags: [{ value: "" }],
      categoryId: "",
      companyId: "",
      subCategories: [],
      attributeDetails: [{ key: "", value: "" }],
      variants: [
        {
          modelName: "",
          modelCode: "",
          images: [],
          color: "",
          attributes: [],
        },
      ],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = methods;

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit = async (data: TProductFormData) => {
    // Transform data to match the required format
    setLoading(true);
    const formattedData = {
      name: data.name,
      code: data.code,
      companyId: data.companyId,
      brandName: data.brandName,
      description: data.description,
      categoryId: data.categoryId,
      subCategories: data.subCategories?.map((sub) => sub.value),
      variants: data.variants.map((variation) => ({
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
      attributeDetails: data.attributeDetails.filter(
        (attr) => attr.key && attr.value
      ),
    };
    console.log("formatted", formattedData);
    // console.log("stockImages", stockAttributeImages);
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

    const checkForm = () => {
      if (!formattedData.variants.length) {
        return false;
      }
      return formattedData.variants.every((variant) =>
        variant.attributes.some((item) => {
          if (!item.price || !item.barcode || !item.stock || !item.sku) {
            return false;
          } else {
            return true;
          }
        })
      );
    };
    const checkImages = () => {
      return formattedData.variants.every((_, index) => {
        const key = String(index);
        const hasImage =
          stockAttributeImages[key] && stockAttributeImages[key].length > 0;

        return hasImage;
      });
    };

    if (!checkForm()) {
      toast({
        title: "Error",
        description:
          "Fiyat, barkod, stok adeti veya stok kodu alanları eksik. Lütfen gözden geçirin. ",
        variant: "default",
      });
      setLoading(false);
      return;
    }
    if (!checkImages()) {
      toast({
        title: "Error",
        description:
          "Varyantlardan en az birinde resimler eksik. Lütfen gözden geçirin. ",
        variant: "default",
      });
      setLoading(false);
      return;
    }
    const { success } = await createProduct(formData);
    if (success) {
      toast({
        title: "Success",
        description: "Product is created.",
        variant: "default",
      });
      setStockAttributeImages({});
      setLoading(false);
      reset();
    } else {
      toast({
        title: "Error",
        description: "Product cannot be created.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className=" mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Yeni ürün oluşturun</CardTitle>
          <CardDescription>
            Aşağıdaki forma ürün bilgilerinizi giriniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ürün ismi *</Label>
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
                <Controller
                  control={control}
                  name="description"
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <MarkdownEditor
                      defaultValue={field.value}
                      onChange={field.onChange}
                    />
                  )}
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

                  <Controller
                    control={control}
                    name="currencyType"
                    rules={{ required: "Currency is required" }}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue="TRY">
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TRY">TRY</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />

                  {errors.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
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
                      <SelectItem value="PHYSICAL">Fiziksel</SelectItem>
                      <SelectItem value="DIGITAL">Dijital</SelectItem>
                      <SelectItem value="SERVICE">Hizmet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Categories */}

            <FormProvider {...methods}>
              <CategorySelect categories={categories} />
              <SubCategoriesSelect
                name="subCategories"
                label="Subcategories"
                subCategories={
                  categories.find((cat) => cat.id === watch("categoryId"))
                    ?.subCategories || []
                }
              />
            </FormProvider>

            <Separator />

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tags</h3>
              {tagFields.map((field, index) => (
                <div
                  key={field.id}
                  className={cn(
                    "flex gap-2",
                    genders.includes(field.value) && "hidden"
                  )}
                >
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

            <FormProvider {...methods}>
              <GenderSelect />
            </FormProvider>

            <Separator />

            {/* Attributes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Attributes</h3>
              <FormProvider {...methods}>
                <ProductAttributes />
              </FormProvider>
            </div>

            <Separator />

            {/* Variations */}

            <FormProvider {...methods}>
              <ProductVariantForm
                stockAttributeImages={stockAttributeImages}
                setStockAttributeImages={setStockAttributeImages}
                handleDeleteImages={undefined}
              />
            </FormProvider>
            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                Gönder
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
