import { SellerAdminUserHeader } from "@/components/seller-components/user/SellerAdminUserHeader";
import { SellerAdminUsersList } from "@/components/seller-components/user/SellerAdminUserList";

function SellerUserListPage() {
  return (
    <div className="container  mx-auto my-5">
      <SellerAdminUserHeader />
      <SellerAdminUsersList />
    </div>
  );
}

export default SellerUserListPage;
