import { AdminCustomersHeader } from "@/components/superadmin/AdminCustomersHeader";
import { AdminCustomersTable } from "@/components/superadmin/AdminCustomersTable";
import AdminInnerLayout from "@/components/superadmin/AdminInnerLayout";
import TopBar from "@/components/superadmin/TopBar";

export default function AdminCustomersPage() {
  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <AdminInnerLayout>
        <AdminCustomersHeader />
        <AdminCustomersTable />
      </AdminInnerLayout>
    </>
  );
}
