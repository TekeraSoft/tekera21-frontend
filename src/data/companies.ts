export const companies = {
  Arzuamber: {
    id: 1110123,
    name: "ARZUAMBER MODA",
    email: "arzuamber@gmail.com", // Bu değişmedi çünkü sellerData'da email yok
    logo: "https://arzuamber.com/_next/image?url=%2Fimages%2Flogo%2Ffooterlogo.png&w=256&q=75",
    score: 9.65,
    isActive: true,
    follower: 58,
    operationStatus: "Normal",

    // Siparişler
    totalOrders: 3500,
    todaysOrders: 0,
    cancelledOrders: 150,
    pendingOrders: 25,

    // Ürünler
    totalProducts: 240,
    approvedProducts: 230,
    pendingApprovalProducts: 5,
    rejectedProducts: 5,

    bannerImage: "/placeholders/store-banner-1.jpg", // sellerData'da yok
    storePreviewImage: "/placeholders/store-preview-1.jpg", // sellerData'da yok
  },

  ModaNova: {
    id: 2220345,
    name: "MODA NOVA",
    email: "modanova@gmail.com",
    logo: "/logos/modanova.png",
    score: 9.25,
    isActive: true,
    follower: 1500,
    operationStatus: "Normal",

    totalOrders: 1200,
    todaysOrders: 8,
    cancelledOrders: 40,
    pendingOrders: 10,

    totalProducts: 95,
    approvedProducts: 85,
    pendingApprovalProducts: 8,
    rejectedProducts: 2,

    bannerImage: "/placeholders/store-banner-2.jpg",
    storePreviewImage: "/placeholders/store-preview-2.jpg",
  },

  TekstilKing: {
    id: 3330567,
    name: "TEKSTİL KING",
    email: "king@tekstil.com",
    logo: "/logos/tekstilking.png",
    score: 8.75,
    isActive: false,
    follower: 25,
    operationStatus: "Normal",

    totalOrders: 180,
    todaysOrders: 0,
    cancelledOrders: 15,
    pendingOrders: 3,

    totalProducts: 20,
    approvedProducts: 18,
    pendingApprovalProducts: 1,
    rejectedProducts: 1,

    bannerImage: "/placeholders/store-banner-3.jpg",
    storePreviewImage: "/placeholders/store-preview-3.jpg",
  },
};
