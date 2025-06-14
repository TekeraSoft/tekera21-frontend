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
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function SellerOrdersTable({ orders }: any) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const getStatusColor = (status: any) => {
    switch (status) {
      case "new":
        return "bg-blue-50";
      case "processing":
        return "bg-yellow-50";
      case "delivered":
        return "bg-green-50";
      case "canceled":
        return "bg-red-50";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-xl font-bold">
          {orders.length > 0
            ? orders[0].status === "new"
              ? "Yeni Siparişler"
              : orders[0].status === "processing"
              ? "İşleme Alınanlar"
              : orders[0].status === "delivered"
              ? "Teslim Edilenler"
              : orders[0].status === "canceled"
              ? "İptal Edilenler"
              : "Tüm Siparişler"
            : "Tüm Siparişler"}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ChevronDown className="h-4 w-4 mr-2" />
            Sipariş Bilgileri
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg  ">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Sipariş Bilgileri</th>
              <th className="text-left py-3 px-4">Paket No</th>
              <th className="text-left py-3 px-4">Alıcı</th>
              <th className="text-center py-3 px-4">Adet</th>
              <th className="text-left py-3 px-4">Bilgiler</th>
              <th className="text-right py-3 px-4">Birim Fiyat</th>
              <th className="text-center py-3 px-4">Kargo</th>
              <th className="text-center py-3 px-4">Fatura</th>
              <th className="text-right py-3 px-4">Durum</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order: any) => (
                <tr
                  key={order.id}
                  className={cn(
                    "border-b hover:bg-gray-50",
                    getStatusColor(order.status)
                  )}
                >
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium">#{order.id}</span>
                      <span className="text-sm text-gray-500">
                        Sipariş Tarihi: {order.orderDate}
                      </span>
                      {order.deliveryDate && (
                        <span className="text-sm text-gray-500">
                          Teslim Edildi: {order.deliveryDate}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">{order.packageNo}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span>{order.recipient}</span>
                      <span className="text-sm text-gray-500">1 sipariş</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">{order.quantity}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col max-w-xs">
                      <span className="truncate">{order.productName}</span>
                      <span className="text-sm text-gray-500">
                        Stok Kodu: {order.productCode}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">{order.price}</td>
                  <td className="py-4 px-4 text-center">
                    <Button
                      variant="default"
                      className="bg-blue-700 text-white hover:bg-blue-800"
                    >
                      Kargo Takip
                    </Button>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Button variant="link" className="text-blue-600">
                      Fatura İşlemleri
                    </Button>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-sm",
                        order.status === "new"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      )}
                    >
                      {order.status === "new"
                        ? "Yeni"
                        : order.status === "processing"
                        ? "İşlemde"
                        : order.status === "delivered"
                        ? "Teslim Edildi"
                        : "İptal Edildi"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-8 text-center text-gray-500">
                  Bu kriterlere uygun sipariş bulunamadı.
                </td>
              </tr>
            )}
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
          <span className="text-sm text-gray-500">Sipariş</span>
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
    </>
  );
}
