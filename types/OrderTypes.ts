export interface IOrderResponse {
    success: boolean;
    message: string;
    data: IOrderData | undefined
}

export interface IOrderNew {
    orderNo: string;
    shippingPrice: number;
    totalPrice: number;
    sellerOrders: IOrder[];
};
export interface IOrderData {
    content: IOrder[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}

interface IOrder {
    id: string;
    buyer: {
        name: string;
        surname: string;
        gsmNumber: string;
    };
    createdAt: string;
    updatedAt: string;
    status: string;
    basketItems: IBasketItem[];
    shippingAddress: IAddress;
    billingAddress: IAddress;
    totalPrice: number;
    shippingPrice: number;
}

interface IBasketItem {
    id: string;
    name: string;
    slug: string;
    code: string;
    brandName: string;
    quantity: number;
    modelCode: string;
    price: number;
    sku: string;
    barcode: string;
    image: string;
    attributes: IAttribute[];
    shippingCompanyName: string;
    productId: string;
    variationId: string;
    attributeId: string;
}

interface IAttribute {
    key: string;
    value: string;
}

interface IAddress {
    city: string;
    street: string;
    postalCode: string;
    buildNo: string;
    doorNumber: string;
    detailAddress: string;
    country: string;
}
