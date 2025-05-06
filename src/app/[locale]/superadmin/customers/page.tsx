import { AdminCustomersHeader } from "@/components/superadmin/AdminCustomersHeader";
import { AdminCustomersTable } from "@/components/superadmin/AdminCustomersTable";

export default function AdminCustomersPage() {
  return (
    <div className="flex flex-col gap-6 px-6 py-3 w-full">
      <AdminCustomersHeader />
      <AdminCustomersTable />
    </div>
  );
}
