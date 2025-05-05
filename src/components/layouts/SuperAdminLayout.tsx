import BuyerNavbar from "./navbars/buyer/BuyerNavbar";

interface BuyerLayoutProps {
  children: React.ReactNode;
}

export default function SuperAdminLayout({ children }: BuyerLayoutProps) {
  return (
    <div>
      <BuyerNavbar />

      {children}
    </div>
  );
}
