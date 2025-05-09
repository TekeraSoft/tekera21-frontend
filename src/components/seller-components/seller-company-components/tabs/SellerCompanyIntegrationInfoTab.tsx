"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Copy, Eye } from "lucide-react";

export default function SellerCompanyIntegrationInfoTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Label className="text-sm font-normal">Satıcı ID (Cari ID)</Label>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-1 relative">
            <Input value="1110123" disabled className="pr-10" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <Label className="text-sm font-normal">
              Entegrasyon Referans Kodu
            </Label>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-1 relative">
            <Input
              value="***********"
              type="password"
              disabled
              className="pr-16"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-normal">API Key</Label>
          <div className="mt-1 relative">
            <Input
              value="***********"
              type="password"
              disabled
              className="pr-16"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-normal">API Secret</Label>
          <div className="mt-1 relative">
            <Input
              value="***********"
              type="password"
              disabled
              className="pr-16"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <Label className="text-sm font-normal">Token</Label>
          <div className="mt-1 relative">
            <Input
              value="***********"
              type="password"
              disabled
              className="pr-16"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Button className="bg-orange-500 hover:bg-orange-600 text-white">
        API Bilgilerini Güncelle
      </Button>
    </div>
  );
}
