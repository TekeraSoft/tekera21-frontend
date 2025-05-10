import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import React from "react";

function SellerPerformCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Satış Performansım</CardTitle>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-orange-50 text-orange-600 border-orange-200 flex items-center gap-1"
          >
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            Canlı Performansım
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Bugünkü Satış</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-2xl font-bold">0 ₺</div>
              <Badge variant="outline" className="text-gray-500">
                %0
              </Badge>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Son 1 Haftalık Satış</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-2xl font-bold">910 ₺</div>
              <Badge variant="outline" className="text-red-500">
                %-86.48
              </Badge>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">30 Günlük Satış</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-2xl font-bold">10.836 ₺</div>
              <Badge variant="outline" className="text-green-500">
                %100
              </Badge>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Ödenecek Tutar</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-2xl font-bold">0 ₺</div>
              <Button
                variant="link"
                className="text-xs p-0 h-auto text-gray-500"
              >
                Gelecek Ödemem
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-orange-50 p-3 rounded-lg border border-orange-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-orange-600">
            <Bell className="h-5 w-5" />
            <span>Vadenizi beklemeden 4.751₺ alabilirsiniz!</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SellerPerformCard;
