import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import SellerSalesBrandBasedTab from "@/components/seller-components/seller-reports/salesTab/SellerSalesBrandBasedTab";
import SellerSalesCategoryBasedTab from "@/components/seller-components/seller-reports/salesTab/SellerSalesCategoryBasedTab";
import SellerSalesProductBasedTab from "@/components/seller-components/seller-reports/salesTab/SellerSalesProductBasedTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SellerSalesAndOperationsPage() {
  return (
    <>
      <SellerInnerContainer>
        <Tabs defaultValue="productbased">
          <TabsList>
            <TabsTrigger value="productbased"> Ürün Bazlı</TabsTrigger>
            <TabsTrigger value="brandbased"> Marka Bazlı</TabsTrigger>
            <TabsTrigger value="categorybased"> Kategori Bazlı</TabsTrigger>
          </TabsList>

          <TabsContent value="productbased">
            <SellerSalesProductBasedTab />
          </TabsContent>
          <TabsContent value="brandbased">
            <SellerSalesBrandBasedTab />
          </TabsContent>
          <TabsContent value="categorybased">
            <SellerSalesCategoryBasedTab />
          </TabsContent>
        </Tabs>
      </SellerInnerContainer>
    </>
  );
}
