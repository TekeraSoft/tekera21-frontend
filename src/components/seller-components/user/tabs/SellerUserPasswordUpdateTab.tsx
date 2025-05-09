import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  passwordFormSchema,
  PasswordFormValues,
} from "@/schemas/SellerUserProfileScema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "recharts";

function SellerUserPasswordUpdateTab() {
  // Password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle password form submission
  function onPasswordSubmit(data: PasswordFormValues) {
    console.log(data);
    toast({
      title: "Şifre güncellendi",
      description: "Şifreniz başarıyla güncellendi.",
    });
    passwordForm.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Güvenlik</CardTitle>
        <CardDescription>
          Şifrenizi değiştirin ve güvenlik ayarlarınızı yönetin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Mevcut Şifre</Label>
              <Input
                id="currentPassword"
                type="password"
                {...passwordForm.register("currentPassword")}
              />
              {passwordForm.formState.errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {passwordForm.formState.errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="newPassword">Yeni Şifre</Label>
              <Input
                id="newPassword"
                type="password"
                {...passwordForm.register("newPassword")}
              />
              {passwordForm.formState.errors.newPassword && (
                <p className="text-sm text-red-500">
                  {passwordForm.formState.errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...passwordForm.register("confirmPassword")}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {passwordForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="mt-4">
            Şifreyi Güncelle
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SellerUserPasswordUpdateTab;
