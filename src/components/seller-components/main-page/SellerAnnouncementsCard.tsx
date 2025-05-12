"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SellerAnnouncementsCard = () => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Duyurularım
          <Badge className="bg-orange-500 text-white rounded-full h-5 w-5 flex items-center justify-center p-0 text-xs">
            36
          </Badge>
        </CardTitle>
        <Button variant="link" className="text-sm p-0 h-auto">
          Tüm Duyurular
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="border rounded-md">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">
                  Bugün Açılan tekera21 Karşılamalı Türkiye Kampanyalarınız Var!
                </span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                    Kampanya Duyurusu
                  </Badge>
                </div>
                <div className="flex justify-between w-full">
                  <span className="text-sm">Genel</span>
                  <span className="text-sm text-gray-500">
                    08.05.2023, 17:10
                  </span>
                </div>
                <p className="text-sm mt-1">
                  Mega Mayıs Kampanyası: Öncesi e-Dönüşüm'de Seçili Kontör
                  Paketlerinde %50'ye Varan İndirim Kaçmaz!
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                    Kampanya Duyurusu
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-md">
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium">
                  Ürün Komisyon Tarifeleri Başladı!
                </span>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                    Promosyon & Fiyat
                  </Badge>
                </div>
                <div className="flex justify-between w-full">
                  <span className="text-sm">Genel</span>
                  <span className="text-sm text-gray-500">
                    04.05.2023, 10:34
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerAnnouncementsCard;
