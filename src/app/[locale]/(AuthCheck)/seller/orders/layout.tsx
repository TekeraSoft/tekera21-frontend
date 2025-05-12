import SellerShippingHeader from "@/components/seller-components/order-and-shipping/SellerOrderHeader";

interface SellerShippingLayoutProps {
  children: React.ReactNode;
}

export default function SellerShippingLayout({
  children,
}: SellerShippingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SellerShippingHeader />
      {children}
    </div>
  );
}
