export interface SellerCompanyProps {
  id: string;
  name: string;
  email: string;
  logo: string;
  score: number;
  isActive: boolean;
  follower: number;
  operationStatus: string;

  // Siparişler
  totalOrders: number;
  todaysOrders: number;
  cancelledOrders: number;
  pendingOrders: number;

  // Ürünler
  totalProducts: number;
  approvedProducts: number;
  pendingApprovalProducts: number;
  rejectedProducts: number;

  // Opsiyonel görseller (sellerData'da yok demiştin ama burada mevcut)
  bannerImage?: string;
  storePreviewImage?: string;
}
