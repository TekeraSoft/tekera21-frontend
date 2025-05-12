import EmptyState from "@/components/seller-components/order-and-shipping/SellerEmptyState";
import SellerShippingSearchFilters from "@/components/seller-components/order-and-shipping/SellerOrderSearchFilters";
import { AdminOrdersTable } from "@/components/superadmin/AdminOrdersTable";

export default function ProcessingOrdersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <SellerShippingSearchFilters />
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">İşleme Alınanlar</h1>
          <div className="text-sm text-gray-500">
            Filtreleme Sonuçları: Toplam 0 sipariş bilgisi
            <div className="text-xs">Son Güncelleme: 12 Mayıs 2023 14:39</div>
          </div>
        </div>
        <div className="bg-white border rounded-md shadow-sm">
          <AdminOrdersTable
            orders={[]}
            emptyState={
              <EmptyState
                title="Siparişin Bulunmamaktadır"
                description="Satışlarınızı artırmak için reklam tanımlayabilir, indirim oluşturabilir ve kampanyaya katılabilirsiniz!"
                buttons={[
                  { label: "Reklam Tanımla", variant: "outline" },
                  { label: "İndirim Oluştur", variant: "outline" },
                  { label: "Kampanyaya Katıl", variant: "outline" },
                ]}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
