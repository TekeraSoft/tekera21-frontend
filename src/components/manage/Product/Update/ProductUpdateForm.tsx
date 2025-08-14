"use client";

import React, { useRef } from "react";

import { useEffect, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ICategory } from "@/types/AdminTypes/category";
import MarkdownEditor from "@/components/shared/Editor/MarkdownEditor";

import { useToast } from "@/hooks/use-toast";
import ProductVariantForm from "../Shared/ProductVariantForm";
import { IGetByIdProduct } from "@/types/SingleProduct";
import { SubCategoriesSelect } from "../Shared/SubCategoriesSelect";
import { TProductFormData } from "@/types/ProductFormData";
import ProductAttributes from "../Shared/ProductAttributes";
import CategorySelect from "../Shared/CategorySelect";
import GenderSelect from "../Shared/GenderSelect";
import GeneralInformation from "../Shared/MainFields/GeneralInformation";
import CurrencyAndProductType from "../Shared/MainFields/CurrencyAndProductType";
import ThemeSelect from "../Shared/MainFields/ThemeSelect";
import axios from "axios";
import { updateProduct } from "@/app/actions/server/product.actions";

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
  const [deletedVariants, setDeletedVariants] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [videoUrlState, setVideoUrlState] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const { toast } = useToast();

  const methods = useForm<TProductFormData>({
    defaultValues: {
      name: product.name,
      imageUrls: {},
      code: product.code,
      brandName: product.brandName,
      description: product.description,
      currencyType: product.currencyType,
      productType: product.productType,
      tags: product.tags?.map((tag) => ({ value: tag })) || [],
      categoryId: product.category.id || "",
      subCategories: categories
        .flatMap((cat) => cat.subCategories)
        .filter((sub) =>
          product.subCategories?.filter((prodSub) => prodSub.id === sub.id)
        )
        .map((sub) => ({ value: sub.id, name: sub.name, image: sub.image })),
      attributeDetails: product.attributeDetails,
      variants: product.variations,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = methods;

  useEffect(() => {
    if (product) {
      setVideoUrlState(product.videoUrl || null);
      reset({
        name: product.name,
        code: product.code,
        brandName: product.brandName,
        description: product.description,
        currencyType: product.currencyType,
        videoUrl: product.videoUrl,
        productType: product.productType,
        categoryId: product.category.id || "",
        tags: product.tags?.map((tag) => ({ value: tag })) || [],
        subCategories: categories
          .flatMap((cat) => cat.subCategories)
          .filter((sub) =>
            product.subCategories?.some((prodSub) => prodSub.id === sub.id)
          )
          .map((sub) => ({ value: sub.id, name: sub.name, image: sub.image })),
        attributeDetails: product.attributeDetails,
        variants: product.variations,
      });
    }
  }, [product, reset, categories]);

  const onSubmit = async (data: TProductFormData) => {
    // Transform data to match the required format
    setLoading(true);

    const formattedData = {
      name: data.name,
      id: product.id,
      code: data.code,
      brandName: data.brandName,
      description: data.description,
      categoryId: data.categoryId,
      videoUrl: videoUrlState,
      subCategories: data.subCategories?.map((item) => item.value),
      variants: data.variants.map((variation) => ({
        ...(variation.id ? { id: variation.id } : {}),
        modelName: variation.modelName,
        modelCode: variation.modelCode,
        color: variation.color,
        imageUrls: Object.values(watch("imageUrls") ?? {}).flatMap(
          (urls) => urls
        ),
        attributes: variation.attributes.map((attr, attrIndex) => ({
          attributeDetails: attr.attributeDetails?.filter(
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
      attributes: data.attributeDetails.filter(
        (attr) => attr.key && attr.value
      ),
      deleteImages: deleteImages,
      deletedVariants: deletedVariants,
    };

    console.log("formatted", formattedData);
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
          (stockAttributeImages[key] && stockAttributeImages[key].length > 0) ||
          data.variants[index].images?.length > 0;

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

    const { success, message } = await updateProduct(formData);
    if (success) {
      toast({
        title: "Başarılı",
        description: "Product is updated.",
        variant: "default",
      });
      setDeleteImages([]);
      setStockAttributeImages({});
      setLoading(false);
      setVideoUrlState(null);
    } else {
      toast({
        title: "Error",
        description: message || "Product cannot be updated.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleDeleteImages = (url: string, variationIndex: number) => {
    const variants = watch("variants");
    const currentImages = variants[variationIndex].images as string[];

    const updatedImages = currentImages.filter((img) => img !== url);

    setValue(`variants.${variationIndex}.images`, updatedImages);
    setDeleteImages((prev) => [...prev, url]);
    setVideoUrlState(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Backend'den presigned URL al (örnek endpoint)
      const { data: presignedUrl } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/company/getPresignedUrl`,
        {
          params: {
            objectName: crypto.randomUUID() + "." + file.name.split(".").pop(),
          },
        }
      );

      //PUT isteği ile videoyu direkt MinIO’ya yükle
      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percent);
        },
      });

      // MinIO'daki URL'yi kullanıcıya göstermek için
      const urlWithoutQueryParams = new URL(presignedUrl).pathname.replace(
        /^\/[^/]+\//,
        ""
      );
      setVideoUrlState(urlWithoutQueryParams);
    } catch (error) {
      console.error("Yükleme hatası:", error);
      alert("Yükleme sırasında hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteVideo = () => {
    setDeleteImages((prev) => [...prev, videoUrlState || ""]);
    setVideoUrlState(null);
  };

  console.log("product", product);

  return (
    <div className="mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Ürün düzenle</CardTitle>
          <CardDescription>
            Ürününüze ait aşağıdaki bilgileri güncelleyebilirsiniz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Genel Bilgiler</h3>
              <FormProvider {...methods}>
                <GeneralInformation />
              </FormProvider>

              <div className="space-y-2">
                <Label htmlFor="description">Açıklama *</Label>
                <Controller
                  control={control}
                  name="description"
                  rules={{ required: "Ürün açıklaması gereklidir." }}
                  render={({ field }) => (
                    <MarkdownEditor
                      defaultValue={product.description}
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
            </div>

            <Separator />

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

            {videoUrlState && !deleteImages.includes(videoUrlState) ? (
              <div className="space-y-2">
                <Label>Ürün Videosu</Label>
                <div className="flex flex-col mt-2">
                  Yeni video yüklemek için lütfen silin
                  <Button
                    type="button"
                    variant={"warning"}
                    className="w-max mt-1"
                    onClick={handleDeleteVideo}
                  >
                    Silmek için tıklayın.
                  </Button>
                </div>
                <video
                  src={
                    process.env.NEXT_PUBLIC_IMAGE_BASE_URL + "/" + videoUrlState
                  }
                  controls
                  className="w-full h-96 rounded-lg"
                />
              </div>
            ) : (
              <>
                <div className="p-4 space-y-4">
                  <button
                    onClick={handleUploadClick}
                    type="button"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    disabled={uploading}
                  >
                    {uploading
                      ? "Yükleniyor..."
                      : "Video Yükle (Presigned URL)"}
                  </button>

                  <input
                    type="file"
                    accept=".mp4, .mov"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />

                  {uploading && (
                    <div className="w-full bg-gray-200 h-4 rounded">
                      <div
                        className="bg-blue-500 h-3 rounded"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}

                  {videoUrlState && (
                    <video controls className="mt-4 max-w-full">
                      <source
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${videoUrlState}`}
                        type="video/mp4"
                      />
                      Tarayıcınız video etiketini desteklemiyor.
                    </video>
                  )}
                </div>

                {/*
                  <FileUploadEnhanced
                      name="video"
                      accept=".mp4,video/mp4"
                      label="Ürün video (isteğe bağlı)"
                      description="MP4, AVI up to 300MB"
                      icon="image"
                      setFile={(file) => setProductVideo(file)}
                      file={productVideo}
                  />
                  */}
              </>
            )}

            <Separator />

            {/* Tags */}
            <FormProvider {...methods}>
              <ThemeSelect />
            </FormProvider>

            <Separator />

            <FormProvider {...methods}>
              <GenderSelect />
            </FormProvider>

            <Separator />

            {/* Attributes */}

            <FormProvider {...methods}>
              <ProductAttributes />
            </FormProvider>

            <Separator />

            {/* Variations */}
            <FormProvider {...methods}>
              <ProductVariantForm
                setDeletedVariants={setDeletedVariants}
                stockAttributeImages={stockAttributeImages}
                setStockAttributeImages={setStockAttributeImages}
                handleDeleteImages={handleDeleteImages}
              />
            </FormProvider>
            <div className="flex gap-4">
              <Button disabled={loading} type="submit" className="flex-1">
                Gönder
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
