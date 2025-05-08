import React from "react";

interface SellerSubHeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

function SellerSubHeader({ left, right }: SellerSubHeaderProps) {
  return (
    <div className="w-full h-20  flex justify-between items-center bg-white  border-b">
      <div className="container  mx-4 md:mx-auto">
        <div className="w-full flex justify-start">{left}</div>
        <div className="w-full flex justify-end">{right}</div>
      </div>
    </div>
  );
}

export default SellerSubHeader;
