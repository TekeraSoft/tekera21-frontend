export interface SellerReportAggregation {
    dailyProfit: number;
    weeklyProfit: number;
    monthlyProfit: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    buyerFirstName: string;
    buyerLastName: string;
    totalPrice: number;
    shippingPrice: number;
    createdAt: string; // ISO tarih string
    updatedAt: string; // ISO tarih string
    productImage: string[];
}

export interface PageInfo {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
}

export interface IRecentOrders {
    content: Order[];
    page: PageInfo;
}

export interface SubCategory {
    id: string;
    name: string;
    image: string | null;
    children: any[]; // eğer çocuk kategoriler de aynı tip olacaksa SubCategory[]
}

export interface Variation {
    id: string;
    modelName: string;
    modelCode: string;
    color: string;
    images: string[];
}

export interface IReportProduct {
    id: string;
    name: string;
    slug: string;
    brandName: string;
    category: string;
    subCategories: SubCategory[];
    variations: Variation[];
    currencyType: string;
    videoUrl: string | null;
    tags: string[];
    price: number;
    discountPrice: number;
    rate: number;
    description: string;
}

export interface ITopProducts {
    content: IReportProduct[];
    page: PageInfo;
}

export interface ISellerDashboardData {
    sellerReportAggregation: SellerReportAggregation;
    followers: any[]; // follower tipi bilinmiyor
    totalOrders: number;
    totalProducts: number;
    recentOrders: IRecentOrders;
    topProducts: ITopProducts;
}
