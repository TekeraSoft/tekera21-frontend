import SellerFooter from "@/components/seller-components/layout/footer/SellerFooter";
import SellerHeader from "@/components/seller-components/layout/header/SellerHeader";
import SellerSupport from "@/components/seller-components/support/SellerSupport";


interface SellerLayoutProps {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  return (
    <div className="flex flex-col">
      <div className="relative min-h-screen flex flex-col">
        <SellerHeader />
        <div className="flex-1 ">{children}</div>
        <SellerSupport />
        <SellerFooter />
      </div>
    </div>
  );
}
