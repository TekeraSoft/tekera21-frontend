"use client";

import { setBuyerProducts } from "@/store/buyerSlices/product/productSlice";
import BuyerProductCard from "../product/DigitalFashionBuyerProductCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { BuyerProductsData } from "@/data/BuyerProductsData";
import DigitalFashionHeading from "../utils/DigitalFashionHeading";

export default function DigitalFashionBuyerFeaturedProductsSection() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBuyerProducts(BuyerProductsData));
  }, []);

  const { products } = useAppSelector((state) => state.buyerProducts);
  return (
    <div className="bg-white">
      <div className=" px-4 py-16 sm:px-6 sm:py-24  lg:px-8">
        <DigitalFashionHeading
          as="h2"
          size="text-2xl md:text-3xl"
          align="text-left md:text-center"
          variant="default"
        >
          Öne Çıkan Ürünler
        </DigitalFashionHeading>
        {/* <div className="grid  gap-x-6 gap-y-10 grid-cols-2 lg:grid-cols-6 xl:gap-x-8">
          {products.map((product) => (
            <BuyerProductCard
              key={product.id}
              image={product.images[0]}
              {...product}
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
