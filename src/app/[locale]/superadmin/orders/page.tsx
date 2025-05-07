import AdminInnerLayout from "@/components/superadmin/AdminInnerLayout";
import { AdminOrdersHeader } from "@/components/superadmin/AdminOrdersHeader";
import { AdminOrdersTable } from "@/components/superadmin/AdminOrdersTable";
import TopBar from "@/components/superadmin/TopBar";

export default function OrdersPage() {
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <AdminInnerLayout>
        <AdminOrdersHeader />
        <AdminOrdersTable />
      </AdminInnerLayout>
    </>
  );
}
