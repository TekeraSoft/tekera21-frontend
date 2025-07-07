"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Plus, X, Upload, ImageIcon } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Collection {
  name: string;
  description: string;
  image: string;
  products: Product[];
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    image: "/placeholder.svg?height=100&width=100",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=100&width=100",
    category: "Electronics",
  },
  {
    id: "3",
    name: "Coffee Mug",
    price: 15.99,
    image: "/placeholder.svg?height=100&width=100",
    category: "Home",
  },
  {
    id: "4",
    name: "Notebook",
    price: 12.99,
    image: "/placeholder.svg?height=100&width=100",
    category: "Stationery",
  },
  {
    id: "5",
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "/placeholder.svg?height=100&width=100",
    category: "Electronics",
  },
  {
    id: "6",
    name: "Water Bottle",
    price: 24.99,
    image: "/placeholder.svg?height=100&width=100",
    category: "Sports",
  },
];

export default function CreateCollectionPage() {
  const [collection, setCollection] = useState<Collection>({
    name: "",
    description: "",
    image: "",
    products: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !collection.products.some((p) => p.id === product.id)
  );

  const handleInputChange = (field: keyof Collection, value: string) => {
    setCollection((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addProduct = (product: Product) => {
    setCollection((prev) => ({
      ...prev,
      products: [...prev.products, product],
    }));
    // setIsProductDialogOpen(false);
    setSearchTerm("");
  };

  const removeProduct = (productId: string) => {
    setCollection((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== productId),
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleInputChange("image", imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Collection created:", collection);
    // Here you would typically send the data to your API
    alert("Collection created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Yeni Koleksiyon Oluştur
          </h1>
          <p className="mt-2 text-gray-600">
            Müşterileriniz için özenle seçilmiş bir ürün koleksiyonu oluşturun
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Collection Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detaylar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="collection-name">Koleksiyon ismi *</Label>
                <Input
                  id="collection-name"
                  placeholder="Koleksiyonun ismini girin"
                  value={collection.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collection-description">Açıklama</Label>
                <Textarea
                  id="collection-description"
                  placeholder="Koleksiyonunuzun detayını girin."
                  rows={4}
                  value={collection.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Koleksiyon fotoğrafı</Label>
                <div className="flex items-center space-x-4">
                  {collection.image ? (
                    <div className="relative">
                      <Image
                        src={collection.image || "/placeholder.svg"}
                        alt="Collection preview"
                        width={120}
                        height={120}
                        className="rounded-lg object-cover border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => handleInputChange("image", "")}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50">
                        <Upload className="h-4 w-4" />
                        <span>Fotoğraf yükle</span>
                      </div>
                    </Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Bu koleksiyondaki ürünler ({collection.products.length})
                </CardTitle>
                <Dialog
                  open={isProductDialogOpen}
                  onOpenChange={setIsProductDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button type="button" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Ürün Ekle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        Ürünleri koleksiyonunuza ekleyin
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Ürünleri ara.."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <div className="max-h-96 overflow-y-auto space-y-2">
                        {filteredProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                            onClick={() => addProduct(product)}
                          >
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={50}
                              height={50}
                              className="rounded object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{product.name}</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-semibold">
                                  ${product.price}
                                </span>
                                <Badge variant="square">
                                  {product.category}
                                </Badge>
                              </div>
                            </div>
                            <Plus className="h-4 w-4 text-gray-400" />
                          </div>
                        ))}
                        {filteredProducts.length === 0 && (
                          <p className="text-center text-gray-500 py-8">
                            Ürün bulunamadı.
                          </p>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {collection.products.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="space-y-2">
                    <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Hiç ürün eklenmedi.
                    </h3>
                    <p className="text-gray-500">
                      Ürünleri koleksiyona ekleyerek koleksiyonunuzu tamamlayın.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {collection.products.map((product) => (
                    <div
                      key={product.id}
                      className="relative border rounded-lg p-4 bg-white"
                    >
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeProduct(product.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                      <h4 className="font-medium mb-1">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">
                          ${product.price}
                        </span>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <Button
              type="submit"
              variant={"secondary"}
              disabled={
                !collection.name.trim() || collection.products.length === 0
              }
            >
              Oluştur
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
