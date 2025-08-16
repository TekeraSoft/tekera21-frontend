import { getAllUsers } from "@/app/actions/server/userActions";
import { AdminCustomersHeader } from "@/components/manage/AdminCustomersHeader";
import { AdminCustomersTable } from "@/components/manage/AdminCustomersTable";
import AdminInnerLayout from "@/components/manage/AdminInnerLayout";
import TopBar from "@/components/manage/TopBar";

export default async function AdminCustomersPage() {
  const users = await getAllUsers();

  if (!users.success || !users.data || users.data.content.length === 0) {
    return (
      <div>
        <TopBar>
          <></>
        </TopBar>
        <h2>No users found</h2>
      </div>
    );
  }

  return (
    <>
      <TopBar>
        <></>
      </TopBar>
      <AdminInnerLayout>
        <AdminCustomersHeader />
        <AdminCustomersTable userData={users.data} />
      </AdminInnerLayout>
    </>
  );
}
