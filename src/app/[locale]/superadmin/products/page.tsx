import AdminInnerLayout from "@/components/superadmin/AdminInnerLayout";
import { ProductsHeader } from "@/components/superadmin/ProductsHeader";
import { ProductsTable } from "@/components/superadmin/ProductsTable";
import TopBar from "@/components/superadmin/TopBar";

export default function AdminProductsPage() {
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <AdminInnerLayout>
        <ProductsHeader />
        <ProductsTable />
      </AdminInnerLayout>
    </>
  );
}
