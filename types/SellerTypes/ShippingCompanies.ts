export interface IShippingCompany {
    id?: string;
    name: string;
    price: number;
    gsmNumber: string;
    email: string;
    maxDeliveryDay: number;
    minDeliveryDay: number;
}