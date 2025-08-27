import z from "zod";

export const campaignSchema = z
  .object({
    name: z.string().min(1, "Kampanya adı zorunludur"),
    description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
    discountValue: z.string().optional(), // koşullu zorunlu olacak
    discountType: z.string().optional(), // koşullu zorunlu olacak
    campaignType: z.string().min(1, "Kampanya tipi seçilmelidir"),
    startDate: z.string().min(1, "Başlangıç tarihi zorunludur"),
    endDate: z.string().min(1, "Bitiş tarihi zorunludur"),
    buyX: z.string().optional(),
    buyY: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.campaignType === "BUYXGETY") {
      // buyX ve buyY zorunlu
      if (!data.buyX || data.buyX.trim() === "") {
        ctx.addIssue({
          path: ["buyX"],
          code: z.ZodIssueCode.custom,
          message: "buyX alanı zorunludur",
        });
      }
      if (!data.buyY || data.buyY.trim() === "") {
        ctx.addIssue({
          path: ["buyY"],
          code: z.ZodIssueCode.custom,
          message: "buyY alanı zorunludur",
        });
      }
    } else if (data.campaignType !== "FREESHIPPING") {
      // diğer campaign tiplerinde discountValue ve discountType zorunlu
      if (!data.discountValue || data.discountValue.trim() === "") {
        ctx.addIssue({
          path: ["discountValue"],
          code: z.ZodIssueCode.custom,
          message: "İndirim değeri alanı zorunludur",
        });
      }
      if (!data.discountType || data.discountType.trim() === "") {
        ctx.addIssue({
          path: ["discountType"],
          code: z.ZodIssueCode.custom,
          message: "İndirim tipi alanı zorunludur",
        });
      }
    }
  })
  .transform((data) => {
    // validation geçtiyse campaignType BUYXGETY için discountType'ı fixle
    if (data.campaignType === "BUYXGETY") {
      return { ...data, discountType: "NO_VALUE", discountValue: "0" };
    }
    if (data.campaignType === "FREESHIPPING") {
      return { ...data, discountType: "NO_VALUE", discountValue: "0" };
    }
    return data;
  });

export type CampaignFormData = z.infer<typeof campaignSchema>;