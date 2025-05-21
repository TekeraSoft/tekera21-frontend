import BuyerInnerContainer from "@/components/buyer-components/containers/BuyerInnerContainer";
import BuyerFooter from "@/components/buyer-components/layout/footer/BuyerFooter";
import BuyerHeader from "@/components/buyer-components/layout/header/BuyerHeader";
import BuyerScrollToTop from "@/components/buyer-components/utils/BuyerScrollToTop";
import React from "react";

interface BuyerLayoutRoutesProviderProps {
  children: React.ReactNode;
}

export default function BuyerLayoutRoutesProvider({
  children,
}: BuyerLayoutRoutesProviderProps) {
  return (
    <main className="flex flex-col gap-10">
      <BuyerHeader />
      <BuyerScrollToTop />
      <BuyerInnerContainer>{children}</BuyerInnerContainer>
      <BuyerFooter />
    </main>
  );
}
