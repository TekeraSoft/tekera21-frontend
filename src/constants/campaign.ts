import { TCampaignType, TDiscountType } from "@/types/AdminTypes/campaign";

export const campaignTypes = [
    { value: "DISCOUNT" as TCampaignType, label: "İndirim" },
    { value: "FREESHIPPING" as TCampaignType, label: "Ücretsiz Kargo" },
    { value: "COUPON" as TCampaignType, label: "Kupon" },
    { value: "BUYXGETY" as TCampaignType, label: "Alana X Bedava" },
    { value: "SEASONAL" as TCampaignType, label: "Dönemsel" },
];


export const discountTypes = [
    { value: "PERCENT" as TDiscountType, label: "Yüzde" },
    { value: "FIXED_AMOUNT" as TDiscountType, label: "Sabit Tutar" },
    // { value: "NO_VALUE" as TDiscountType, label: "Tutar yok" },
];

