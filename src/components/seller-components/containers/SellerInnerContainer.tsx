import React from "react";

interface SellerInnerContainerProps {
  children: React.ReactNode;
}

const SellerInnerContainer = ({ children }: SellerInnerContainerProps) => {
  return (
    <div className="flex flex-col gap-6 px-3 md:px-8 py-3 w-full">
      {children}
    </div>
  );
};

export default SellerInnerContainer;
