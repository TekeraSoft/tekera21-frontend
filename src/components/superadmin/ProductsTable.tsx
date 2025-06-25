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
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  ParenthesesIcon,
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
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  setError,
} from "@/store/superadminSlices/product/productSlice";
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
import { deleteProductById } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { IProduct } from "@/types/product";

export function ProductsTable() {
  const { data, error, loading, categories, selectedCategory, success } =
    useAppSelector((state) => state.adminProducts);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const dispatch = useAppDispatch();
  const { toast } = useToast();

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

  if (error) {
    return <div>{error}</div>;
  }

  return loading ? (
    <ProductTableSkeleton />
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
              <SelectItem value="all">All Categories</SelectItem>
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
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <strong>
              {data.page.totalElements < data.page.size
                ? data.page.totalElements
                : data.page.size}
            </strong>{" "}
            of <strong>{data.page.totalElements}</strong> products
          </p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>
              <div className="flex items-center">
                Product
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead className="text-right">Actions</TableHead> */}
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
                    ${product.variations[0].attributes[0].price}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        product.variations[0].attributes[0].stock > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {product.variations[0].attributes[0].stock}
                    </span>
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
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="px-0">
                          <Link
                            className="flex items-center w-full px-2"
                            href={`/superadmin/update/product/${product.id}`}
                          >
                            <Pencil className="mr-2 h-4 w-4" /> Düzenle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="px-0">
                          <Link
                            className="flex items-center w-full px-2"
                            href={`/superadmin/create/target/${product.id}`}
                          >
                            <Target className="mr-2 h-4 w-4" /> Create Target
                            Picture
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
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>

                {/* Genişletilmiş içerik satırı */}
                {isExpanded && (
                  <TableRow>
                    <TableCell colSpan={6} className="p-0 bg-muted/20">
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
                              <div className="flex justify-between">
                                <span>Kategori:</span>
                                <span>{product.code || "Belirtilmemiş"}</span>
                              </div>
                            </div>
                          </div>

                          {/* Fiyat ve Stok Bilgileri */}
                          <div className="space-y-2">
                            <h5 className="font-medium text-sm text-muted-foreground uppercase">
                              Fiyat & Stok
                            </h5>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Fiyat:</span>
                                <span className="font-semibold">
                                  ${product.variations[0].attributes[0].price}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Stok:</span>
                                <span
                                  className={
                                    product.variations[0].attributes[0].stock >
                                    0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }
                                >
                                  {product.variations[0].attributes[0].stock}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Durum:</span>
                                <span
                                  className={
                                    product.variations[0].attributes[0].stock >
                                    0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }
                                >
                                  {product.variations[0].attributes[0].stock > 0
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
                            {product.variations.map(
                              (variation, variationIndex) => (
                                <div key={variationIndex}>
                                  <h3 className="font-semibold">
                                    Varyasyon {variationIndex + 1}
                                  </h3>

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
            dispatch(fetchProducts({ page: data.page.number - 1, size: 10 }))
          }
          disabled={data.page.number === 0}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            dispatch(fetchProducts({ page: data.page.number + 1, size: 100 }))
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
