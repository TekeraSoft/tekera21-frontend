import DigitalFashionBuyerInnerContainer from "@/components/digital-fashion-components/containers/DigitalFashionBuyerInnerContainer";
import DigitalFashionBuyerHeader from "@/components/digital-fashion-components/layout/header/DigitalFashionBuyerHeader";
import DigitalFashionBuyerFooter from "@/components/digital-fashion-components/layout/footer/DigitalFashionBuyerFooter";
import DigitalFashionBuyerScrollToTop from "@/components/digital-fashion-components/utils/DigitalFashionBuyerScrollToTop";

interface BuyerLayoutRoutesProviderProps {
  children: React.ReactNode;
}

export default function DigitalFashionBuyerLayoutRoutesProvider({
  children,
}: BuyerLayoutRoutesProviderProps) {
  return (
    <main className="flex flex-col gap-10">
      <DigitalFashionBuyerHeader />
      <DigitalFashionBuyerScrollToTop />
      <DigitalFashionBuyerInnerContainer>
        {children}
      </DigitalFashionBuyerInnerContainer>
      <DigitalFashionBuyerFooter />
    </main>
  );
}
