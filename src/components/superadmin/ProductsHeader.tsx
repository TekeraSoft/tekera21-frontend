import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";
import ToggleSidebarButton from "./ToggleSidebarButton";

export function ProductsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
       <div className="flex items-center">
        <ToggleSidebarButton />
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 w-full sm:w-[250px]"
          />
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
    </div>
  );
}
