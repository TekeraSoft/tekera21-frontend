"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

export function ProductsTable() {
  const { data, error, loading, categories, selectedCategory } = useAppSelector(
    (state) => state.adminProducts
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data.products.length) {
      dispatch(fetchProducts({ page: 0, size: 10 }));
      dispatch(fetchCategories({ page: 0, size: 10 }));
    }

    return () => {};
  }, [data.products]);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(null));
      }
    };
  }, [error]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
            Showing <strong>{data.size}</strong> of{" "}
            <strong>{data.total}</strong> products
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
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead className="text-right">Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.title}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge
                  className={getStatusColor(product.availabilityStatus)}
                  variant="outline"
                >
                  {product.availabilityStatus}
                </Badge>
              </TableCell>
              {/* <TableCell className="text-right">
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
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className="mr-2 h-4 w-4" />
                      Mark as featured
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          onClick={() =>
            dispatch(fetchProducts({ page: 10, size: data.size - 10 }))
          }
          disabled={data.size <= 10}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            dispatch(fetchProducts({ page: 10, size: data.size + 10 }))
          }
          disabled={data.total <= data.page * data.size}
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </div>
    </Card>
  );
}
