import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

export default function SellerOrderSearchFilters() {
  return (
    <div className="p-4 border-b bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="relative">
          <Input placeholder="Müşteri Adı" className="w-full" />
        </div>
        <div className="relative">
          <Input placeholder="Sipariş No" className="w-full pr-10" />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="h-5 w-5 text-gray-400">i</span>
          </div>
        </div>
        <div className="relative">
          <Input placeholder="Paket No" className="w-full" />
        </div>
        <div className="relative">
          <Input placeholder="Barkod" className="w-full" />
        </div>
        <div className="relative">
          <Input placeholder="Kargo Kodu" className="w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
        <div className="relative">
          <Input
            placeholder="Sipariş Başlangıç Tarihi"
            className="w-full pr-10"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="relative">
          <Input placeholder="Sipariş Bitiş Tarihi" className="w-full pr-10" />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="relative">
          <Input placeholder="Ürün Adı / Model Kodu" className="w-full pr-10" />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <span className="h-5 w-5 text-gray-400">i</span>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
          <Button variant="outline" className="w-full md:w-auto">
            Temizle
          </Button>
          <Button className="w-full md:w-auto bg-gray-900 hover:bg-gray-800">
            Filtrele
          </Button>
        </div>
      </div>
    </div>
  );
}
