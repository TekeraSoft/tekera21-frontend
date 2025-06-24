"use client";

import { useEffect, useState } from "react";
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

export function ProductsTable() {
  const { data, error, loading, categories, selectedCategory, success } =
    useAppSelector((state) => state.adminProducts);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const handleDelete = async (productId: string) => {
    const { success } = await deleteProductById(productId);

    if (success) {
      setShowDeleteDialog(false);
      toast({
        title: "Success",
        description: "Product is deleted.",
        variant: "default",
      });
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
          {data.content.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <ImageView
                  imageInfo={{
                    url: product.variations[0].images[0] || "/placeholder.svg",
                    name: product.name,
                  }}
                  className="rounded-md object-cover w-16 h-16"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.brandName || ""}</TableCell>
              <TableCell>{product.variations[0].attributes[0].price}</TableCell>
              <TableCell>{product.variations[0].attributes[0].stock}</TableCell>
              {/* <TableCell>
                <Badge
                  className={getStatusColor(product.availabilityStatus)}
                  variant="outline"
                >
                  {product.availabilityStatus}
                </Badge>
              </TableCell> */}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      <Link
                        className="flex items-center"
                        href={`/superadmin/update/product/${product.id}`}
                      >
                        Edit Product
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        className="flex items-center"
                        href={`/superadmin/create/target/${product.id}`}
                      >
                        <Target className="mr-2 h-4 w-4" />
                        Create Target Picture
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4" />
                      Mark as featured
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => setShowDeleteDialog(true)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bu işlem geri alınamaz. {product.name || "Bu ürün"} kalıcı
                      olarak silinecek ve tüm veriler kaybolacak.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Sil
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
