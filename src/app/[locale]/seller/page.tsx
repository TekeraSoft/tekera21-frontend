"use client";

import SellerInfoCard from "@/components/seller-components/cards/SellerInfoCard";
import SellerHomePageSlider from "@/components/seller-components/sliders/SellerHomePageSlider";

const SellerPage = () => {
  const validStatuses = ["Normal", "Yoğun", "Çok Yoğun", "Kapalı"] as const;

  type OperationStatus = (typeof validStatuses)[number];

  function parseStatus(status: string): OperationStatus {
    if (validStatuses.includes(status as OperationStatus)) {
      return status as OperationStatus;
    }
    return "Normal";
  }

  const sellerData = {
    sellerInfo: {
      sellerName: "ARZUAMBER MODA",
      sellerId: "1110123",
      sellerLogo:
        "https://arzuamber.com/_next/image?url=%2Fimages%2Flogo%2Ffooterlogo.png&w=256&q=75",
      rating: 9.65,
      followers: 58,
      deliveryTime: "2 Gün",
      operationStatus: "Normal",
      commercialLevel: 1,
      maxCommercialLevel: 5,
      violationPoints: 0,
      ordersShippingToday: 0,
    },
  };

  return (
    <main className="flex flex-col w-full  px-4 py-6 gap-6">
      {/* Hero slider section */}
      <section className="w-full">
        <SellerHomePageSlider />
      </section>

      {/* Seller information section */}
      <section className="w-full">
        <SellerInfoCard
          {...(sellerData?.sellerInfo || {
            sellerName: "",
            sellerId: "",
            sellerLogo: "",
            rating: 0,
            followers: 0,
            deliveryTime: "",
            operationStatus: "Normal",
            commercialLevel: 0,
            maxCommercialLevel: 5,
            violationPoints: 0,
            ordersShippingToday: 0,
          })}
          operationStatus={parseStatus(sellerData.sellerInfo.operationStatus)}
          isLoading={false}
        />
      </section>
    </main>
  );
};

export default SellerPage;
