"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

// Örnek kategoriler
const categories = [
  { id: "1", name: "Giyim" },
  { id: "2", name: "Ayakkabı" },
  { id: "3", name: "Aksesuar" },
  { id: "4", name: "Elektronik" },
  { id: "5", name: "Ev & Yaşam" },
];

// Örnek alt kategoriler
const subcategories = {
  "1": [
    { id: "101", name: "Tişört" },
    { id: "102", name: "Gömlek" },
    { id: "103", name: "Pantolon" },
    { id: "104", name: "Elbise" },
    { id: "105", name: "Ceket" },
  ],
  "2": [
    { id: "201", name: "Spor Ayakkabı" },
    { id: "202", name: "Bot" },
    { id: "203", name: "Sandalet" },
  ],
  "3": [
    { id: "301", name: "Çanta" },
    { id: "302", name: "Saat" },
    { id: "303", name: "Takı" },
  ],
  "4": [
    { id: "401", name: "Telefon" },
    { id: "402", name: "Bilgisayar" },
    { id: "403", name: "Tablet" },
  ],
  "5": [
    { id: "501", name: "Mobilya" },
    { id: "502", name: "Mutfak" },
    { id: "503", name: "Dekorasyon" },
  ],
};

// Örnek bedenler
const sizeOptions = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "Tek Beden",
];

// Örnek renkler
const colorOptions = [
  { name: "Siyah", value: "#000000" },
  { name: "Beyaz", value: "#FFFFFF" },
  { name: "Kırmızı", value: "#FF0000" },
  { name: "Mavi", value: "#0000FF" },
  { name: "Yeşil", value: "#008000" },
  { name: "Sarı", value: "#FFFF00" },
  { name: "Mor", value: "#800080" },
  { name: "Turuncu", value: "#FFA500" },
  { name: "Gri", value: "#808080" },
  { name: "Pembe", value: "#FFC0CB" },
];

