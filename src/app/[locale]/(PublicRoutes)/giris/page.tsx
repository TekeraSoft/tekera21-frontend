"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { Separator } from "@radix-ui/react-separator";
import { Lock, Mail } from "lucide-react";
import { AdvancedPasswordInput } from "@/components/auth/PasswordInput";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "./actions"; // server action değil, api fetch gibi çalışacak
import { LoginFormValues, loginSchema } from "@/schemas/Auth";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return await loginUser({ email: data.email, password: data.password });
    },
    onSuccess: (data) => {
      if (data.redirectUrl) {
        router.push(data.redirectUrl);
      }
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  return (
    <div className="min-h-screen justify-center lg:items-center bg-gradient-to-br from-slate-50 to-slate-100 flex p-2">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">
              {"Giriş yapın"}
            </CardTitle>
            <CardDescription className="text-center">
              {"Hesabınıza giriş yaparak alışverişe devam edin"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    className="pl-10"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-600">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <AdvancedPasswordInput
                        id="password"
                        placeholder="Şifrenizi girin"
                        {...field}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
              </div>

              {/* General error */}
              {loginMutation.isError && (
                <p className="text-red-600 text-sm">
                  {(loginMutation.error as any)?.message !== "NEXT_REDIRECT"
                    ? (loginMutation.error as any)?.message
                    : "Giriş başarısız. Lütfen tekrar deneyin."}
                </p>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base font-medium"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Giriş yapılıyor..." : "Giriş yap"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  veya
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-11 bg-transparent">
                {/* Google */}
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="h-11 bg-transparent">
                {/* Facebook */}
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>

            <div className="text-center">
              <span className="text-sm text-muted-foreground">
                {"Hesabınız yok mu?"}
              </span>
              <Link href={"/kayit"} className="px-2 text-sm font-medium">
                {"Hesap oluştur"}
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="text-center mt-6 text-xs text-slate-500">
          © 2025 Tekera
        </div>
      </div>
    </div>
  );
}
