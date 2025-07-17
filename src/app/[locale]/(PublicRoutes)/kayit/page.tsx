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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useActionState } from "react";

import Link from "next/link";
import { ActionStateType, registerUser } from "./actions";
import { AdvancedPasswordInput } from "@/components/auth/PasswordInput";

const initialState: ActionStateType = {
  message: "",
  errors: {},
};

export default function RegisterWithValidationPage() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState
  );

  return (
    <div className="min-h-screen justify-center lg:items-center bg-gradient-to-br from-slate-50 to-slate-100 flex p-2">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Hesap Oluşturun
            </CardTitle>
            <CardDescription className="text-center">
              Aşağıdaki formu eksiksiz doldurup kayıt olabilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              {/* Error Message */}
              {state?.message && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {state.message}
                </div>
              )}

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Adınız</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    required
                  />
                  {state?.errors?.firstName && (
                    <p className="text-sm text-red-600">
                      {state.errors.firstName[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Soyadınız</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                  />
                  {state?.errors?.lastName && (
                    <p className="text-sm text-red-600">
                      {state.errors.lastName[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">E-Posta</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  required
                />
                {state?.errors?.email && (
                  <p className="text-sm text-red-600">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>

              {/* GSM Number */}
              <div className="space-y-2">
                <Label htmlFor="gsmNumber">Telefon numaranız</Label>
                <Input
                  id="gsmNumber"
                  name="gsmNumber"
                  type="tel"
                  placeholder="+90 555 123 45 67"
                  required
                />
                {state?.errors?.gsmNumber && (
                  <p className="text-sm text-red-600">
                    {state.errors.gsmNumber[0]}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>

                <AdvancedPasswordInput
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  error={state?.errors?.password?.[0]}
                />
                {state?.errors?.password && (
                  <p className="text-sm text-red-600">
                    {state.errors.password[0]}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="space-y-3">
                <Label>Cinsiyet</Label>
                <RadioGroup
                  name="gender"
                  defaultValue="MALE"
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MALE" id="male" />
                    <Label htmlFor="male">Erkek</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="female" />
                    <Label htmlFor="female">Kadın</Label>
                  </div>
                </RadioGroup>
                {state?.errors?.gender && (
                  <p className="text-sm text-red-600">
                    {state.errors.gender[0]}
                  </p>
                )}
              </div>

              {/* Birth Date */}
              <div className="space-y-2">
                <Label htmlFor="birthDate">Doğum Tarihi</Label>
                <Input id="birthDate" name="birthDate" type="date" required />
                {state?.errors?.birthDate && (
                  <p className="text-sm text-red-600">
                    {state.errors.birthDate[0]}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Hesabınız oluşturuluyor..." : "Hesap oluşturun"}
              </Button>

              {/* Login Link */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Hesabınız var mı?{" "}
                </span>
                <Link href="/giris" className="text-primary hover:underline">
                  Giriş yapın
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="text-center mt-6 text-xs text-slate-500">
          © 2025 Tekera
        </div>
      </div>
    </div>
  );
}
