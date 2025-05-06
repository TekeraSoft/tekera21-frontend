import { ProductsHeader } from "@/components/superadmin/ProductsHeader";
import { ProductsTable } from "@/components/superadmin/ProductsTable";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-3 w-full">
      <ProductsHeader />
      <ProductsTable />
    </div>
  );
}
