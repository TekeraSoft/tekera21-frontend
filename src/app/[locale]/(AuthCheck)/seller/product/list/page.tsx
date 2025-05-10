import SellerSubHeader from "@/components/seller-components/layout/header/SellerSubHeader";
import SellerProductList from "@/components/seller-components/product/list-page/SellerProductList";

export default function SellerProductsPage() {
  return (
    <div className="w-full">
      <SellerSubHeader
        left={
          <div className="flex items-center space-x-6 p-4 ">
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold text-gray-800">
                Ürün Limit Seviyesi
              </p>
              <span className="text-sm text-blue-600 font-medium">
                Seviye 1
              </span>
            </div>
            <div className="h-6 w-px bg-gray-300"></div> {/* Dikey ayraç */}
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold text-gray-800">Ürün Adeti</p>
              <span className="text-sm text-green-600 font-medium">
                150 / 500
              </span>
            </div>
          </div>
        }
      />
      <SellerProductList />
    </div>
  );
}
