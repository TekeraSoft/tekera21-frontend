import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import SellerOrdersCancelsNavigation from "@/components/seller-components/order-and-shipping/SellerOrdersCancelsNavigation";

interface SellerOrdersCancelsLayoutProps {
  children: React.ReactNode;
}

export default function SellerOrdersCancelsLayout({
  children,
}: SellerOrdersCancelsLayoutProps) {
  return (
    <>
      <SellerOrdersCancelsNavigation />
      <SellerInnerContainer>{children}</SellerInnerContainer>
    </>
  );
}
