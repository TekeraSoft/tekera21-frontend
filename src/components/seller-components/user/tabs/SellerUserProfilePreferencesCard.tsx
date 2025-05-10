import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function SellerUserProfilePreferencesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tercihler</CardTitle>
        <CardDescription>
          Bildirim ve görüntüleme tercihlerinizi yönetin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {/* E-posta Bildirimi */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">E-posta Bildirimleri</h4>
              <p className="text-sm text-gray-500">
                Yeni siparişler ve güncellemeler hakkında bildirimler alın
              </p>
            </div>
            <div>
              <Label htmlFor="email-notifications" className="sr-only">
                E-posta Bildirimleri
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
          </div>

          {/* SMS Bildirimi */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">SMS Bildirimleri</h4>
              <p className="text-sm text-gray-500">
                Acil güncellemeler için SMS bildirimleri alın
              </p>
            </div>
            <div>
              <Label htmlFor="sms-notifications" className="sr-only">
                SMS Bildirimleri
              </Label>
              <Switch id="sms-notifications" defaultChecked />
            </div>
          </div>

          {/* 2FA */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">İki Faktörlü Doğrulama</h4>
              <p className="text-sm text-gray-500">
                Hesabınızı korumak için iki faktörlü doğrulamayı etkinleştirin
              </p>
            </div>
            <div>
              <Label htmlFor="two-factor" className="sr-only">
                İki Faktörlü Doğrulama
              </Label>
              <Switch id="two-factor" defaultChecked />
            </div>
          </div>
          <Button>Tercihleri Kaydet</Button>
        </div>
      </CardContent>
    </Card>
  );
}
