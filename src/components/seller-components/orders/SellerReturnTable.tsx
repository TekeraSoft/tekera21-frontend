"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft, ChevronRight, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface ReturnItem {
  id: string;
  orderDate: string;
  returnDate?: string;
  packageNo: string;
  recipient: string;
  quantity: number;
  productName: string;
  productCode: string;
  price: string;
  status: string;
  barcode: string;
  returnReason?: string;
  size?: string;
  color?: string;
  stockCode?: string;
}

interface ReturnTableProps {
  returns: ReturnItem[];
}

export default function SellerOrderReturnTable({ returns }: ReturnTableProps) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "requested":
        return "bg-blue-50";
      case "waiting":
        return "bg-yellow-50";
      case "approved":
        return "bg-green-50";
      case "rejected":
        return "bg-red-50";
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "requested":
        return "Talep Oluşturuldu";
      case "waiting":
        return "Aksiyon Bekliyor";
      case "approved":
        return "Onaylandı";
      case "rejected":
        return "Reddedildi";
      case "shipped":
        return "Kargoya Verildi";
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm">
          <ThumbsUp className="h-4 w-4 mr-2" />
          Ülke
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronDown className="h-4 w-4 mr-2" />
            İade Talep Tarihi (Eskiden Yeniye)
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Sipariş Bilgileri</th>
              <th className="text-left py-3 px-4">Alıcı</th>
              <th className="text-left py-3 px-4">Bilgiler</th>
              <th className="text-right py-3 px-4">Birim Fiyat</th>
              <th className="text-center py-3 px-4">Kargo</th>
              <th className="text-center py-3 px-4">Fatura</th>
              <th className="text-left py-3 px-4">İade Sebebi</th>
              <th className="text-right py-3 px-4">Durum</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((item) => (
              <tr
                key={item.id}
                className={cn(
                  "border-b hover:bg-gray-50",
                  getStatusColor(item.status)
                )}
              >
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="font-medium">#{item.id}</span>
                    <span className="text-sm text-gray-500">
                      Sipariş Tarihi: {item.orderDate}
                    </span>
                    {item.returnDate && (
                      <span className="text-sm text-gray-500">
                        İade Talep Tarihi: {item.returnDate}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">{item.recipient}</td>
                <td className="py-4 px-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                        <span className="absolute top-0 left-0 text-white text-xs px-1">
                          1
                        </span>
                        <img
                          src="/placeholder.svg?height=64&width=64"
                          alt={item.productName}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col max-w-xs">
                      <span className="text-sm font-medium truncate">
                        {item.productName}
                      </span>
                      <span className="text-xs text-gray-500">
                        Stok Kodu: {item.stockCode}
                      </span>
                      <span className="text-xs text-gray-500">
                        Barkod: {item.barcode}
                      </span>
                      {item.color && (
                        <span className="text-xs text-gray-500">
                          Renk: {item.color}
                        </span>
                      )}
                      {item.size && (
                        <span className="text-xs text-gray-500">
                          Beden: {item.size}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">{item.price}</td>
                <td className="py-4 px-4 text-center">
                  <div className="flex flex-col items-center">
                    <img
                      src="/placeholder.svg?height=30&width=80"
                      alt="MNG Kargo"
                      className="mb-1"
                    />
                    <span className="text-xs text-gray-500">
                      tekera21 anlaşmalı kargo
                    </span>
                    <Button variant="default" className="mt-1  text-white">
                      Kargo Takip Et
                    </Button>
                    <Select defaultValue="2">
                      <SelectTrigger className="w-16 h-8 mt-2">
                        <SelectValue placeholder="Adet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <Button variant="link" className="text-blue-600">
                    Fatura İşlemleri
                  </Button>
                  <div className="text-sm">
                    <div>Toplam Tutar: {item.price}</div>
                    {item.status === "approved" && (
                      <>
                        <div className="text-xs text-gray-500">
                          İndirim Tutarı: ₺40,00
                        </div>
                        <div className="text-xs text-gray-500">
                          Faturalanma Tutarı: ₺310,00
                        </div>
                      </>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span>{item.returnReason}</span>
                    <span className="text-xs text-green-500">
                      Satıcı tarafından onaylandı
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <Button variant="outline" className="mb-2 w-full">
                    Detaylı Bilgi Gör
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-between"
                  >
                    <span>Diğer İşlemler</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Her Sayfada</span>
          <Select
            value={perPage.toString()}
            onValueChange={(value) => setPerPage(Number.parseInt(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder="20" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">Ürün</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(Math.max(1, page - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">{page}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
