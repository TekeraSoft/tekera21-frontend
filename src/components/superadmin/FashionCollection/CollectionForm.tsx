"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, X, Minus, SwitchCamera } from "lucide-react";

import ImageView from "@/components/shared/ImageView";
import { updateCollection } from "@/app/actions";
import MarkdownEditor from "@/components/shared/Editor/MarkdownEditor";
import { FileUploadEnhanced } from "@/components/shared/FileUploadEnhanced";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { IProduct } from "@/types/product";
import {
  fetchProducts,
  setError,
} from "@/store/superadminSlices/product/productSlice";

import { IFashionCollection } from "@/types/Collection";

const CollectionForm = ({
  defaultData,
}: {
  defaultData: IFashionCollection;
}) => {
  const { data, error, loading, success } = useAppSelector(
    (state) => state.adminProducts
  );
  const pageCount = data.page.number;
  const size = 8;

  const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([]);
  const [collectionImage, setCollectionImage] = useState<File | null>(null);
  const [defaultImage, setDefaultImage] = useState<File | null>(null);
  const [loadingUpdateCollection, setLoadingUpdateCollection] = useState(false);
  const [collection, setCollection] = useState<IFashionCollection>(defaultData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);

  const hasMore = data.page.totalPages > data.page.number;
  const dispatch = useAppDispatch();

  const { toast } = useToast();

  useEffect(() => {
    if (!success && !error && pageCount === 0) {
      dispatch(fetchProducts({ page: 0, size: size }));
    }

    return () => {
      if (error) {
        dispatch(setError(null));
      }
    };
  }, [success, error, pageCount]);

  useEffect(() => {
    if (pageCount === 0 && data.content?.length > 0 && !loading) {
      setDisplayedProducts(data.content);
    }
    if (pageCount > 0 && !loading && data.page.number === pageCount) {
      if (data.content?.length !== 0) {
        setDisplayedProducts((prev) => [...prev, ...data.content]);
      }
    }

    return () => {};
  }, [pageCount, data, loading]);

  const loadMoreProducts = () => {
    if (loading || !hasMore) return;
    dispatch(fetchProducts({ page: pageCount + 1, size: size }));
  };

  const handleInputChange = (
    field: keyof IFashionCollection,
    value: string
  ) => {
    setCollection((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addProduct = (product: IProduct) => {
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight + 100 && hasMore && !loading) {
      loadMoreProducts();
    }
  };

  async function urlToFile(
    url: string,
    fileName: string,
    mimeType = "image/jpeg"
  ): Promise<File> {
    const imageUrl =
      process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
      (url.startsWith("/") ? url : `/${url}`);
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new File([blob], fileName, { type: mimeType });
  }

  useEffect(() => {
    const fetchImage = async () => {
      const file = await urlToFile(
        defaultData.image,
        collection.collectionName,
        "image/jpeg"
      );
      setDefaultImage(file);
    };

    fetchImage();
  }, [defaultData]);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoadingUpdateCollection(true);
    e.preventDefault();
    const formData = new FormData();
    // console.log("collection state", collection);
    formData.append(`collectionName`, collection.collectionName);
    formData.append(`id`, defaultData.id);
    formData.append(`description`, collection.description);

    if (collectionImage) {
      formData.append(`image`, collectionImage);
    } else {
      formData.append("image", new File([""], ""), "empty.jpg");
    }

    collection.products?.map((product) =>
      formData.append(`products`, product.id)
    );

    const { success: successUpdateCollection, message } =
      await updateCollection(formData);
    if (successUpdateCollection) {
      setLoadingUpdateCollection(false);
      toast({
        title: "Başarılı!",
        description: "Koleksiyon Güncellendi.",
        variant: "default",
      });
    } else {
      setLoadingUpdateCollection(false);
      toast({
        title: "Error",
        description:
          message || "Koleksiyon güncellenemedi.. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    }
  };

  console.log(
    "dis",
    displayedProducts.length &&
      displayedProducts.map((item) => {
        if (item.variations[0]?.attributes) {
          return `attr- ${item.variations[0].attributes[0].price}`;
        } else {
          return item.variations[0];
        }
      })
  );
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Koleksiyonu Düzenle
        </h1>
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
                value={collection.collectionName}
                onChange={(e) =>
                  handleInputChange("collectionName", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collection-description">Açıklama</Label>
              <MarkdownEditor
                id={"collection-description"}
                defaultValue={collection.description}
                onChange={(value) => handleInputChange("description", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                {defaultImage ? (
                  <div className="relative">
                    <FileUploadEnhanced
                      name="image"
                      accept="image/*"
                      label="Koleksiyon fotoğrafı"
                      description="PNG, JPG, GIF up to 10MB"
                      icon="image"
                      setFile={(file: File | null) => {
                        setCollectionImage(file);
                        setDefaultImage(null);
                        handleInputChange(
                          "image",
                          file ? URL.createObjectURL(file) : ""
                        );
                      }}
                      file={defaultImage}
                    />
                  </div>
                ) : (
                  <FileUploadEnhanced
                    name="image"
                    accept="image/*"
                    label="Koleksiyon fotoğrafı"
                    description="PNG, JPG, GIF up to 10MB"
                    icon="image"
                    setFile={(file: File | null) => {
                      setCollectionImage(file);
                      handleInputChange(
                        "image",
                        file ? URL.createObjectURL(file) : ""
                      );
                    }}
                    file={collectionImage}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Ürünler ({collection.products?.length})</CardTitle>
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
                    <DialogTitle>Koleksiyona Ürün Ekle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Ürün ara..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div> */}
                    <div
                      className="max-h-96 overflow-y-auto grid grid-cols-2 gap-2 space-y-2"
                      onScroll={handleScroll}
                    >
                      {displayedProducts.length &&
                        displayedProducts.map((product) => (
                          <div
                            key={product.id}
                            className="flex hover:bg-primary/20 items-center space-x-3 p-3 border rounded-lg cursor-pointer"
                            onClick={() =>
                              collection.products.some(
                                (col) => col.id === product.id
                              )
                                ? removeProduct(product.id)
                                : addProduct(product)
                            }
                          >
                            <ImageView
                              imageInfo={{
                                name: product.name,
                                url:
                                  product.variations[0].images[0] ||
                                  "/placeholder.svg",
                              }}
                              className="w-20 h-20 rounded object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-xs">
                                {product.name}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-semibold">
                                  {product?.variations[0].attributes &&
                                    product?.variations[0].attributes[0]?.price.toLocaleString(
                                      product.currencyType === "TRY"
                                        ? "tr-TR"
                                        : "en-US",
                                      {
                                        style: "currency",
                                        currency: product.currencyType,
                                      }
                                    )}
                                </span>
                                <Badge variant="square" className="text-[7px]">
                                  {product.subCategories.length &&
                                    product.subCategories[
                                      product.subCategories.length - 1
                                    ].name}
                                </Badge>
                              </div>
                            </div>
                            {collection.products.some(
                              (col) => col.id === product.id
                            ) ? (
                              <Minus className="h-8 w-8 text-gray-400 hover:text-primary" />
                            ) : (
                              <Plus className="h-8 w-8 text-gray-400 hover:text-primary" />
                            )}
                          </div>
                        ))}
                      {/* {loading && (
                          <div className="text-center py-4">
                            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                            <p className="mt-2 text-sm text-gray-500">
                              Ürünler yükleniyor...
                            </p>
                          </div>
                        )} */}
                      {displayedProducts.length === 0 && !loading && (
                        <p className="text-center text-gray-500 py-8">
                          Ürün bulunamadı
                        </p>
                      )}
                      {!hasMore && displayedProducts.length > 0 && (
                        <p className="text-center text-gray-500 py-4 text-sm">
                          Tüm ürünler gösterildi
                        </p>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {collection.products?.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="space-y-2">
                  <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Plus className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Ürün eklenmedi
                  </h3>
                  <p className="text-gray-500">
                    Başlamak için koleksiyonunuza ürün ekleyin
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {collection.products?.map((product) => (
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
                    <ImageView
                      imageInfo={{
                        name: product.name,
                        url:
                          product.variations[0].images[0] || "/placeholder.svg",
                      }}
                      className="w-20 h-20 rounded object-cover"
                    />
                    <h4 className="font-medium mb-1">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      {/* <span className="text-lg font-semibold">
                        ₺{product.variations[0]?.attributes[0]?.price}
                      </span> */}
                      <Badge variant="square">
                        {product.subCategories?.length &&
                          product.subCategories[
                            product.subCategories?.length - 1
                          ].name}
                      </Badge>
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
            className="text-xl"
            disabled={
              !collection.collectionName.trim() ||
              collection.products?.length === 0 ||
              loadingUpdateCollection
            }
          >
            Güncelle
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;
