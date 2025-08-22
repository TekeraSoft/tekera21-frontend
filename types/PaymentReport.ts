export interface IPlatformFee {
  description: string;
  value: number;
}

export interface IOrderItem {
  orderNumber: string;
  productName: string;
  modelCode: string;
  productImageUrl: string;
  platformUsageFee: IPlatformFee;
  platformCommission: IPlatformFee;
  sellerProfit: number;
}

export interface IPaymentReport {
  calculateDate: {
    month: string;
    year: string;
  };
  interruptionContent: IOrderItem[];
  sellerFee: number;
  interruptionAmount: number;
}