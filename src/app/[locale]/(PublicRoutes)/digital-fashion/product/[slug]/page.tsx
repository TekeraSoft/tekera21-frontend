"use client";

import DigitalFashionBuyerInnerContainer from "@/components/digital-fashion-components/containers/DigitalFashionBuyerInnerContainer";
import { BuyerProductsData } from "@/data/BuyerProductsData";
import { useParams } from "next/navigation";

function DigitalFashionProductDetailPage() {
  const { slug } = useParams() as { slug: string };

  const product: any = {}
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <DigitalFashionBuyerInnerContainer>
      {product.name}
    </DigitalFashionBuyerInnerContainer>
  );
}

export default DigitalFashionProductDetailPage;
