export interface ICampaign {
    id: string;
    name: string;
    description: string;
    campaignType: TCampaignType;
    discountValue: number;
    discountType: TDiscountType;
    startDate: string;
    endDate: string;
    campaignImage: string;
    totalProductValue: number;
    buyX?: number;
    buyY?: number;
}

export type TCampaignType = "DISCOUNT" | "FREESHIPPING" | "COUPON" | "BUYXGETY" | "SEASONAL";


export type TDiscountType = "PERCENTAGE" | "FIXED_AMOUNT" | "NO_VALUE";

