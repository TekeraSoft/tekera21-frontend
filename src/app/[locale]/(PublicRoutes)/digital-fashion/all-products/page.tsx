"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setBuyerProducts } from "@/store/buyerSlices/product/productSlice";
import { BuyerProductsData } from "@/data/BuyerProductsData";

import DigitalFashionBuyerProductCard from "@/components/digital-fashion-components/product/DigitalFashionBuyerProductCard";
import DigitalFashionHeading from "@/components/digital-fashion-components/utils/DigitalFashionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Funnel, ListFilter, PackageX, X } from "lucide-react";

function DigitalFashionAllProduct() {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.DigitalFashionProducts);

  const [sortBy, setSortBy] = useState<string | null>("featured");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const allColors = [
    "black",
    "red",
    "white",
    "colorful",
    "purple",
    "cream",
    "brown",
    "blue",
    "green",
  ];

  // useEffect(() => {
  //   dispatch(setBuyerProducts(BuyerProductsData));
  // }, []);

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const filteredProducts = products.filter((product) => {
    if (selectedColors.length === 0) return true;
    return selectedColors.includes(product.color?.toLowerCase());
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="flex flex-col gap-2">
      <DigitalFashionHeading
        as="h2"
        size="text-2xl md:text-3xl"
        align="text-left md:text-center"
        variant="default"
      >
        Tüm Ürünler
      </DigitalFashionHeading>

      <Separator className="bg-primary" />

      {/* Mobil filtre ve sıralama butonları */}
      <div className="flex gap-2 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"primary"} className="flex gap-1">
              <Funnel size={20} />
              Filtrele
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-center text-xl">FİLTRE</SheetTitle>
              <Separator className="bg-primary" />
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-2">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="color-filter">
                  <AccordionTrigger>
                    <DigitalFashionHeading
                      as="h2"
                      size="text-xl"
                      align="text-left"
                      variant="default"
                      className="font-semibold"
                    >
                      Renk
                    </DigitalFashionHeading>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      {allColors.map((color) => (
                        <div
                          key={color}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={color}
                            checked={selectedColors.includes(color)}
                            onCheckedChange={() => toggleColor(color)}
                          />
                          <label
                            htmlFor={color}
                            className="text-sm font-normal text-gray-700 cursor-pointer capitalize"
                          >
                            {color}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </SheetContent>
        </Sheet>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"primary"} className="flex gap-1">
              <ListFilter size={20} />
              Sırala
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0 z-[999]">
            <Card className="rounded-md shadow-md">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-medium text-gray-700">
                    Fiyat Sıralaması
                  </h4>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-low"
                      checked={sortBy === "price-low"}
                      onCheckedChange={() =>
                        setSortBy(sortBy === "price-low" ? null : "price-low")
                      }
                    />
                    <label
                      htmlFor="price-low"
                      className="text-sm font-normal text-gray-700 cursor-pointer"
                    >
                      Düşükten Yükseğe
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-high"
                      checked={sortBy === "price-high"}
                      onCheckedChange={() =>
                        setSortBy(sortBy === "price-high" ? null : "price-high")
                      }
                    />
                    <label
                      htmlFor="price-high"
                      className="text-sm font-normal text-gray-700 cursor-pointer"
                    >
                      Yüksekten Düşüğe
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>

        <Button variant={"primary"} className="flex gap-1">
          <X size={20} /> Filtreleri Temizle
        </Button>
      </div>
      <Separator className="bg-primary lg:hidden" />
      <div className="flex  justify-between items-start gap-5">
        <div className="hidden lg:block min-w-72 max-w-96 bg-slate-100 rounded-md p-4">
          {/* Filtre Başlığı ve Separator */}
          <h3 className="text-lg font-semibold mb-2 text-center">FİLTRE</h3>
          <Separator className="bg-primary " />

          {/* Accordion - Renk Filtreleri */}
          <Accordion
            type="single"
            collapsible
            defaultValue="color-filter"
            className="w-full mb-6"
          >
            <AccordionItem value="color-filter">
              <AccordionTrigger>
                <DigitalFashionHeading
                  as="h2"
                  size="text-xl"
                  align="text-left"
                  variant="default"
                  className="font-semibold"
                >
                  Renk
                </DigitalFashionHeading>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 mt-2">
                  {allColors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${color}`}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={() => toggleColor(color)}
                      />
                      <label
                        htmlFor={`color-${color}`}
                        className="text-sm font-normal text-gray-700 cursor-pointer capitalize"
                      >
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Accordion - Sıralama */}
          <Accordion
            type="single"
            collapsible
            defaultValue=""
            className="w-full"
          >
            <AccordionItem value="sort-filter">
              <AccordionTrigger>
                <DigitalFashionHeading
                  as="h2"
                  size="text-xl"
                  align="text-left"
                  variant="default"
                  className="font-semibold"
                >
                  Sırala
                </DigitalFashionHeading>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3 mt-2">
                  <h2 className="font-semibold">Fiyat</h2>
                  <Separator className="bg-primary w-1/2" />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-low-lg"
                      checked={sortBy === "price-low"}
                      onCheckedChange={() =>
                        setSortBy(sortBy === "price-low" ? null : "price-low")
                      }
                    />
                    <label
                      htmlFor="price-low-lg"
                      className="text-xs font-normal text-gray-700 cursor-pointer"
                    >
                      Düşükten Yükseğe
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="price-high-lg"
                      checked={sortBy === "price-high"}
                      onCheckedChange={() =>
                        setSortBy(sortBy === "price-high" ? null : "price-high")
                      }
                    />
                    <label
                      htmlFor="price-high-lg"
                      className="text-xs font-normal text-gray-700 cursor-pointer"
                    >
                      Yüksekten Düşüğe
                    </label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Ürün listesi */}
        <div className="grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-8">
          {filteredProducts?.length || sortedProducts?.length ? (
            (filteredProducts.length > 0
              ? filteredProducts
              : sortedProducts
            ).map((product, index) => (
              <DigitalFashionBuyerProductCard
                key={index}
                image={product.images[0]}
                category={product.category}
                slug={product.slug}
                name={product.name}
                price={product.price}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center text-center text-gray-600 py-10">
              <PackageX size={48} className="text-primary mb-4" />
              <h2 className="text-lg font-semibold">Ürün bulunamadı</h2>
              <p className="text-sm text-gray-500 mt-2">
                Seçtiğiniz filtrelerle eşleşen bir ürün bulunamadı. Farklı
                filtreler deneyin.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  // Filtreleri sıfırlamak için örnek bir işlem
                  setSelectedColors([]);
                  setSortBy(null);
                }}
              >
                Filtreleri Sıfırla
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DigitalFashionAllProduct;
