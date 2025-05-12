import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";

export function SellerCancelOrdersFilterBar() {
  return (
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
  );
}
