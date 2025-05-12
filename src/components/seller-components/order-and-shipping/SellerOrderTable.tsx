import type React from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import Image from "next/image";

interface OrderTableProps {
  orders?: any[];
  emptyState?: React.ReactNode;
}

export default function SellerOrderTable({
  orders = [],
  emptyState,
}: OrderTableProps) {
  if (orders.length === 0 && emptyState) {
    return emptyState;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            <span>Sipariş Bilgileri</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm">Her Sayfada</div>
          <select className="border rounded px-2 py-1 text-sm">
            <option>20 Sipariş</option>
            <option>50 Sipariş</option>
            <option>100 Sipariş</option>
          </select>
          <div className="flex">
            <Button variant="outline" size="icon" className="rounded-r-none">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="border-y px-3 py-1 flex items-center">1</div>
            <Button variant="outline" size="icon" className="rounded-l-none">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left text-sm">
              <th className="p-3 border-b font-medium">Sipariş Bilgileri</th>
              <th className="p-3 border-b font-medium">Paket No</th>
              <th className="p-3 border-b font-medium">Alıcı</th>
              <th className="p-3 border-b font-medium">Adet</th>
              <th className="p-3 border-b font-medium">Bilgiler</th>
              <th className="p-3 border-b font-medium">Birim Fiyat</th>
              <th className="p-3 border-b font-medium">Kargo</th>
              <th className="p-3 border-b font-medium">Fatura</th>
              <th className="p-3 border-b font-medium">Durum</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.orderInfo}</td>
                <td className="p-3">{order.packageNo}</td>
                <td className="p-3">{order.recipient}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        order.productImage ||
                        "/placeholder.svg?height=80&width=60"
                      }
                      alt={order.productName || "Ürün"}
                      width={60}
                      height={80}
                      className="object-cover border"
                    />
                    <div>
                      <div className="text-sm font-medium">
                        {order.productName}
                      </div>
                      <div className="text-xs text-gray-500">
                        Stok Kodu: {order.stockCode}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3">{order.unitPrice}</td>
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    <Image
                      src="/placeholder.svg?height=30&width=100"
                      alt="Kargo"
                      width={100}
                      height={30}
                    />
                    <div className="text-xs text-gray-500">
                      {order.trackingNumber}
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <Button variant="outline" size="sm">
                    Fatura İşlemleri
                  </Button>
                </td>
                <td className="p-3">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    Kargo Takip
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
