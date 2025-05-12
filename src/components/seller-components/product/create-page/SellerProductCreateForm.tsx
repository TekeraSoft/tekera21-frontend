"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ImageIcon,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  categories,
  colorOptions,
  sizeOptions,
  subcategories,
} from "@/data/productCreateValues";

// Görsel tipi
type ProductImage = {
  id: string;
  file: File | null;
  preview: string;
};

// Zod şeması
const productSchema = z.object({
  name: z.string().min(3, { message: "Ürün adı en az 3 karakter olmalıdır" }),
  description: z
    .string()
    .min(10, { message: "Ürün açıklaması en az 10 karakter olmalıdır" }),
  price: z.string().min(1, { message: "Fiyat alanı zorunludur" }),
  stock: z.string().min(1, { message: "Stok alanı zorunludur" }),
  sku: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  category: z.string().min(1, { message: "Kategori seçimi zorunludur" }),
  subcategory: z.string().optional(),
});

// Form tipi
type ProductFormValues = z.infer<typeof productSchema>;

// Varyant tipi
type Variant = {
  id: string;
  color: { name: string; value: string };
  sizes: string[];
  stock: Record<string, string>;
  images: ProductImage[];
};

export default function SellerProductCreateForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [expandedVariant, setExpandedVariant] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  // File input refs
  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const variantFileInputRefs = useRef<Record<string, HTMLInputElement | null>>(
    {}
  );

  // React Hook Form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      sku: "",
      isActive: true,
      isFeatured: false,
      category: "",
      subcategory: "",
    },
  });

  // Alt kategori seçimini sıfırlama
  const watchCategory = form.watch("category");
  useEffect(() => {
    form.setValue("subcategory", "");
  }, [watchCategory, form]);

  // Renk varyantı ekleme
  const addColorVariant = () => {
    if (!selectedColor) return;

    const color = colorOptions.find((c) => c.name === selectedColor);
    if (!color) return;

    // Aynı renk zaten varsa ekleme
    if (variants.some((v) => v.color.name === color.name)) {
      setSelectedColor("");
      return;
    }

    const newVariant: Variant = {
      id: Date.now().toString(),
      color: color,
      sizes: [],
      stock: {},
      images: [],
    };

    setVariants((prev) => [...prev, newVariant]);
    setSelectedColor("");
    setExpandedVariant(newVariant.id);
  };

  // Varyant silme
  const removeVariant = (variantId: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== variantId));
    if (expandedVariant === variantId) {
      setExpandedVariant(null);
    }
  };

  // Varyant için beden ekleme/çıkarma
  const toggleSizeForVariant = (variantId: string, size: string) => {
    setVariants((prev) =>
      prev.map((variant) => {
        if (variant.id === variantId) {
          const newSizes = variant.sizes.includes(size)
            ? variant.sizes.filter((s) => s !== size)
            : [...variant.sizes, size];

          // Yeni stok kayıtları
          const newStock = { ...variant.stock };

          if (!variant.sizes.includes(size)) {
            // Beden eklendiyse varsayılan değerler ekle
            newStock[size] = form.getValues("stock") || "0";
          } else {
            // Beden çıkarıldıysa kayıtları temizle
            delete newStock[size];
          }

          return {
            ...variant,
            sizes: newSizes,
            stock: newStock,
          };
        }
        return variant;
      })
    );
  };

  // Varyant stok değişikliği
  const handleVariantStockChange = (
    variantId: string,
    size: string,
    value: string
  ) => {
    setVariants((prev) =>
      prev.map((variant) => {
        if (variant.id === variantId) {
          return {
            ...variant,
            stock: {
              ...variant.stock,
              [size]: value,
            },
          };
        }
        return variant;
      })
    );
  };

  // Ana ürün görseli ekleme
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newImages: ProductImage[] = [];

    Array.from(e.target.files).forEach((file) => {
      // Dosya türü kontrolü
      if (!file.type.startsWith("image/")) return;

      const imageId =
        Date.now().toString() + Math.random().toString(36).substring(2, 9);
      newImages.push({
        id: imageId,
        file: file,
        preview: URL.createObjectURL(file),
      });
    });

    setProductImages((prev) => [...prev, ...newImages]);

    // Input değerini sıfırla (aynı dosyayı tekrar seçebilmek için)
    if (e.target) e.target.value = "";
  };

  // Varyant görseli ekleme
  const handleVariantImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    variantId: string
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const newImages: ProductImage[] = [];

    Array.from(e.target.files).forEach((file) => {
      // Dosya türü kontrolü
      if (!file.type.startsWith("image/")) return;

      const imageId =
        Date.now().toString() + Math.random().toString(36).substring(2, 9);
      newImages.push({
        id: imageId,
        file: file,
        preview: URL.createObjectURL(file),
      });
    });

    setVariants((prev) =>
      prev.map((variant) => {
        if (variant.id === variantId) {
          return {
            ...variant,
            images: [...variant.images, ...newImages],
          };
        }
        return variant;
      })
    );

    // Input değerini sıfırla (aynı dosyayı tekrar seçebilmek için)
    if (e.target) e.target.value = "";
  };

  // Ana ürün görseli silme
  const removeMainImage = (imageId: string) => {
    setProductImages((prev) => {
      const updatedImages = prev.filter((img) => img.id !== imageId);

      // Silinen görselin önbelleğini temizle
      const imageToRemove = prev.find((img) => img.id === imageId);
      if (imageToRemove?.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }

      return updatedImages;
    });
  };

  // Varyant görseli silme
  const removeVariantImage = (variantId: string, imageId: string) => {
    setVariants((prev) =>
      prev.map((variant) => {
        if (variant.id === variantId) {
          // Silinen görselin önbelleğini temizle
          const imageToRemove = variant.images.find(
            (img) => img.id === imageId
          );
          if (imageToRemove?.preview) {
            URL.revokeObjectURL(imageToRemove.preview);
          }

          return {
            ...variant,
            images: variant.images.filter((img) => img.id !== imageId),
          };
        }
        return variant;
      })
    );
  };

  // Varyant genişletme/daraltma
  const toggleVariantExpand = (variantId: string) => {
    setExpandedVariant(expandedVariant === variantId ? null : variantId);
  };

  // Ref callback fonksiyonu
  const setVariantFileInputRef = useCallback(
    (el: HTMLInputElement | null, variantId: string) => {
      variantFileInputRefs.current[variantId] = el;
      return el;
    },
    []
  );

  // Form gönderme
  const onSubmit: any = async (data: ProductFormValues) => {
    setIsLoading(true);
    setFormError(null);

    try {
      // Görsel kontrolü
      if (productImages.length === 0) {
        setFormError("En az bir ürün görseli eklemelisiniz");
        setIsLoading(false);
        return;
      }

      // Varyant kontrolü
      if (variants.length === 0) {
        setFormError("En az bir renk varyantı eklemelisiniz");
        setIsLoading(false);
        return;
      }

      // Varyant beden kontrolü
      const hasVariantWithoutSizes = variants.some(
        (variant) => variant.sizes.length === 0
      );
      if (hasVariantWithoutSizes) {
        setFormError("Tüm renk varyantları için en az bir beden seçmelisiniz");
        setIsLoading(false);
        return;
      }

      // Burada API'ye ürün verilerini gönderme işlemi olacak
      // Örnek FormData oluşturma
      const formData = new FormData();

      // Ürün bilgilerini ekle
      Object.entries(data).forEach(([key, value]: any) => {
        formData.append(key, value.toString());
      });

      // Ana ürün görsellerini ekle
      productImages.forEach((image, index) => {
        if (image.file) {
          formData.append(`productImages[${index}]`, image.file);
        }
      });

      // Varyantları ekle (JSON olarak)
      const variantsData = variants.map((variant) => {
        // Dosya olmadan varyant verisi
        const { images, ...variantWithoutImages } = variant;
        return variantWithoutImages;
      });
      formData.append("variants", JSON.stringify(variantsData));

      // Varyant görsellerini ekle
      variants.forEach((variant, variantIndex) => {
        variant.images.forEach((image, imageIndex) => {
          if (image.file) {
            formData.append(
              `variantImages[${variantIndex}][${imageIndex}]`,
              image.file
            );
          }
        });
      });

      console.log("Ürün verileri gönderiliyor...");
      // Gerçek uygulamada burada API çağrısı yapılır
      // await fetch('/api/products', { method: 'POST', body: formData })

      // Başarılı kayıt sonrası yönlendirme
      setTimeout(() => {
        alert("Ürün başarıyla oluşturuldu!");
      }, 1500);
    } catch (error) {
      console.error("Ürün oluşturma hatası:", error);
      setFormError(
        "Ürün oluşturulurken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Temizleme işlemi
  const cleanupPreviews = () => {
    // Ana ürün görsellerinin önbelleğini temizle
    productImages.forEach((image) => {
      if (image.preview) URL.revokeObjectURL(image.preview);
    });

    // Varyant görsellerinin önbelleğini temizle
    variants.forEach((variant) => {
      variant.images.forEach((image) => {
        if (image.preview) URL.revokeObjectURL(image.preview);
      });
    });
  };

  // Component unmount olduğunda önbelleği temizle
  useEffect(() => {
    return () => {
      cleanupPreviews();
    };
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        )}

        {/* Genel Bilgiler */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Genel Bilgiler</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Ürün Adı</FormLabel>
                      <FormControl>
                        <Input placeholder="Ürün adını girin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Stok Kodu (SKU)</FormLabel>
                      <FormControl>
                        <Input placeholder="Stok kodunu girin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Ürün Fiyatı (₺)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Varsayılan Stok Miktarı</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          placeholder="0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Kategori</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Alt Kategori</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!form.getValues("category")}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Alt kategori seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {form.getValues("category") &&
                            subcategories[
                              form.getValues(
                                "category"
                              ) as keyof typeof subcategories
                            ]?.map((subcat) => (
                              <SelectItem key={subcat.id} value={subcat.id}>
                                {subcat.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-2 md:col-span-2">
                      <FormLabel>Ürün Açıklaması</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ürün açıklamasını girin"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="isActive"
                        />
                      </FormControl>
                      <FormLabel htmlFor="isActive" className="!mt-0">
                        Aktif Ürün
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="isFeatured"
                        />
                      </FormControl>
                      <FormLabel htmlFor="isFeatured" className="!mt-0">
                        Öne Çıkan Ürün
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ana Ürün Görselleri */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ana Ürün Görselleri</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Ürün Görselleri</Label>
                  <div className="flex gap-2">
                    <input
                      type="file"
                      id="main-product-images"
                      accept="image/*"
                      multiple
                      className="hidden"
                      ref={mainFileInputRef}
                      onChange={handleMainImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => mainFileInputRef.current?.click()}
                      className="flex items-center gap-1"
                    >
                      <Upload className="h-4 w-4" />
                      Görsel Yükle
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {productImages.length === 0 ? (
                    <div className="col-span-full border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-muted-foreground">
                      <ImageIcon className="h-10 w-10 mb-2" />
                      <p className="text-sm text-center">
                        Henüz görsel eklenmedi. "Görsel Yükle" butonuna
                        tıklayarak ürün görselleri ekleyebilirsiniz.
                      </p>
                    </div>
                  ) : (
                    productImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square rounded-md border overflow-hidden bg-muted">
                          <Image
                            src={image.preview || "/placeholder.svg"}
                            alt={`Ürün görseli`}
                            width={200}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeMainImage(image.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Görseli sil</span>
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ürün Varyantları */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Ürün Varyantları</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Renk Ekleme */}
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="color-select">Renk Ekle</Label>
                    <Select
                      value={selectedColor}
                      onValueChange={setSelectedColor}
                    >
                      <SelectTrigger id="color-select">
                        <SelectValue placeholder="Renk seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((color) => (
                          <SelectItem
                            key={color.name}
                            value={color.name}
                            disabled={variants.some(
                              (v) => v.color.name === color.name
                            )}
                          >
                            <div className="flex items-center">
                              <div
                                className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                                style={{ backgroundColor: color.value }}
                              />
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="button"
                    onClick={addColorVariant}
                    disabled={
                      !selectedColor ||
                      variants.some((v) => v.color.name === selectedColor)
                    }
                  >
                    Renk Ekle
                  </Button>
                </div>

                {/* Varyant Listesi */}
                {variants.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>
                      Henüz varyant eklenmedi. Ürün varyantı oluşturmak için
                      renk ekleyin.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        {/* Varyant Başlık */}
                        <div
                          className="flex items-center justify-between p-4 cursor-pointer"
                          onClick={() => toggleVariantExpand(variant.id)}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded-full border border-gray-300"
                              style={{ backgroundColor: variant.color.value }}
                            />
                            <span className="font-medium">
                              {variant.color.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({variant.sizes.length} beden,{" "}
                              {variant.images.length} görsel)
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeVariant(variant.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Varyantı sil</span>
                            </Button>
                            {expandedVariant === variant.id ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </div>
                        </div>

                        {/* Varyant İçeriği */}
                        {expandedVariant === variant.id && (
                          <div className="p-4 border-t bg-muted/30">
                            <div className="space-y-6">
                              {/* Varyant Görselleri */}
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <Label>
                                    {variant.color.name} Rengi Görselleri
                                  </Label>
                                  <div className="flex gap-2">
                                    <input
                                      type="file"
                                      id={`variant-images-${variant.id}`}
                                      accept="image/*"
                                      multiple
                                      className="hidden"
                                      ref={(el) =>
                                        setVariantFileInputRef(el, variant.id)
                                      }
                                      onChange={(e) =>
                                        handleVariantImageUpload(e, variant.id)
                                      }
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        variantFileInputRefs.current[
                                          variant.id
                                        ]?.click()
                                      }
                                      className="flex items-center gap-1"
                                    >
                                      <Upload className="h-3 w-3" />
                                      Görsel Yükle
                                    </Button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                  {variant.images.length === 0 ? (
                                    <div className="col-span-full border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center text-muted-foreground">
                                      <ImageIcon className="h-8 w-8 mb-2" />
                                      <p className="text-xs text-center">
                                        Bu renk için henüz görsel eklenmedi.
                                        "Görsel Yükle" butonuna tıklayarak
                                        görseller ekleyebilirsiniz.
                                      </p>
                                    </div>
                                  ) : (
                                    variant.images.map((image) => (
                                      <div
                                        key={image.id}
                                        className="relative group"
                                      >
                                        <div className="aspect-square rounded-md border overflow-hidden bg-muted">
                                          <Image
                                            src={
                                              image.preview ||
                                              "/placeholder.svg"
                                            }
                                            alt={`${variant.color.name} görseli`}
                                            width={150}
                                            height={150}
                                            className="object-cover w-full h-full"
                                          />
                                        </div>
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          size="icon"
                                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                                          onClick={() =>
                                            removeVariantImage(
                                              variant.id,
                                              image.id
                                            )
                                          }
                                        >
                                          <Trash2 className="h-3 w-3" />
                                          <span className="sr-only">
                                            Görseli sil
                                          </span>
                                        </Button>
                                      </div>
                                    ))
                                  )}
                                </div>
                              </div>

                              {/* Beden Seçimi */}
                              <div>
                                <Label className="mb-2 block">
                                  Mevcut Bedenler
                                </Label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                  {sizeOptions.map((size) => (
                                    <div
                                      key={size}
                                      className="flex items-center space-x-2"
                                    >
                                      <Checkbox
                                        id={`${variant.id}-size-${size}`}
                                        checked={variant.sizes.includes(size)}
                                        onCheckedChange={() =>
                                          toggleSizeForVariant(variant.id, size)
                                        }
                                      />
                                      <Label
                                        htmlFor={`${variant.id}-size-${size}`}
                                        className="text-sm cursor-pointer"
                                      >
                                        {size}
                                      </Label>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Seçili Bedenlerin Stok Bilgileri */}
                              {variant.sizes.length > 0 && (
                                <div>
                                  <Label className="mb-2 block">
                                    Beden Detayları
                                  </Label>
                                  <div className="overflow-x-auto">
                                    <table className="w-full min-w-[500px] border-collapse">
                                      <thead>
                                        <tr className="bg-muted">
                                          <th className="text-left p-2 border">
                                            Beden
                                          </th>
                                          <th className="text-left p-2 border">
                                            Stok
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {variant.sizes.map((size) => (
                                          <tr key={size}>
                                            <td className="p-2 border">
                                              {size}
                                            </td>
                                            <td className="p-2 border">
                                              <Input
                                                type="number"
                                                min="0"
                                                value={
                                                  variant.stock[size] || ""
                                                }
                                                onChange={(e) =>
                                                  handleVariantStockChange(
                                                    variant.id,
                                                    size,
                                                    e.target.value
                                                  )
                                                }
                                                className="h-8"
                                              />
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Butonları */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            İptal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Kaydediliyor..." : "Ürünü Kaydet"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
