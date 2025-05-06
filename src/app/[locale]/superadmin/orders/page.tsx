import { AdminOrdersHeader } from "@/components/superadmin/AdminOrdersHeader";
import { AdminOrdersTable } from "@/components/superadmin/AdminOrdersTable";

export default function OrdersPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-3 w-full">
      <AdminOrdersHeader />
      <AdminOrdersTable />
    </div>
  );
}
