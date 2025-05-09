import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function SellerUserProfilePreferencesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tercihler</CardTitle>
        <CardDescription>
          Bildirim ve görüntüleme tercihlerinizi yönetin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">E-posta Bildirimleri</h4>
              <p className="text-sm text-gray-500">
                Yeni siparişler ve güncellemeler hakkında bildirimler alın
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="email-notifications" className="sr-only">
                E-posta Bildirimleri
              </Label>
              <Input
                type="checkbox"
                id="email-notifications"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                defaultChecked
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">SMS Bildirimleri</h4>
              <p className="text-sm text-gray-500">
                Acil güncellemeler için SMS bildirimleri alın
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="sms-notifications" className="sr-only">
                SMS Bildirimleri
              </Label>
              <Input
                type="checkbox"
                id="sms-notifications"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                defaultChecked
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">İki Faktörlü Doğrulama</h4>
              <p className="text-sm text-gray-500">
                Hesabınızı korumak için iki faktörlü doğrulamayı etkinleştirin
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="two-factor" className="sr-only">
                İki Faktörlü Doğrulama
              </Label>
              <Input
                type="checkbox"
                id="two-factor"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                defaultChecked
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Tercihleri Kaydet</Button>
      </CardFooter>
    </Card>
  );
}

export default SellerUserProfilePreferencesTab;
