import SellerOrderTable from "@/components/seller-components/order-and-shipping/SellerOrderTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";

export default function CustomerCancellationsPage() {
  return (
    <div>
      <div className="space-y-4">
        <div className="mb-6 space-y-4 rounded-md bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div>
              <Input placeholder="Sipariş No" className="w-full" />
            </div>
            <div>
              <Input placeholder="Kargo Kodu" className="w-full" />
            </div>
            <div>
              <Input placeholder="Barkod" className="w-full" />
            </div>
            <div className="relative">
              <Input placeholder="İptal Başlangıç Tarihi" className="w-full" />
              <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <Input placeholder="İptal Bitiş Tarihi" className="w-full" />
              <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Input placeholder="Müşteri Adı" className="w-full" />
            </div>
            <div className="flex justify-end gap-2 lg:col-span-2">
              <Button variant="outline" className="w-full md:w-auto">
                Temizle
              </Button>
              <Button className="w-full bg-gray-900 md:w-auto">Filtrele</Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Müşterinin İptal Ettiği</h1>
          <div className="text-sm text-gray-500">
            Filtreleme Sonuçları: Toplam 1 iptal bilgisi
            <div className="text-xs">Son Güncelleme: 12 Mayıs 2025 15:50</div>
          </div>
        </div>
        <SellerOrderTable data={[]} />
      </div>
    </div>
  );
}
