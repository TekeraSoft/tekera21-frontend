"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, ChevronDown } from "lucide-react";

const SellerInvoiceCard = () => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Fatura Performansı
          <Info className="h-4 w-4 text-gray-400" />
        </CardTitle>
        <Button variant="link" className="text-sm p-0 h-auto text-blue-500">
          tekera21 Akademi
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-500">9,71</span>
            <Badge
              variant="outline"
              className="text-green-500 border-green-200"
            >
              Gelişiyor
              <ChevronDown className="h-3 w-3 ml-1" />
            </Badge>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-500">
                Karşılaştırma Göstergesi
              </span>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
            <span className="text-sm font-medium">7 Satıcı</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Son Güncellenme: 07 Mayıs 2025 09:00
          </span>
          <Info className="h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-md border border-yellow-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-yellow-500"
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span className="text-sm">
            Faturanızı zamanında kesmeyi ihmal etmeyin! E-dönüşüm'ün konto
            şablonunu önermeyi mi?
          </span>
          <Button variant="link" className="text-sm p-0 h-auto text-blue-500">
            Daha Fazla
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerInvoiceCard;
