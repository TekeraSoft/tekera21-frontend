"use client";

import { useEffect, useState } from "react";
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
import { fetchProducts } from "@/store/superadminSlices/product/productSlice";

export function ProductsTable() {
  const [products, setProducts] = useState([
    {
      id: "PROD-001",
      name: "Wireless Headphones",
      image: "/placeholder.svg?height=40&width=40",
      category: "Electronics",
      price: "$129.99",
      stock: 45,
      status: "In Stock",
    },
    {
      id: "PROD-002",
      name: "Smart Watch",
      image: "/placeholder.svg?height=40&width=40",
      category: "Electronics",
      price: "$199.99",
      stock: 32,
      status: "In Stock",
    },
    {
      id: "PROD-003",
      name: "Cotton T-Shirt",
      image: "/placeholder.svg?height=40&width=40",
      category: "Clothing",
      price: "$24.99",
      stock: 89,
      status: "In Stock",
    },
    {
      id: "PROD-004",
      name: "Bluetooth Speaker",
      image: "/placeholder.svg?height=40&width=40",
      category: "Electronics",
      price: "$79.99",
      stock: 21,
      status: "In Stock",
    },
    {
      id: "PROD-005",
      name: "Running Shoes",
      image: "/placeholder.svg?height=40&width=40",
      category: "Footwear",
      price: "$89.99",
      stock: 54,
      status: "In Stock",
    },
    {
      id: "PROD-006",
      name: "Leather Wallet",
      image: "/placeholder.svg?height=40&width=40",
      category: "Accessories",
      price: "$49.99",
      stock: 76,
      status: "In Stock",
    },
    {
      id: "PROD-007",
      name: "Smartphone Case",
      image: "/placeholder.svg?height=40&width=40",
      category: "Accessories",
      price: "$19.99",
      stock: 120,
      status: "In Stock",
    },
    {
      id: "PROD-008",
      name: "Desk Lamp",
      image: "/placeholder.svg?height=40&width=40",
      category: "Home",
      price: "$34.99",
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: "PROD-009",
      name: "Coffee Mug",
      image: "/placeholder.svg?height=40&width=40",
      category: "Home",
      price: "$14.99",
      stock: 65,
      status: "In Stock",
    },
    {
      id: "PROD-010",
      name: "Yoga Mat",
      image: "/placeholder.svg?height=40&width=40",
      category: "Fitness",
      price: "$29.99",
      stock: 42,
      status: "In Stock",
    },
  ]);

  const {
    products: productsFake,
    error,
    loading,
  } = useAppSelector((state) => state.adminProducts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());

    return () => {};
  }, []);

  console.log("first", productsFake, error, loading);

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

  return (
    <Card>
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-1 flex-wrap gap-y-2 items-center space-x-2">
          <Select defaultValue="all">
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="footwear">Footwear</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="fitness">Fitness</SelectItem>
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
            Showing <strong>10</strong> of <strong>100</strong> products
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
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge
                  className={getStatusColor(product.status)}
                  variant="outline"
                >
                  {product.status}
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
        <Button variant="outline" size="sm">
          Previous
        </Button>
        <Button variant="outline" size="sm">
          Next
        </Button>
      </div>
    </Card>
  );
}
