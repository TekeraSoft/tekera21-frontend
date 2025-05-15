"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Pencil, Check, Info, User } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface UserInfoTabProps {
  userData: {
    name: string;
    role: string;
    email: string;
    phone: string;
    mssPhone: string;
  };
}

export default function SellerCompanyUserPermissionsTab({
  userData,
}: UserInfoTabProps) {
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [mailTwoFactorEnabled, setMailTwoFactorEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <User />
        </div>
        <div>
          <h2 className="text-lg font-bold">{userData.name}</h2>
          <p className="text-sm text-gray-500">{userData.role}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        Diğer kullanıcıları görüntülemek için
        <Link
          href={"/seller/users"}
          className="ml-1 text-primary hover:underline"
        >
          tıklayınız.
        </Link>
      </p>

      <div className="space-y-4">
        <div>
          <Label className="text-sm text-green-500 font-normal">
            E-posta Adresi
          </Label>
          <div className="mt-1 relative">
            <Input
              value={userData.email}
              disabled={!editingEmail}
              className="pr-16 border-green-500 focus:ring-green-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditingEmail(!editingEmail)}
              >
                {editingEmail ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Pencil className="h-4 w-4" />
                )}
              </Button>
              {editingEmail ? null : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-green-500"
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm text-green-500 font-normal">
            Telefon Numarası
          </Label>
          <div className="mt-1 relative">
            <Input
              value={userData.phone}
              disabled={!editingPhone}
              className="pr-16 border-green-500 focus:ring-green-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditingPhone(!editingPhone)}
              >
                {editingPhone ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Pencil className="h-4 w-4" />
                )}
              </Button>
              {editingPhone ? null : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-green-500"
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-normal">Şifre</Label>
          <div className="mt-1 relative">
            <Input
              type="password"
              value="********"
              disabled={!editingPassword}
              className="pr-16 focus:ring-green-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditingPassword(!editingPassword)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div>
            <h3 className="text-base font-medium">İki Adımlı Doğrulama</h3>
            <p className="text-xs text-gray-500 max-w-md mt-1">
              İki adımlı doğrulama yöntemini etkinleştirdiğinizde, kişisel
              şifrenize ek olarak kayıtlı cep telefonunuza veya mail adresinize
              gelen doğrulama koduyla panele giriş yapabilirsiniz.
            </p>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={setTwoFactorEnabled}
          />
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-medium">
              Mail ile İki Adımlı Doğrulama Kodu
            </h3>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          <Switch
            checked={mailTwoFactorEnabled}
            onCheckedChange={setMailTwoFactorEnabled}
          />
        </div>

        <p className="text-xs text-gray-500">
          Mail ile İki Adımlı Doğrulama Kodu
        </p>
      </div>
    </div>
  );
}
