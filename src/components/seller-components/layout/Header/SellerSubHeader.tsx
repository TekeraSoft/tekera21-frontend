import React from "react";

interface SellerSubHeaderProps {
  children: React.ReactNode;
}

function SellerSubHeader({ children }: SellerSubHeaderProps) {
  return <div className="w-full h-20 ">{children}</div>;
}

export default SellerSubHeader;
