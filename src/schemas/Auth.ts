import z from "zod";

export const loginSchema = z.object({
    email: z.string().email("Geçerli bir e-posta giriniz"),
    password: z.string().min(5, "Şifre en az 5 karakter olmalıdır"),
});

export const signUpSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    gsmNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    gender: z.enum(["MALE", "FEMALE"]),
    birthDate: z.string().min(1, "Birth date is required"),
})


export type LoginFormValues = z.infer<typeof loginSchema>;