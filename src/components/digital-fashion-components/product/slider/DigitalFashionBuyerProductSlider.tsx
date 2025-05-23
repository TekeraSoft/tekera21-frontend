"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BuyerProductsData } from "@/data/BuyerProductsData";
import { setBuyerProducts } from "@/store/buyerSlices/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import React, { useEffect } from "react";
import DigitalFashionBuyerProductSliderCard from "./DigitalFashionBuyerProductSliderCard";
import Autoplay from "embla-carousel-autoplay";

function DigitalFashionBuyerProductSlider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBuyerProducts(BuyerProductsData));
  }, []);

  const { products } = useAppSelector((state) => state.buyerProducts);

  return (
    <div className="px-12 md:px-8 py-3 w-full">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/3 lg:basis-1/5"
            >
              <DigitalFashionBuyerProductSliderCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default DigitalFashionBuyerProductSlider;
