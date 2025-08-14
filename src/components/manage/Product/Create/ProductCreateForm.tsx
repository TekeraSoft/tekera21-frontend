"use client";

import type React from "react";

import { useState } from "react";
import { useForm, FormProvider, Controller, set } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ICategory } from "@/types/AdminTypes/category";
import MarkdownEditor from "@/components/shared/Editor/MarkdownEditor";

import { useToast } from "@/hooks/use-toast";
import ProductVariantForm from "../Shared/ProductVariantForm";
import { TProductFormData } from "@/types/ProductFormData";
import { SubCategoriesSelect } from "../Shared/SubCategoriesSelect";
import ProductAttributes from "../Shared/ProductAttributes";
import CategorySelect from "../Shared/CategorySelect";
import GenderSelect from "../Shared/GenderSelect";
import GeneralInformation from "../Shared/MainFields/GeneralInformation";
import CurrencyAndProductType from "../Shared/MainFields/CurrencyAndProductType";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ThemeSelect from "../Shared/MainFields/ThemeSelect";
import { createProduct } from "@/app/actions/server/product.actions";

export default function ProductCreateForm({
  categories,
}: {
  categories: ICategory[];
}) {
  const [stockAttributeImages, setStockAttributeImages] = useState<{
    [key: string]: File[];
  }>({});
  const [productVideo, setProductVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [step, setStep] = useState(1);

  const { toast } = useToast();

  const methods = useForm<TProductFormData>({
    defaultValues: {
      currencyType: "TRY",
      productType: "PHYSICAL",
      tags: [],
      categoryId: "",
      subCategories: [],
      attributeDetails: [{ key: "", value: "" }],
      variants: [],
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    trigger,
  } = methods;

  const onSubmit = async (data: TProductFormData) => {
    // Transform data to match the required format
    setLoading(true);
    const formattedData = {
      name: data.name,
      code: data.code,
      brandName: data.brandName,
      description: data.description,
      categoryId: data.categoryId,
      subCategories: data.subCategories?.map((sub) => sub.value),

      variants: data.variants.map((variation) => ({
        modelName: variation.modelName,
        modelCode: variation.modelCode,
        color: variation.color,
        imageUrls: Object.values(watch("imageUrls") ?? {}).flatMap(
          (urls) => urls
        ),
        attributes: variation.attributes.map((attr, attrIndex) => ({
          attributeDetails: attr.attributeDetails.filter(
            (sa) => sa.key && sa.value
          ),
          stock: attr.stock,
          maxPurchaseStock: attr.maxPurchaseStock,
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

    if (productVideo) {
      formData.append("video", productVideo);
    } else {
      formData.append("video", new File([""], ""), "empty.mov");
    }

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
    const { success, message } = await createProduct(formData);
    if (success) {
      toast({
        title: "Başarılı!",
        description: "Ürün oluşturuldu.",
        variant: "default",
      });
      setStockAttributeImages({});
      setLoading(false);
      reset();
      setStep(1);
    } else {
      toast({
        title: "Error",
        description: message || "Ürün oluşturulamadı. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const stepFields: Record<number, (keyof TProductFormData)[]> = {
    1: ["name", "brandName", "categoryId", "subCategories", "code", "tags"],
    2: ["description", "currencyType", "productType"],
    3: ["tags", "attributeDetails"],
    4: ["variants"],
  };

  const handleIncreaseStep = async () => {
    // Validate the current step before proceeding
    const currentStepFields = stepFields[step];

    const isValid = await trigger(currentStepFields);

    if (!isValid) {
      console.log("validation failed");
      toast({
        title: "Ürün validasyonu başarısız!",
        description: "Lütfen geçerli bilgileri girin.",
        variant: "destructive",
      });
      return;
    }
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };
  const handleDecreaseStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row justify-between">
          <div className="w-max">
            <CardTitle>Yeni ürün oluşturun</CardTitle>
            <CardDescription className="mt-2">
              Aşağıdaki forma ürün bilgilerinizi giriniz.
            </CardDescription>
          </div>
          <span className="font-bold text-xl">
            Adım <span className="text-teal-700">{step}</span>/4
          </span>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            {step === 1 && (
              <div className="space-y-4">
                <FormProvider {...methods}>
                  <GeneralInformation />
                  <GenderSelect />
                </FormProvider>
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

                {/* <FileUploadEnhanced
                  name="video"
                  accept=".mp4,video/mp4"
                  label="Ürün video (isteğe bağlı)"
                  description="MP4 (300MB)"
                  icon="image"
                  setFile={(file) => setProductVideo(file)}
                  file={productVideo}
                /> */}
              </div>
            )}
            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="description">Açıklama *</Label>
                  <Controller
                    control={control}
                    name="description"
                    rules={{ required: "Ürün açıklaması gereklidir." }}
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
                <FormProvider {...methods}>
                  <CurrencyAndProductType />
                </FormProvider>
              </>
            )}

            {step === 3 && (
              <FormProvider {...methods}>
                <ThemeSelect />
                <ProductAttributes />
              </FormProvider>
            )}

            {/* Variations */}

            {step === 4 && (
              <>
                <FormProvider {...methods}>
                  <ProductVariantForm
                    stockAttributeImages={stockAttributeImages}
                    setStockAttributeImages={setStockAttributeImages}
                    handleDeleteImages={undefined}
                    setDeletedVariants={undefined}
                  />
                </FormProvider>
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" disabled={loading}>
                    Gönder
                  </Button>
                </div>
              </>
            )}
            <div className="flex gap-3 justify-end">
              {step !== 1 && (
                <Button
                  className="flex gap-1 items-center"
                  type="button"
                  onClick={handleDecreaseStep}
                >
                  <ChevronLeft /> Bir önceki adıma dön
                </Button>
              )}
              {step < 4 && (
                <Button
                  className="flex gap-1 items-center"
                  type="button"
                  onClick={handleIncreaseStep}
                >
                  Bir Sonraki adıma geç <ChevronRight />
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
