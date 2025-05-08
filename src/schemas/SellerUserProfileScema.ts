import { z } from "zod";

export const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "İsim en az 2 karakter olmalıdır" }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz" }),
  phone: z
    .string()
    .min(10, { message: "Geçerli bir telefon numarası giriniz" }),
  address: z.string().min(5, { message: "Adres en az 5 karakter olmalıdır" }),
  bio: z.string().optional(),
});

export const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: "Şifre en az 8 karakter olmalıdır" }),
    newPassword: z
      .string()
      .min(8, { message: "Şifre en az 8 karakter olmalıdır" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Şifre en az 8 karakter olmalıdır" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
