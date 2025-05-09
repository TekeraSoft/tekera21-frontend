import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import { SellerAdminUserHeader } from "@/components/seller-components/user/SellerAdminUserHeader";
import { SellerAdminUsersList } from "@/components/seller-components/user/SellerAdminUserList";

function SellerUserListPage() {
  return (
    <SellerInnerContainer>
      <SellerAdminUserHeader />
      <SellerAdminUsersList />
    </SellerInnerContainer>
  );
}

export default SellerUserListPage;
