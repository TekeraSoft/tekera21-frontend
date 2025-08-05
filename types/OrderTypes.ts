export interface IOrderResponse {
    success: boolean;
    message: string;
    data: IOrderData | undefined
}
export interface IOrderData {
    content: Order[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}

interface Order {
    id: string;
    buyer: {
        name: string;
        surname: string;
        gsmNumber: string;
    };
    status: string;
    basketItems: BasketItem[];
    shippingAddress: Address;
    billingAddress: Address;
    totalPrice: number;
}

interface BasketItem {
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
    attributes: Attribute[];
    shippingPrice: number;
    shippingCompanyName: string;
    productId: string;
    variationId: string;
    attributeId: string;
}

interface Attribute {
    key: string;
    value: string;
}

interface Address {
    city: string;
    street: string;
    postalCode: string;
    buildNo: string;
    doorNumber: string;
    detailAddress: string;
    country: string;
}
