"use client";

import SellerInfoCard from "@/components/seller-components/cards/SellerInfoCard";
import SellerHomePageSlider from "@/components/seller-components/sliders/SellerHomePageSlider";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import SellerSubHeader from "@/components/seller-components/layout/header/SellerSubHeader";
import SellerQuickAccessCard from "@/components/seller-components/cards/SellerQuickAccessCard";
import SellerActionsCard from "@/components/seller-components/main-page/SellerActionsCard";
import SellerPerformCard from "@/components/seller-components/main-page/SellerPerformCard";
import SellerAnnouncementsCard from "@/components/seller-components/main-page/SellerAnnouncementsCard";
import SellerInvoiceCard from "@/components/seller-components/main-page/SellerInvoiceCard";
import SellerRecommendationsCard from "@/components/seller-components/main-page/SellerRecommendationsCard";
import SellerCalendar from "@/components/seller-components/main-page/SellerCalendar";

const SellerPage = () => {
  const { SellerCompanyInfo } = useSelector(
    (state: RootState) => state.SellerCompany
  );

  if (!SellerCompanyInfo) {
    return <div>Loading...</div>; // Veriler henüz yüklenmediyse "Loading..." mesajı gösterelim
  }

  return (
    <main className="flex flex-col w-full">
      <SellerSubHeader>
        <div>sdfgsgsg</div>
      </SellerSubHeader>
      <section className="flex flex-col gap-2">
        <SellerHomePageSlider />
        <SellerInfoCard SellerCompanyInfo={SellerCompanyInfo} />

        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-5 w-3/4">
            <SellerActionsCard />
            <SellerPerformCard />
            <SellerQuickAccessCard />
            <SellerRecommendationsCard />
          </div>
          <div className="flex flex-col gap-5">
            <SellerCalendar />
            <SellerAnnouncementsCard />
            <SellerInvoiceCard />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SellerPage;
