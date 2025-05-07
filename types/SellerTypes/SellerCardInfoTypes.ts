export type SellerCardInfo = {
  sellerName: string;
  sellerId: string;
  sellerLogo: string;
  rating: number;
  followers: number;
  deliveryTime: string;
  operationStatus: "Normal" | "Yoğun" | "Çok Yoğun" | "Kapalı";
  commercialLevel: number;
  maxCommercialLevel: number;
  violationPoints: number;
  ordersShippingToday: number;
};
