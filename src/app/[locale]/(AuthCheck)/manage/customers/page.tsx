import { AdminCustomersHeader } from "@/components/manage/AdminCustomersHeader";
import { AdminCustomersTable } from "@/components/manage/AdminCustomersTable";
import AdminInnerLayout from "@/components/manage/AdminInnerLayout";
import TopBar from "@/components/manage/TopBar";

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
