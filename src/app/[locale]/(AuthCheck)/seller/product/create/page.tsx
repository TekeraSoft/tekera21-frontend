import SellerInnerContainer from "@/components/seller-components/containers/SellerInnerContainer";
import SellerProductCreateForm from "@/components/seller-components/product/create-page/SellerProductCreateForm";
import React from "react";

function SellerProductCreatePage() {
  return (
    <SellerInnerContainer>
      <div className="flex flex-col gap-4 md:gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Yeni Ürün Oluştur
          </h1>
          <p className="text-muted-foreground">
            Mağazanız için yeni bir ürün ekleyin. Tüm ürün detaylarını ve
            varyasyonlarını belirleyin.
          </p>
        </div>
        <SellerProductCreateForm />
      </div>
    </SellerInnerContainer>
  );
}

export default SellerProductCreatePage;
