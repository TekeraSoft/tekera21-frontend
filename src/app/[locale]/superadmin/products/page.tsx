import { ProductsHeader } from "@/components/superadmin/ProductsHeader";
import { ProductsTable } from "@/components/superadmin/ProductsTable";
import TopBar from "@/components/superadmin/TopBar";

export default function AdminProductsPage() {
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <div className="flex flex-col gap-6 px-6 py-3 w-full">
        <ProductsHeader />
        <ProductsTable />
      </div>
    </>
  );
}