export default function SellerProductCreateForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [productImages, setProductImages] = useState<string[]>([]);

  // Varyasyonlar için state
  const [variants, setVariants] = useState<{
    sizes: string[];
    colors: { name: string; value: string }[];
  }>({
    sizes: [],
    colors: [],
  });

  // Ürün bilgileri için state
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
    isActive: true,
    isFeatured: false,
  });

  // Form değişikliklerini izleme
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Switch değişikliklerini izleme
  const handleSwitchChange = (name: string, checked: boolean) => {
    setProductData((prev) => ({ ...prev, [name]: checked }));
  };

  // Kategori değişikliğini izleme
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory("");
  };

  // Beden ekleme
  const addSize = (size: string) => {
    if (!variants.sizes.includes(size)) {
      setVariants((prev) => ({
        ...prev,
        sizes: [...prev.sizes, size],
      }));
    }
  };

  // Beden silme
  const removeSize = (size: string) => {
    setVariants((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  // Renk ekleme
  const addColor = (color: { name: string; value: string }) => {
    if (!variants.colors.some((c) => c.name === color.name)) {
      setVariants((prev) => ({
        ...prev,
        colors: [...prev.colors, color],
      }));
    }
  };

  // Renk silme
  const removeColor = (colorName: string) => {
    setVariants((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c.name !== colorName),
    }));
  };

  // Görsel ekleme simülasyonu
  const handleImageUpload = () => {
    // Gerçek uygulamada burada dosya yükleme işlemi olacak
    // Şimdilik placeholder görsel ekliyoruz
    setProductImages((prev) => [
      ...prev,
      `/placeholder.svg?height=200&width=200&text=Ürün+Görseli+${
        prev.length + 1
      }`,
    ]);
  };

  // Görsel silme
  const removeImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Form gönderme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Burada API'ye ürün verilerini gönderme işlemi olacak
      console.log("Ürün verileri:", {
        ...productData,
        category: selectedCategory,
        subcategory: selectedSubcategory,
        variants,
        images: productImages,
      });

      // Başarılı kayıt sonrası yönlendirme
      setTimeout(() => {
        alert("Ürün başarıyla oluşturuldu!");
        router.push("/dashboard/store/products");
      }, 1500);
    } catch (error) {
      console.error("Ürün oluşturma hatası:", error);
      alert("Ürün oluşturulurken bir hata oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
            <TabsTrigger value="variants">Varyasyonlar</TabsTrigger>
            <TabsTrigger value="images">Görseller</TabsTrigger>
          </TabsList>

          {/* Genel Bilgiler Sekmesi */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ürün Adı</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ürün adını girin"
                      value={productData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sku">Stok Kodu (SKU)</Label>
                    <Input
                      id="sku"
                      name="sku"
                      placeholder="Stok kodunu girin"
                      value={productData.sku}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Fiyat (₺)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={productData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">Stok Miktarı</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      placeholder="0"
                      min="0"
                      value={productData.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subcategory">Alt Kategori</Label>
                    <Select
                      value={selectedSubcategory}
                      onValueChange={setSelectedSubcategory}
                      disabled={!selectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Alt kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedCategory &&
                          subcategories[
                            selectedCategory as keyof typeof subcategories
                          ]?.map((subcat) => (
                            <SelectItem key={subcat.id} value={subcat.id}>
                              {subcat.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Ürün Açıklaması</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Ürün açıklamasını girin"
                      rows={5}
                      value={productData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={productData.isActive}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("isActive", checked)
                      }
                    />
                    <Label htmlFor="isActive">Aktif Ürün</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={productData.isFeatured}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("isFeatured", checked)
                      }
                    />
                    <Label htmlFor="isFeatured">Öne Çıkan Ürün</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Varyasyonlar Sekmesi */}
          <TabsContent value="variants" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-6">
                  {/* Beden Seçenekleri */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Beden Seçenekleri</Label>
                      <Select onValueChange={(value) => addSize(value)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Beden ekle" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizeOptions.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {variants.sizes.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Henüz beden eklenmedi
                        </p>
                      ) : (
                        variants.sizes.map((size) => (
                          <div
                            key={size}
                            className="flex items-center bg-muted rounded-md px-3 py-1"
                          >
                            <span>{size}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 ml-1"
                              onClick={() => removeSize(size)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Bedeni kaldır</span>
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Renk Seçenekleri */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Renk Seçenekleri</Label>
                      <Select
                        onValueChange={(value) => {
                          const selectedColor = colorOptions.find(
                            (c) => c.name === value
                          );
                          if (selectedColor) addColor(selectedColor);
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Renk ekle" />
                        </SelectTrigger>
                        <SelectContent>
                          {colorOptions.map((color) => (
                            <SelectItem key={color.name} value={color.name}>
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

                    <div className="flex flex-wrap gap-2">
                      {variants.colors.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Henüz renk eklenmedi
                        </p>
                      ) : (
                        variants.colors.map((color) => (
                          <div
                            key={color.name}
                            className="flex items-center bg-muted rounded-md px-3 py-1"
                          >
                            <div
                              className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                              style={{ backgroundColor: color.value }}
                            />
                            <span>{color.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 ml-1"
                              onClick={() => removeColor(color.name)}
                            >
                              <X className="h-3 w-3" />
                              <span className="sr-only">Rengi kaldır</span>
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Görseller Sekmesi */}
          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Ürün Görselleri</Label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleImageUpload}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Görsel Ekle
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {productImages.length === 0 ? (
                      <p className="text-sm text-muted-foreground col-span-full">
                        Henüz görsel eklenmedi
                      </p>
                    ) : (
                      productImages.map((src, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={src || "/placeholder.svg"}
                            alt={`Ürün görseli ${index + 1}`}
                            width={200}
                            height={200}
                            className="rounded-md border object-cover aspect-square"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
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
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            İptal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Kaydediliyor..." : "Ürünü Kaydet"}
          </Button>
        </div>
      </div>
    </form>
  );
}
