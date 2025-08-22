import { getAllUsers } from "@/app/actions/server/userActions";
import { AdminCustomersHeader } from "@/components/manage/AdminCustomersHeader";
import { AdminCustomersTable } from "@/components/manage/AdminCustomersTable";
import AdminInnerLayout from "@/components/manage/AdminInnerLayout";

export default async function AdminCustomersPage() {
  const users = await getAllUsers();

  if (!users.success || !users.data || users.data.content.length === 0) {
    return (
      <div>
        <h2>No users found</h2>
      </div>
    );
  }

  return (
    <>
      <AdminInnerLayout>
        <AdminCustomersHeader />
        <AdminCustomersTable userData={users.data} />
      </AdminInnerLayout>
    </>
  );
}
