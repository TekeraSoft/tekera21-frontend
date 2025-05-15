"use client";
import { Input } from "@/components/ui/input";
import { BookPlus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  searchProduct,
  setSearchTerm,
} from "@/store/superadminSlices/product/productSlice";
import { useRef } from "react";

export function ProductsHeader() {
  const dispatch = useAppDispatch();
  const { searchTerm } = useAppSelector((state) => state.adminProducts);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchTerm(value));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(searchProduct({ query: value }));
    }, 500);
  };
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search products..."
              className="pl-8 w-full sm:w-[250px]"
            />
          </div>
        </div>
        <Link href={"products/attributes"}>
          <Button>
            <BookPlus className="mr-2 h-4 w-4" />
            Öznitelik Ekle
          </Button>
        </Link>
      </div>
    </div>
  );
}
