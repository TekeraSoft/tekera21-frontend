import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import React from "react";

function DigitalFashionBuyerProductSliderCard({ product }: any) {
  return (
    <Link href={`/digital-fashion/product/${product.slug}`}>
      <Card className="transition duration-300 ease-in-out  hover:-translate-y-1 rounded-xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-center font-semibold text-gray-800">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3 px-4 pb-4">
          <Image
            src={product.images[0]}
            alt={product.name + " image"}
            width={300}
            height={400}
            className="object-cover w-auto h-auto object-center"
            priority
          />

          <p className="text-sm text-center text-muted-foreground">
            {product.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default DigitalFashionBuyerProductSliderCard;
