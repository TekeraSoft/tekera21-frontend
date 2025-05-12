import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SellerCancelOrdersTableProps {
  data?: any[];
  emptyMessage?: string;
}

export function SellerCancelOrdersTable({
  data = [],
  emptyMessage = "Sipariş Bulunmamaktadır.",
}: SellerCancelOrdersTableProps) {
  return (
    <div className="rounded-md bg-white shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1 rounded-md">
            <span>Like</span>
            <span className="text-xs">▼</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1 rounded-md">
            <span>İptal Tarihi (Yeniden Eskiye)</span>
            <span className="text-xs">▼</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span>Her Sayfada</span>
          <Button variant="outline" size="sm" className="h-8 gap-1 rounded-md">
            <span>20 Ürün</span>
            <span className="text-xs">▼</span>
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="flex h-8 min-w-8 items-center justify-center rounded-md bg-gray-900 px-2 text-white">
              1
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-t text-left text-sm">
              <th className="whitespace-nowrap px-4 py-3 font-medium">
                Sipariş Bilgileri
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Alıcı</th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">
                Bilgiler
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">
                Birim Fiyat
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">
                İptal Tarihi
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">
                İptal Nedeni
              </th>
              <th className="whitespace-nowrap px-4 py-3 font-medium">Durum</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((order, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-blue-600">
                        #{order.id}
                      </span>
                      <span className="text-xs text-gray-500">
                        {order.date}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{order.recipient}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {order.image && (
                        <div className="h-16 w-12 overflow-hidden rounded-md bg-gray-100">
                          <img
                            src={order.image || "/placeholder.svg"}
                            alt={order.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-orange-500 text-xs font-bold text-white">
                            1
                          </span>
                          <span className="text-sm font-medium">
                            {order.name}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          <div>Stok Kodu: {order.stockCode}</div>
                          <div>Barkod: {order.barcode}</div>
                          <div>Renk: {order.color}</div>
                          <div>Beden: {order.size}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium">{order.price}</td>
                  <td className="px-4 py-3">{order.cancelDate}</td>
                  <td className="px-4 py-3">{order.cancelReason}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-full text-xs"
                      >
                        Masrafı Satış Sözleşmesi
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-full text-xs"
                      >
                        Ön Bilgilendirme Formu
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-2 h-12 w-12">
                      <img
                        src="/placeholder.svg?height=48&width=48"
                        alt="Empty box"
                      />
                    </div>
                    <p className="text-gray-700">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {data.length > 0 && (
        <div className="flex items-center justify-end gap-2 p-4">
          <span>Her Sayfada</span>
          <Button variant="outline" size="sm" className="h-8 gap-1 rounded-md">
            <span>20 Ürün</span>
            <span className="text-xs">▼</span>
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="flex h-8 min-w-8 items-center justify-center rounded-md bg-gray-900 px-2 text-white">
              1
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-md"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
