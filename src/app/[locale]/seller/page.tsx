"use client";

import SellerInfoCard from "@/components/seller-components/cards/SellerInfoCard";
import SellerHomePageSlider from "@/components/seller-components/sliders/SellerHomePageSlider";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import SellerSubHeader from "@/components/seller-components/layout/header/SellerSubHeader";
import SellerQuickAccessCard from "@/components/seller-components/cards/SellerQuickAccessCard";
import SellerActionsCard from "@/components/seller-components/main-page/SellerActionsCard";
import SellerPerformCard from "@/components/seller-components/main-page/SellerPerformCard";

const SellerPage = () => {
  const { SellerCompanyInfo } = useSelector(
    (state: RootState) => state.SellerCompany
  );

  if (!SellerCompanyInfo) {
    return <div>Loading...</div>; // Veriler henüz yüklenmediyse "Loading..." mesajı gösterelim
  }

  return (
    <main className="flex flex-col w-full ">
      <SellerSubHeader>
        <div>sdfgsgsg</div>
      </SellerSubHeader>
      <section className="flex flex-col px-4 gap-6">
        <SellerHomePageSlider />

        <SellerInfoCard SellerCompanyInfo={SellerCompanyInfo} />
        <SellerActionsCard />
        <SellerPerformCard />
        <SellerQuickAccessCard />
      </section>
    </main>
  );
};

export default SellerPage;
