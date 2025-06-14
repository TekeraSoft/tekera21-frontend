import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import { SellerHelpNavBar } from "@/components/seller-components/help/SellerHelpNavbar";
import RouteProtect from "@/components/shared/RouteProtect";

interface SellerHelpLayoutProps {
  children: React.ReactNode;
}

export default function SellerHelpLayout({ children }: SellerHelpLayoutProps) {
  return (
    <RouteProtect allowedRoles={["help"]}>
      <SellerHelpNavBar />
      <SellerInnerContainer>{children}</SellerInnerContainer>
    </RouteProtect>
  );
}
