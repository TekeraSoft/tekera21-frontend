import SellerSubHeader from "@/components/seller-components/layout/header/SellerSubHeader";
import SellerProductList from "@/components/seller-components/product/list-page/SellerProductList";
import { Separator } from "@/components/ui/separator";

export default function SellerProductsPage() {
  return (
    <>
      <SellerSubHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center">
            <div>
              <p>Ürün Limit seviyesi</p>
              <span>Seviye 1</span>
            </div>
            <Separator orientation="vertical" />
            <div>
              <p>Ürün Adeti</p>
              <span>150/500</span>
            </div>
          </div>
          <div></div>
        </div>
      </SellerSubHeader>
      <SellerProductList />
    </>
  );
}
