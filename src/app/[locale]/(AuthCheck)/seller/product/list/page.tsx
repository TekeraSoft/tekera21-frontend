import SellerSubHeader from "@/components/seller-components/layout/header/SellerSubHeader";
import SellerProductList from "@/components/seller-components/product/list-page/SellerProductList";

export default function SellerProductsPage() {
  return (
    <main className="w-full">
      <SellerSubHeader
        left={
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-medium">Ürün Limit seviyesi</p>
              <span className="text-sm text-gray-600">Seviye 1</span>
            </div>
            <div>
              <p className="text-sm font-medium">Ürün Adeti</p>
              <span className="text-sm text-gray-600">150/500</span>
            </div>
          </div>
        }
      />
      <SellerProductList />
    </main>
  );
}
