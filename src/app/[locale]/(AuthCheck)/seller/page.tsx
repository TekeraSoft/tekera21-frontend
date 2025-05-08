"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import SellerHomePageSlider from "@/components/seller-components/sliders/SellerHomePageSlider";
import SellerInfoCard from "@/components/seller-components/cards/SellerInfoCard";
import SellerActionsCard from "@/components/seller-components/main-page/SellerActionsCard";
import SellerPerformCard from "@/components/seller-components/main-page/SellerPerformCard";
import SellerQuickAccessCard from "@/components/seller-components/cards/SellerQuickAccessCard";
import SellerRecommendationsCard from "@/components/seller-components/main-page/SellerRecommendationsCard";
import SellerCalendar from "@/components/seller-components/main-page/SellerCalendar";
import SellerAnnouncementsCard from "@/components/seller-components/main-page/SellerAnnouncementsCard";
import SellerInvoiceCard from "@/components/seller-components/main-page/SellerInvoiceCard";
import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
const SellerPage = () => {
  const { SellerCompanyInfo } = useSelector(
    (state: RootState) => state.SellerCompany
  );

  if (!SellerCompanyInfo) {
    return <div>Loading...</div>; // Veriler henüz yüklenmediyse "Loading..." mesajı gösterelim
  }

  return (
    <main className="flex flex-col w-full ">
      <SellerInnerContainer>
        <SellerInfoCard SellerCompanyInfo={SellerCompanyInfo} />
        <SellerHomePageSlider />
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
          <div className="flex flex-col gap-5 lg:w-3/4">
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
      </SellerInnerContainer>
    </main>
  );
};

export default SellerPage;
