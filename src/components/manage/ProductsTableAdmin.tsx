"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowUpDown,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  CrossIcon,
  MoreHorizontal,
  Pencil,
  Target,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  changeStatus,
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  setError,
} from "@/store/manageSlices/product/productSlice";
import ProductTableSkeleton from "./Skeletons/Products/ProductTableSkeleton";
import ImageView from "../shared/ImageView";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "@/i18n/navigation";

import { useToast } from "@/hooks/use-toast";
import { IProduct } from "@/types/product";
import { Checkbox } from "../ui/checkbox";
import { deleteProductById } from "@/app/actions/server/product.actions";

export function ProductsTableAdmin() {
  const { data, error, loading, categories, selectedCategory, success } =
    useAppSelector((state) => state.adminProducts);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleDispatchProducts = (page: number, pageSize: number = 10) => {
    dispatch(fetchProducts({ page: page, size: pageSize }));
  };

  useEffect(() => {
    if (!success && !error) {
      dispatch(fetchProducts({ page: 0, size: 10 }));
      dispatch(fetchCategories({ page: 0, size: 10 }));
    }

    return () => {};
  }, [success, error]);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(null));
      }
    };
  }, [error]);

  const handleDelete = async () => {
    if (!selectedProduct) {
      toast({
        title: "Error",
        description: "Product is not selected.",
        variant: "default",
      });
      return;
    }
    const { success } = await deleteProductById(selectedProduct.id);

    if (success) {
      setShowDeleteDialog(false);
      toast({
        title: "Success",
        description: "Product is deleted.",
        variant: "default",
      });
      setSelectedProduct(null);
      dispatch(fetchProducts({ page: data.page.number, size: data.page.size }));
    } else {
      toast({
        title: "Error!",
        description: "Product isnt deleted.",
        variant: "destructive",
      });
    }
  };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "In Stock":
  //       return "bg-green-100 text-green-800";
  //     case "Low Stock":
  //       return "bg-yellow-100 text-yellow-800";
  //     case "Out of Stock":
  //       return "bg-red-100 text-red-800";
  //     default:
  //       return "bg-gray-100 text-gray-800";
  //   }
  // };

  const toggleRowExpansion = (productId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(productId)) {
      newExpandedRows.delete(productId);
    } else {
      newExpandedRows.add(productId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleRowClick = (e: React.MouseEvent, productId: string) => {
    // Dropdown menü tıklamalarını ignore et
    if ((e.target as HTMLElement).closest("[data-dropdown-trigger]")) {
      return;
    }
    e.preventDefault();
    toggleRowExpansion(productId);
  };
  const handleChangeProductIsActive = (prodId: string, status: boolean) => {
    dispatch(
      changeStatus({
        productId: prodId,
        status: status,
      })
    );
  };

  if (error) {
    return <div>{error}</div>;
  }

  return loading ? (
    <ProductTableSkeleton />
  ) : !data.page ? (
    <>{"data.page not found"}</>
  ) : (
    <Card>
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-1 flex-wrap gap-y-2 items-center space-x-2">
          <Select
            defaultValue="all"
            value={selectedCategory}
            onValueChange={(value) => {
              if (value !== "all") {
                dispatch(fetchProductsByCategory({ catSlug: value }));
              } else {
                dispatch(fetchProducts({ page: 0, size: 10 }));
              }
            }}
          >
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              {categories?.length &&
                categories?.map((cat) => (
                  <SelectItem key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={data.page.number.toString()}
            onValueChange={(value) => {
              handleDispatchProducts(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-28">
              Sayfa:
              <SelectValue placeholder={(data.page.number + 1).toString()} />
            </SelectTrigger>
            <SelectContent className="w-20">
              {Array.from({ length: data.page.totalPages }, (_, i) => i).map(
                (page) => (
                  <SelectItem key={page} value={page.toString()}>
                    {(page + 1).toString()}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <Select
            value={data.page.size.toString()}
            onValueChange={(value) => {
              handleDispatchProducts(data.page.number, Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-28">
              Adet:
              <SelectValue placeholder={"Adet: " + data.page.size.toString()} />
            </SelectTrigger>
            <SelectContent className="w-20">
              <SelectItem value={"10"}>10</SelectItem>
              <SelectItem value={"20"}>20</SelectItem>
              <SelectItem value={"30"}>30</SelectItem>
              <SelectItem value={"40"}>40</SelectItem>
              <SelectItem value={"50"}>50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Toplam <strong>{data?.page?.totalElements}</strong> üründen{" "}
            <strong>
              {data?.page?.totalElements < data?.page?.size
                ? data?.page?.totalElements
                : data?.page.size}
            </strong>
            'u gösteriliyor
          </p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Ürün Resmi</TableHead>
            <TableHead>
              <div className="flex items-center">
                Ürün Adı
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Marka</TableHead>
            <TableHead>Fiyat</TableHead>
            <TableHead>Stok Adeti</TableHead>
            <TableHead className="text-center">Ürün Aktifliği</TableHead>
            <TableHead className="text-right">Eylemler</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.content.map((product) => {
            const isExpanded = expandedRows.has(product.id);

            return (
              <React.Fragment key={product.id}>
                {/* Ana satır */}
                <TableRow
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={(e) => handleRowClick(e, product.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <ImageView
                        imageInfo={{
                          url:
                            product.variations[0].images[0] ||
                            "/placeholder.svg?height=64&width=64",
                          name: product.name,
                        }}
                        className="rounded-md object-cover w-16 h-16"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brandName || ""}</TableCell>
                  <TableCell>
                    {typeof product.variations[0]?.attributes[0]?.price ===
                    "number"
                      ? new Intl.NumberFormat("tr-TR", {
                          style: "currency",
                          currency: product.currencyType || "TRY",
                        }).format(product.variations[0]?.attributes[0]?.price)
                      : product.variations[0]?.attributes[0]?.price}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        product.variations[0]?.attributes[0]?.stock > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {product.variations[0]?.attributes[0]?.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      id="product-status"
                      className="cursor-pointer w-6 h-6"
                      checked={product.isActive}
                      onCheckedChange={() => {
                        handleChangeProductIsActive(
                          product.id,
                          !product.isActive
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          data-dropdown-trigger
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="z-[9999]">
                        <DropdownMenuLabel>Eylemler</DropdownMenuLabel>
                        <DropdownMenuItem className="px-0">
                          <Link
                            className="flex items-center w-full px-2"
                            href={`/manage/update/product/${product.id}`}
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Düzenle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-0">
                          <Link
                            className="flex items-center w-full px-2"
                            href={`/manage/create/target/${product.id}`}
                          >
                            <Target className="mr-2 h-4 w-4" /> Ar İçerik
                            Oluştur
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProduct(product);
                            setShowDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>

                {/* Genişletilmiş içerik satırı */}
                {isExpanded && (
                  <TableRow>
                    <TableCell colSpan={8} className="p-0 bg-muted/20">
                      <div className="p-6 space-y-4">
                        <h4 className="font-semibold text-lg">
                          Ürün Detayları
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {/* Temel Bilgiler */}
                          <div className="space-y-2">
                            <h5 className="font-medium text-sm text-muted-foreground uppercase">
                              Temel Bilgiler
                            </h5>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>ID:</span>
                                <span className="font-mono">{product.id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Marka:</span>
                                <span>
                                  {product.brandName || "Belirtilmemiş"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Fiyat ve Stok Bilgileri */}
                          <div className="space-y-2">
                            <h5 className="font-medium text-sm text-muted-foreground uppercase">
                              Stok
                            </h5>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Stok:</span>
                                <span
                                  className={
                                    product.variations[0]?.attributes[0]
                                      ?.stock > 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }
                                >
                                  {product.variations[0]?.attributes[0]?.stock}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Durum:</span>
                                <span
                                  className={
                                    product.variations[0]?.attributes[0]
                                      ?.stock > 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }
                                >
                                  {product.variations[0]?.attributes[0]?.stock >
                                  0
                                    ? "Stokta"
                                    : "Tükendi"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Varyasyon Bilgileri */}
                          <div className="space-y-2">
                            <h5 className="font-medium text-sm text-muted-foreground uppercase">
                              Varyasyonlar
                            </h5>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Toplam Varyasyon:</span>
                                <span>{product.variations.length}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Toplam Resim:</span>
                                <span>
                                  {
                                    product.variations.flatMap(
                                      (variation) => variation.images
                                    ).length
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Açıklama */}
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Kategori:</span>
                          <div className="flex items-center gap-1 text-sm text-gray-700">
                            <span>
                              {product.category?.name || "Belirtilmemiş"}
                            </span>
                            {product.subCategories?.length > 0 &&
                              product.subCategories.map((sub, index) => (
                                <span
                                  key={sub.id}
                                  className="flex items-center"
                                >
                                  <span className="mx-1 text-gray-400">
                                    {">"}
                                  </span>
                                  <span>{sub.name}</span>
                                </span>
                              ))}
                          </div>
                        </div>
                        {product.description && (
                          <div className="space-y-2">
                            <h5 className="font-medium text-sm text-muted-foreground uppercase">
                              Açıklama
                            </h5>
                            <p className="text-sm text-muted-foreground">
                              {product.description}
                            </p>
                          </div>
                        )}

                        {/* Tüm Resimler */}

                        <div className="space-y-2">
                          <h5 className="font-medium text-sm text-muted-foreground uppercase">
                            Tüm Resimler
                          </h5>
                          <div className="space-y-4">
                            {product?.variations?.map(
                              (variation, variationIndex) => (
                                <div
                                  key={variationIndex}
                                  className="border-b-2 pb-4"
                                >
                                  <h3 className="font-semibold">
                                    Varyasyon {variationIndex + 1}
                                  </h3>

                                  <div>
                                    <span className="font-semibold text-gray-700">
                                      Renk:
                                    </span>{" "}
                                    {variation.color}
                                  </div>
                                  <div>
                                    <span className="font-semibold text-gray-700">
                                      Model Adı:
                                    </span>{" "}
                                    {variation.modelName}
                                  </div>
                                  <div>
                                    <span className="font-semibold text-gray-700">
                                      Model Kodu:
                                    </span>{" "}
                                    {variation.modelCode}
                                  </div>

                                  <div className="overflow-x-auto rounded-lg border border-gray-200 my-2">
                                    <table className="min-w-full text-sm text-left text-gray-700">
                                      <thead className="bg-gray-100">
                                        <tr>
                                          <th className="px-4 py-2 font-medium">
                                            Beden
                                          </th>
                                          <th className="px-4 py-2 font-medium">
                                            Fiyat
                                          </th>
                                          <th className="px-4 py-2 font-medium">
                                            İndirimli Fiyat
                                          </th>
                                          <th className="px-4 py-2 font-medium">
                                            Stok
                                          </th>
                                          <th className="px-4 py-2 font-medium">
                                            Durum
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-gray-100">
                                        {variation?.attributes?.map(
                                          (attr, index) => {
                                            const size =
                                              attr.attributeDetails?.find(
                                                (atd) =>
                                                  atd.key.toLowerCase() ===
                                                  "size"
                                              )?.value;

                                            const price = attr.price ?? "-";
                                            const stock = attr.stock ?? "-";
                                            const isAvailable =
                                              Number(attr.stock) > 0;
                                            const discountPrice =
                                              attr.discountPrice ?? "-";

                                            return (
                                              <tr
                                                key={index}
                                                className="hover:bg-gray-50"
                                              >
                                                <td className="px-4 py-2">
                                                  {size || "-"}
                                                </td>
                                                <td className="px-4 py-2">
                                                  {typeof price === "number"
                                                    ? new Intl.NumberFormat(
                                                        "tr-TR",
                                                        {
                                                          style: "currency",
                                                          currency:
                                                            product.currencyType ||
                                                            "TRY",
                                                        }
                                                      ).format(price)
                                                    : price}
                                                </td>
                                                <td className="px-4 py-2">
                                                  {typeof discountPrice ===
                                                  "number"
                                                    ? new Intl.NumberFormat(
                                                        "tr-TR",
                                                        {
                                                          style: "currency",
                                                          currency:
                                                            product.currencyType ||
                                                            "TRY",
                                                        }
                                                      ).format(discountPrice)
                                                    : price}
                                                </td>
                                                <td className="px-4 py-2">
                                                  {stock}
                                                </td>
                                                <td className="px-4 py-2">
                                                  {isAvailable ? (
                                                    <span className="inline-flex items-center gap-1 text-green-600">
                                                      <CheckCircle className="w-4 h-4" />
                                                      Var
                                                    </span>
                                                  ) : (
                                                    <span className="inline-flex items-center gap-1 text-red-600">
                                                      <CrossIcon className="w-4 h-4" />
                                                      Yok
                                                    </span>
                                                  )}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </tbody>
                                    </table>
                                  </div>

                                  <h4 className="font-bold mt-1">Resimler</h4>
                                  <div className="flex gap-2 flex-wrap">
                                    {variation.images?.length > 0 ? (
                                      variation.images.map(
                                        (image: string, imageIndex: number) => (
                                          <ImageView
                                            key={imageIndex}
                                            imageInfo={{
                                              url:
                                                image ||
                                                "/placeholder.svg?height=80&width=80",
                                              name: `${
                                                product.name
                                              } - Varyasyon ${
                                                variationIndex + 1
                                              } - Görsel ${imageIndex + 1}`,
                                            }}
                                            className="rounded-md object-cover w-20 h-20 border"
                                          />
                                        )
                                      )
                                    ) : (
                                      <span className="text-sm text-gray-500">
                                        Görsel yok
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu işlem geri alınamaz. {selectedProduct?.name || "Bu ürün"}{" "}
              kalıcı olarak silinecek ve tüm veriler kaybolacak.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          onClick={() =>
            dispatch(
              fetchProducts({
                page: data.page.number - 1,
                size: data.page.size,
              })
            )
          }
          disabled={data.page.number === 0}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            dispatch(
              fetchProducts({
                page: data.page.number + 1,
                size: data.page.size,
              })
            )
          }
          disabled={data.page.number + 1 >= data.page.totalPages}
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </div>
    </Card>
  );
}
